import React, { useContext, useState, useEffect, useRef } from "react";
import { getMessaging, MessagePayload, onMessage } from "firebase/messaging";
import { firebaseCloudMessaging } from "../lib/webpush";
import { Toast, ToastBar, Toaster } from "react-hot-toast";
import myToast, { loadingTime } from "../components/CustomToast";
import {
  CnailsContextState,
  Container,
  ContainerInfo,
  Notification,
} from "../lib/cnails";
import { useRouter } from "next/router";
import { notificationAPI } from "../lib/api/notificationAPI";
import { generalAPI } from "../lib/api/generalAPI";
import { containerAPI } from "../lib/api/containerAPI";
import { FetchCookieResponse } from "../lib/api/api";
import Twemoji from "react-twemoji";
import _ from "lodash";
import ModalForm from "../components/ModalForm/ModalForm";

const defaultQuota = Number(3); // process.env.CONTAINERSLIMIT

interface CnailsProviderProps {
  children: JSX.Element;
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
  let [containerInfo, setContainerInfo] = useState<ContainerInfo>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  // simultaneous run quota
  const [containerQuota, setContainerQuota] = useState<number>(defaultQuota);
  const router = useRouter();
  const { listNotifications } = notificationAPI;
  const { containerList } = containerAPI;
  const { getEnv } = generalAPI;
  const [reportIssueModalOpen, setReportIssueModalOpen] =
    useState<boolean>(false);
  const [issue, setIssue] = useState<any>();
  const fetchNotifications = async (userId: string) => {
    const response = await listNotifications(userId);
    if (response.success) {
      setNotifications(response.notifications);
      return response.notifications;
    } else console.error("[ ❌ ] : fail to fetch notifications ", response);
  };

  const fetchContainers = async (sub: string) => {
    const response = await containerList(sub);
    if (response.success) {
      setContainers(response.containers);
      setContainerInfo(response.containersInfo);
      return {
        containers: response.containers,
        containersInfo: response.containersInfo,
      };
    } else
      console.error(
        "[ ❌ ] : fail to fetch containers' information ",
        response
      );
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
        return () => {
          s();
        };
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
        await initMessage(sub, userId, semesterId);
        await fetchContainers(sub);
        await fetchNotifications(userId);
        await ContainerQuotaFromEnv();
      }
    }
    init();
  }, []);

  const reportIssue = (issue: any) => {
    setReportIssueModalOpen(true);
    setIssue(issue);
  };

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
          reportIssue,
        }}
      >
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
          }}
        >
          {(t: Toast) => {
            const oldClassName = t.className;
            t.className = `toaster ${t.className}`;
            if (oldClassName == "toaster-loading") t.duration = loadingTime;
            if (oldClassName == "toaster-custom") t.duration = 60 * 60000;
            return (
              <Twemoji noWrapper options={{ className: "twemoji" }}>
                <div
                  onClick={() => {
                    if (
                      !["toaster-loading", "toaster-custom"].includes(
                        oldClassName
                      )
                    )
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
        <ModalForm
          title="Report issue"
          formStructure={{
            reportIssue: {
              title: "Report Issue",
              entries: {
                temp1: {
                  type: "input",
                  defaultValue: "",
                  label: "temp1",
                },
                tempe: {
                  type: "markdown",
                  defaultValue: "",
                  label: "temp1",
                },
                temp2: {
                  type: "input",
                  defaultValue: "",
                  label: "temp1",
                },
              },
            },
          }}
          clickOutsideToClose
          size="lg"
          escToClose
          onClose={() => {
            setIssue("");
          }}
          useDisclosure
          isOpen={reportIssueModalOpen}
          setOpen={setReportIssueModalOpen}
        />
      </CnailsContext.Provider>
    );
  }
};
