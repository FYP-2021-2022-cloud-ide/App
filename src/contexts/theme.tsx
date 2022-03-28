import { createContext, useContext, useState, useEffect } from "react";
import { useCnails } from "./cnails";
import { generalAPI } from "../lib/api/generalAPI";
type ThemeState = {
  isDark: boolean;
  setDark: (d: boolean) => Promise<any>;
};
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
      const userData = await generalAPI.getUserData(sub);
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
          await generalAPI.updateUserData(sub, d, ""); //expect description
        },
      }}
    >
      {children}
    </themeContext.Provider>
  );
};
