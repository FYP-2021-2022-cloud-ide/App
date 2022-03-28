import React, { useContext, useState, useEffect, useRef } from "react";
import {
  getMessaging,
  MessagePayload,
  onMessage,
  isSupported,
  Unsubscribe,
} from "firebase/messaging";
import { firebaseCloudMessaging } from "../lib/webpush";
import { Toast, ToastBar, Toaster } from "react-hot-toast";
import myToast, { loadingTime } from "../components/CustomToast";
import {
  CnailsContextState,
  Container,
  ContainerInfo,
  Notification,
  SandboxImage,
} from "../lib/cnails";
import { useRouter } from "next/router";
import { notificationAPI } from "../lib/api/notificationAPI";
import { generalAPI } from "../lib/api/generalAPI";
import { containerAPI } from "../lib/api/containerAPI";
import { FetchCookieResponse, Error } from "../lib/api/api";
import Twemoji from "react-twemoji";
import _ from "lodash";
import { sandboxAPI } from "../lib/api/sandboxAPI";

const defaultQuota = Number(3); // process.env.CONTAINERSLIMIT

interface CnailsProviderProps {
  children: JSX.Element;
}

async function fetchSandboxes(
  userId: string,
  onFailCallBack?: (error: Error) => void,
  onSuccessCallBack?: (sandboxes: SandboxImage[]) => void
) {
  if (!userId) {
    throw new Error("user id is undefined ");
  }
  const { listSandboxImage } = sandboxAPI;
  const response = await listSandboxImage(userId);
  if (!response.success && onFailCallBack) {
    onFailCallBack(response.error);
  } else if (response.success && onSuccessCallBack) {
    onSuccessCallBack(response.sandboxImages);
  }
}

const CnailsContext = React.createContext({} as CnailsContextState);
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
  const [containerInfo, setContainerInfo] = useState<ContainerInfo>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [sandboxImages, setSandboxImages] = useState<SandboxImage[]>();
  const [unsubscribe, setUnsubscribe] = useState<Unsubscribe>();
  // simultaneous run quota
  const [containerQuota, setContainerQuota] = useState<number>(defaultQuota);
  const router = useRouter();
  const { listNotifications } = notificationAPI;
  const { containerList } = containerAPI;
  const { getEnv } = generalAPI;
  const { listSandboxImage } = sandboxAPI;
  const fetchNotifications = async (userId: string) => {
    const response = await listNotifications(userId);
    if (response.success) {
      setNotifications(response.notifications);
      return response.notifications;
    } else console.error("[ ❌ ] : fail to fetch notifications ", response);
  };

  const fetchContainers = async (sub: string, userId: string) => {
    const sandboxResponse = await listSandboxImage(userId);
    if (sandboxResponse.success) {
      const { sandboxImages } = sandboxResponse;
      setSandboxImages(sandboxImages);
      const response = await containerList(sub);
      if (response.success) {
        const { containers, containersInfo } = response;
        console.log(sandboxImages, containers);
        const patchedContainers: Container[] = containers
          .map((c) => {
            const sandboxImage = (sandboxImages as SandboxImage[]).find(
              (sandboxImage) => sandboxImage.sandboxesId == c.containerID
            );
            if (sandboxImage) {
              return {
                title: sandboxImage.title,
                subTitle: "",
                existedTime: c.existedTime,
                containerID: c.containerID,
                type: c.type,
              };
            } else {
              return {
                title: c.title,
                subTitle: c.subTitle,
                existedTime: c.existedTime,
                containerID: c.containerID,
                type: c.type,
              };
            }
          })
        // .concat(
        //   tempContainers.map((c) => {
        //     return {
        //       title: c.courseTitle,
        //       subTitle: c.assignmentName,
        //       existedTime: c.existedTime,
        //       containerID: c.containerID,
        //       isSandbox: false,
        //       isTemporary: true,
        //     };
        //   })
        // );
        setContainers(patchedContainers);
        setContainerInfo(containersInfo);
        return {
          containers: patchedContainers,
          containersInfo,
        };
      } else
        console.error(
          "[ ❌ ] : fail to fetch containers' information ",
          response
        );
    } else {
      console.error("[ ❌ ] : fail to fetch fail sandboxes.", sandboxResponse);
    }
  };
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
            await fetchNotifications(userId);
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
        await fetchContainers(sub, userId);
        await fetchNotifications(userId);
        await ContainerQuotaFromEnv();
      }
    }
    init();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

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
          containerInfo,
          fetchNotifications,
          fetchContainers,
          containerQuota,
          sandboxImages,
        }}
      >
        <Toaster
          position="bottom-right"
          toastOptions={{
            // this can the default duration of the toast
            duration: 100000,
          }}
        >
          {(t: Toast) => {
            const classList = t.className.split(" ");
            if (classList.includes("toaster-loading")) t.duration = loadingTime;

            return (
              <Twemoji noWrapper options={{ className: "twemoji" }}>
                <div
                  onClick={() => {
                    if (!classList.includes("toaster-no-dismiss"))
                      myToast.dismiss(t.id);
                    // dirty
                    if (myToast.onClickCallbacks[t.id]) {
                      myToast.onClickCallbacks[t.id]();
                      delete myToast.onClickCallbacks[t.id];
                    }
                  }}
                >
                  <ToastBar toast={t}>
                    {({ icon, message }) => {
                      return (
                        <div className="toaster-content">
                          {icon}
                          <div className="toaster-text">
                            {(message as JSX.Element).props.children}
                          </div>
                        </div>
                      );
                    }}
                  </ToastBar>
                </div>
              </Twemoji>
            );
          }}
        </Toaster>
        {children}
      </CnailsContext.Provider>
    );
  }
};
