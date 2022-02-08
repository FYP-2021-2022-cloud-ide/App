import { createContext, useContext, useState, useEffect } from "react";
import { useCnails } from "./cnails";
import { generalAPI as gapi } from "../lib/generalAPI";
type ThemeState = {
  isDark: boolean;
  getDark: () => Promise<any>;
  setDark: (d: boolean) => Promise<any>;
};

export function setCookie(name: string, val: string) {
  document.cookie = "darkMode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  const date = new Date();
  const value = val;

  // Set it expire in 7 days
  date.setTime(date.getTime() + 8 * 60 * 60 * 1000);

  // Set it
  document.cookie =
    name +
    "=" +
    value +
    "; expires=" +
    date.toUTCString() +
    "; path=/; domain=.codespace.ust.dev";
}

const themeContext = createContext({} as ThemeState);
export const useTheme = () => useContext(themeContext);

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const { sub, bio } = useCnails();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);
  useEffect(() => {
    init();
    async function init() {
      const cookies = await fetch(`/api/fetchCookies`, {
        method: "GET",
      });
      const cookiesContent = await cookies.json();
      const { darkMode } = cookiesContent;
      if (darkMode == "false") {
        setDark(false);
      } else {
        setDark(true);
      }
    }
  }, []);

  return (
    <themeContext.Provider
      value={{
        isDark: dark,
        getDark: async () => {
          // get user setting
        },
        setDark: async (d: boolean) => {
          setDark(d);
          setCookie("darkMode", d.toString());
          await gapi.updateUserData(sub, d, bio); //expect description
        },
      }}
    >
      {children}
    </themeContext.Provider>
  );
};
