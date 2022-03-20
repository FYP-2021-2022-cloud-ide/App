import { createContext, useContext, useState, useEffect } from "react";
import { useCnails } from "./cnails";
import { generalAPI as gapi } from "../lib/api/generalAPI";
type ThemeState = {
  isDark: boolean;
  setDark: (d: boolean) => Promise<any>;
};

// export function setCookie(name: string, val: string) {
//   document.cookie = "darkMode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
//   const date = new Date();
//   const value = val;

//   // Set it expire in 7 days
//   date.setTime(date.getTime() + 8 * 60 * 60 * 1000);

//   // Set it
//   document.cookie =
//     name +
//     "=" +
//     value +
//     "; expires=" +
//     date.toUTCString() +
//     "; path=/; domain=.codespace.ust.dev";
// }

const themeContext = createContext({} as ThemeState);
export const useTheme = () => useContext(themeContext);

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const { sub } = useCnails();
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
      const userData = await gapi.getUserData(sub);
      if (userData.success == true) {
        const { darkMode } = userData;
        setDark(darkMode);
      }
    }
  }, []);

  return (
    <themeContext.Provider
      value={{
        isDark: dark,
        setDark: async (d: boolean) => {
          setDark(d);
          await gapi.updateUserData(sub, d, ""); //expect description
        },
      }}
    >
      {children}
    </themeContext.Provider>
  );
};
