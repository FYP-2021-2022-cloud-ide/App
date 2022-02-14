import React, { useContext, useState, useEffect, useRef } from "react";
import { getMessaging, MessagePayload, onMessage } from "firebase/messaging";
import { firebaseCloudMessaging } from "../lib/webpush";
import { Toast, ToastBar, Toaster } from "react-hot-toast";
import myToast from "../components/CustomToast";
import { CnailsContextState, Notification } from "../lib/cnails";
import { useRouter } from "next/router";
import { notificationAPI } from "../lib/api/notificationAPI";

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
  const router = useRouter();
  const { listNotifications } = notificationAPI;
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const fetchNotifications = async (userId: string) => {
    const response = await listNotifications(userId);
    if (response.success) {
      console.log(response.notifications);
      setNotifications(response.notifications);
      return response.notifications;
    } else console.log("[ ❌ ] : fail to fetch notifications ", response);
  };
  useEffect(() => {
    init();

    async function init() {
      const cookies = await fetch(`/api/fetchCookies`, {
        method: "GET",
      });
      const cookiesContent = await cookies.json();

      const { sub, name, email, userId, semesterId, bio, role } =
        cookiesContent;
      if (userId == "") {
        throw new Error("user id is null ");
      }
      setSub(sub);
      setName(name);
      setEmail(email);
      setUserId(userId);
      setSemesterId(semesterId);
      setBio(bio);
      if (role == "admin") setIsAdmin(true);
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          const messaging = getMessaging();
          // TODO: call API to fetch lastest notification
          const notiRes = await fetch(
            `/api/notification/getNotificationToken`,
            {
              method: "POST",
              body: JSON.stringify({
                sub: sub,
              }),
            }
          );
          const noti = await notiRes.json();
          const notification = noti.notification;
          if (token != notification) {
            // update the DB one
            console.log(token);
            console.log(notification);
            const response = await fetch(
              `/api/notification/updateSubscription`,
              {
                method: "POST",
                body: JSON.stringify({
                  registrationToken: token,
                  userId,
                  semesterId,
                }),
              }
            );
            console.log(await response.json());
            console.log("updated");
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
          bio,
          isAdmin,
          notifications,
          fetchNotifications,
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
            if (oldClassName == "toaster-loading") t.duration = 60000;
            if (oldClassName == "toaster-set-template") t.duration = 60 * 60000;
            return (
              <div
                onClick={() => {
                  if (
                    !["toaster-loading", "toaster-set-template"].includes(
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
                        <p className="toaster-text">
                          {(message as JSX.Element).props.children}
                        </p>
                      </div>
                    );
                  }}
                </ToastBar>
              </div>
            );
          }}
        </Toaster>
        {children}
      </CnailsContext.Provider>
    );
  }
};
