import TopBar from "./TopBar";
import SideBar from "./SideBar";
import Head from "next/head";
import { useTheme } from "../contexts/theme";
import { useCnails } from "../contexts/cnails";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isDark } = useTheme();
  const { sub, name, email } = useCnails();

  return (
    <div
      className={`flex flex-row w-full justify-start h-fit min-h-[600px] ${
        isDark && "dark"
      }`}
    >
      <Head>
        <title>Cnails</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
        ></link>
      </Head>
      <SideBar></SideBar>
      <div className="flex flex-col bg-white dark:bg-gray-800 w-full  z-10 ">
        <TopBar sub={sub} name={name} email={email}></TopBar>

        <div className=" w-full z-0 grow">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
