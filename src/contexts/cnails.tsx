import React, { useContext, useState, useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { firebaseCloudMessaging } from "../lib/webpush";
// import {notificationStack} from "../lib/notificationStack";
import toast, { Toaster } from "react-hot-toast";
import { Notification, NotificationBody } from "../components/Notification";

interface CnailsContextState {
  sub: string;
  name: string;
  email: string;
  userId: string;
  semesterId: string;
  bio: string;
  isAdmin: boolean;
}

interface CnailsProviderProps {
  children: JSX.Element;
}

const CnailsContext = React.createContext({} as CnailsContextState);
export const useCnails = () => useContext(CnailsContext);

// need to do it on server side --> cannot resolve the fs
export const CnailsProvider = ({ children }: CnailsProviderProps) => {
  const [sub, setSub] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [bio, setBio] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    init();
    // setupNotification();

    async function init() {
      const cookies = await fetch(`/api/fetchCookies`, {
        method: "GET",
      });
      const cookiesContent = await cookies.json();
      console.log(cookiesContent);
      const { sub, name, email, userId, semesterId, bio, role } =
        cookiesContent;
      setSub(sub);
      setName(name);
      setEmail(email);
      setUserId(userId);
      setSemesterId(semesterId);
      setBio(bio);
      if (role == "admin") setIsAdmin(true);
      try {
        const token = await firebaseCloudMessaging.init();
        console.log("after token");
        console.log(token);
        if (token) {
          const messaging = getMessaging();
          // TODO: call API to fetch lastest notification
          console.log("calling noti API");
          const notiRes = await fetch(`/api/notification/getNotification`, {
            method: "POST",
            body: JSON.stringify({
              sub: sub,
            }),
          });
          const noti = await notiRes.json();
          const notification = noti.notification;
          // console.log('testing 1')
          // console.log(token, notification)
          // if the fetch token is not the same as DB
          if (token != notification) {
            console.log("updating");
            // update the DB one
            const response = await fetch(`/api/notification/update`, {
              method: "POST",
              body: JSON.stringify({
                registrationToken: token,
                userId,
                semesterId,
              }),
            });
            console.log(await response.json());
            console.log("updated");
          }
          //   toast.custom((t)=>(
          //     <Notification trigger={t}>
          //         <NotificationBody title={"testing"} body={"testing"} success={false} id = {t.id}></NotificationBody>
          //     </Notification>
          //   ))
          onMessage(messaging, async (message) => {
            console.log("message recevied");
            console.log(message.data);
            const { title, body } = message.data!;
            // notificationStack.set(notificationStack.push((await notificationStack.get()),title, body))
            toast.custom((t) => (
              <Notification trigger={t}>
                <NotificationBody
                  title={title}
                  body={body}
                  success={true}
                  id={t.id}
                ></NotificationBody>
              </Notification>
            ));
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    // async function setupNotification() {

    // }
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
        }}
      >
        <Toaster position="top-right" />
        {children}
      </CnailsContext.Provider>
    );
  }
};
