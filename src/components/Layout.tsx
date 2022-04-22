import TopBar from "./TopBar";
import SideBar from "./SideBar";
import Head from "next/head";
import { useTheme } from "../contexts/theme";
import Twemoji from "react-twemoji";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isDark } = useTheme();

  return (
    <Twemoji noWrapper options={{ className: "twemoji" }}>
      <div className="flex flex-row min-h-screen">
        <div className=""></div>
        <div
          className={`flex flex-col sm:flex-row w-full justify-start ${
            isDark ? "dark" : ""
          }`}
          id="layout"
        >
          <SideBar></SideBar>
          <div className="flex flex-col bg-white dark:bg-gray-800 w-full h-full z-10">
            <TopBar></TopBar>

            <div className=" w-full  grow" id="page-content">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Twemoji>
  );
};

export default Layout;
