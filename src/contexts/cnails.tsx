import React, { useContext, useState, useEffect } from "react";
import {
  getMessaging,
  onMessage,
  isSupported,
  Unsubscribe,
} from "firebase/messaging";
import { firebaseCloudMessaging } from "../lib/webpush";
import myToast from "../components/CustomToast";
import {
  Container,
  Notification,
} from "../lib/cnails";
import { useRouter } from "next/router";
import { notificationAPI } from "../lib/api/notificationAPI";
import { generalAPI } from "../lib/api/generalAPI";
import { containerAPI } from "../lib/api/containerAPI";
import { FetchCookieResponse } from "../lib/api/api";
import _ from "lodash";
import CustomToaster from "../components/CustomToaster";
import { getType, isTemporary } from "../lib/containerHelper";
import useInterval from "../components/useInterval";
import Modal from "../components/Modal";


const defaultQuota = Number(3); // process.env.CONTAINERSLIMIT

interface CnailsProviderProps {
  children: JSX.Element;
}

type CnailsContextState = {
  sub: string;
  name: string;
  email: string;
  userId: string;
  semesterId: string;
  // bio: string;
  // isAdmin: boolean;
  notifications: Notification[];
  containers: Container[];
  setContainers: React.Dispatch<React.SetStateAction<Container[]>>;
  /**
   * a function to fetch the new container list.
   * It will update the context and hence update all affected UI.
   * Therefore, even if this function will return an array of containers, 
   * using the returned value is not suggested. You should use the `containers`
   * from the context instead.
   */
  fetchContainers: () => Promise<Container[]>;

  /**
   * a function to fetch a new list of notification.
   * It will update the context and hence update all affected UI.
   * Therefore, even if this function will return an array of notifications, 
   * using the returned value is not suggested. You should use the `notifications`
   * from the context instead. 
   */
  fetchNotifications: () => Promise<Notification[]>;
  containerQuota: number;
};

const CnailsContext = React.createContext({} as CnailsContextState);

/**
 * It provides all users data, containers and notifications info to whole app. 
 * It run an init function fetch all these data when it renders.
 * 
 * @remark Top level context. It can be accessed anywhere in the app. 
 */
export const useCnails = () => useContext(CnailsContext);

export const CnailsProvider = ({ children }: CnailsProviderProps) => {
  const [sub, setSub] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [bio, setBio] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [containers, setContainers] = useState<Container[]>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unsubscribe, setUnsubscribe] = useState<Unsubscribe>();
  // simultaneous run quota
  const [containerQuota, setContainerQuota] = useState<number>(defaultQuota);
  const router = useRouter();
  const { listNotifications } = notificationAPI;
  const { listContainers } = containerAPI;
  const { getEnv } = generalAPI;
  const _fetchNotifications = async (userId: string) => {
    const response = await listNotifications(userId);
    if (response.success) {
      setNotifications(response.notifications);
      return response.notifications;
    } else console.error("[ ❌ ] : fail to fetch notifications ", response);
  };
  const fetchNotifications = async () => {
    return await _fetchNotifications(userId)
  }

  /**
   * internal fetchContainer 
   */
  const _fetchContainers = async (sub: string) => {
    const response = await listContainers(sub);
    if (response.success) {
      const newContainers = response.containers.map(container => (container.redisPatch ? {
        ...container,
        isTemporary: isTemporary(container),
        redisPatch: container.redisPatch,
        type: getType(container),
        status: container.containerID ? "DEFAULT" : "CREATING",
      } as Container : {
        ...container,
        isTemporary: false,
        type: "UNKNOWN",
        redisPatch: {},
        status: "DEFAULT"
      } as unknown as Container))
      if (!_.isEqual(containers, newContainers)) {
        console.log("containers are different", newContainers)
        setContainers(newContainers);
      }

      return newContainers
    } else {
      console.error(
        "[ ❌ ] : fail to fetch containers' information ",
        response
      );
    }
  };
  const fetchContainers = async () => {
    return await _fetchContainers(sub)
  }

  const ContainerQuotaFromEnv = async () => {
    const response = await getEnv();
    setContainerQuota(parseInt(response.Containers_limit));
  };
  async function fetchCookies() {
    const response = (await (
      await fetch(`/api/fetchCookies`, {
        method: "GET",
      })
    ).json()) as FetchCookieResponse;
    if (response.success) {
      const { sub, name, email, userId, semesterId } = response.cookies;
      setSub(sub);
      setName(name);
      setEmail(email);
      setUserId(userId);
      setSemesterId(semesterId);
      // setBio(bio);
      // setIsAdmin(role == "admin");
      return {
        sub,
        name,
        email,
        userId,
        semesterId,
        // bio,
        // role,
      };
    } else {
      console.error("cookies cannot be fetched");
      router.push("/logout");
      return {};
    }
  }

  /**
   *
   * this function only works if the browser is supported
   * @param sub
   * @param userId
   * @param semesterId
   * @returns
   */
  async function initMessage(sub: string, userId: string, semesterId: string) {
    try {
      const token = await firebaseCloudMessaging.init();
      if (token) {
        const messaging = getMessaging();
        // TODO: call API to fetch lastest notification
        const notiRes = await fetch(`/api/notification/getNotificationToken`, {
          method: "POST",
          body: JSON.stringify({
            sub: sub,
          }),
        });
        const noti = await notiRes.json();
        const notification = noti.notification;
        if (token != notification) {
          // update the DB one
          const response = await fetch(`/api/notification/updateSubscription`, {
            method: "POST",
            body: JSON.stringify({
              registrationToken: token,
              userId,
              semesterId,
            }),
          });
        }
        const s = onMessage(messaging, async (message) => {
          setTimeout(async () => {
            await _fetchNotifications(userId);
            myToast.notification("You have a new notification", () => {
              router.push("/messages");
            });
          }, 2000);
        });
        setUnsubscribe(s);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function init() {
      const cookies = await fetchCookies();

      if (!_.isEmpty(cookies)) {
        const { sub, userId, semesterId } = cookies;

        if (await isSupported()) {
          await initMessage(sub, userId, semesterId);
        }
        await _fetchContainers(sub);
        await _fetchNotifications(userId);
        await ContainerQuotaFromEnv();
      }
    }
    init();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  /**
   * container will be fetch every 10 seconds 
   */
  useInterval(() => {
    _fetchContainers(sub)
  }, 10000)

  if (sub == "" || userId == "") {
    return <></>;
  } else {
    return (
      <CnailsContext.Provider
        value={{
          sub,
          name,
          email,
          userId,
          semesterId,
          // bio,
          // isAdmin,
          notifications,
          containers,
          setContainers,
          fetchNotifications,
          fetchContainers,
          containerQuota,
        }}
      >
        <CustomToaster />
        {children}

      </CnailsContext.Provider>
    );
  }
};
