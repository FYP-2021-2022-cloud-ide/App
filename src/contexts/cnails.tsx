import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FetchCookieResponse, SystemMessageResponse } from "../lib/api/api";
import useLocalStorage from "use-local-storage";
import useInterval from "../hooks/useInterval";

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
  systemMessage: {
    id: string;
    text: string;
    show: boolean;
  };
  setSystemMessage: React.Dispatch<
    React.SetStateAction<{
      id: string;
      text: string;
      show: boolean;
    }>
  >;
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
  /**
   * the show status of system message is stored in localstorage.
   * Each system message is recognized by id, if a new system message comes in,
   * the system message status in local storage will automatically change to
   * track the read status of the new message instead of old message.
   */
  const [systemMessage, setSystemMessage] = useLocalStorage("systemMessage", {
    id: "",
    text: "",
    show: false,
  });
  // simultaneous run quota
  const router = useRouter();

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

  const fetchSystemMessage = async () => {
    const response = (await (
      await fetch("/api/getSystemMessage")
    ).json()) as SystemMessageResponse;
    if (response.success == true) {
      if (!systemMessage || response.systemMessage.id != systemMessage.id) {
        // change the new message
        setSystemMessage({
          id: response.systemMessage.id,
          text: response.systemMessage.text,
          show: true,
        });
      }
    } else {
      console.error(response.error);
    }
  };

  useEffect(() => {
    fetchCookies();
    fetchSystemMessage();
  }, []);

  /**
   * this hook fetch system message every one minute.
   */
  useInterval(() => {
    fetchSystemMessage();
  }, 1000 * 60);

  if (!sub || !userId || !name || !email || !semesterId) return <></>;

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
        systemMessage,
        setSystemMessage,
      }}
    >
      {children}
    </CnailsContext.Provider>
  );
};
