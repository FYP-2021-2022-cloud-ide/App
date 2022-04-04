import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { FetchCookieResponse } from "../lib/api/api";
import _ from "lodash";
import CustomToaster from "../components/CustomToaster";

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

  if (sub == "" || userId == "" || email == "" || semesterId == "" || name == "") return <></>;

  return <CnailsContext.Provider
    value={{
      sub,
      name,
      email,
      userId,
      semesterId,
      // bio,
      // isAdmin,
    }}
  >
    <CustomToaster />
    {children}

  </CnailsContext.Provider>
};
