import Image from "next/image";
import {
  BellIcon,
  QuestionMarkCircleIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from "@heroicons/react/solid";
import UserMenu from "./UserMenu";
import { useTheme } from "../contexts/theme";
import NotiStack from "./NotiStack";
import Link from "next/link";

interface props {
  sub: string;
  name: string;
  email: string;
}

const TopBar = ({ sub, name, email }: props) => {
  const { isDark, setDark } = useTheme();

  const SearchBar = () => {
    return (
      <div className="border flex flex-row space-x-2 items-center focus:border-black-600 text-left rounded dark:border-gray-700 dark:bg-gray-700 hover:border-gray-300 w-36 md:w-96 px-2 shadow mr-6">
        <SearchIcon className="w-6 h-6 text-gray-500"></SearchIcon>
        <input
          placeholder="Search..."
          className="focus:outline-none dark:bg-gray-700 text-gray-500 dark:text-gray-300 w-full"
        ></input>
      </div>
    );
  };

  return (
    <div className="flex flex-row z-[10] justify-end  items-center p-5">
      {/* <SearchBar /> */}
      <div className="flex flex-row items-center text-gray-500 justify-end gap-x-4">
        <UserMenu sub={sub} name={name} email={email}></UserMenu>
        <NotiStack />
        <div
          className="tooltip tooltip-bottom tooltip-info"
          data-tip="Help and docs"
        >
          <Link href="">
            <a href="https://brenkysbwim.gitbook.io/cnails/" target="_blank">
              <QuestionMarkCircleIcon className="top-bar-icon"></QuestionMarkCircleIcon>
            </a>
          </Link>
        </div>
        <div
          className="tooltip tooltip-bottom tooltip-bottom-left tooltip-info"
          data-tip="Change theme"
        >
          {isDark ? (
            <SunIcon
              className="top-bar-icon top-bar-icon-sun"
              onClick={() => setDark(!isDark)}
            ></SunIcon>
          ) : (
            <MoonIcon
              className="top-bar-icon"
              onClick={() => setDark(!isDark)}
            ></MoonIcon>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
