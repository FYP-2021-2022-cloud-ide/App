import {
  QuestionMarkCircleIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  XIcon,
} from "@heroicons/react/solid";
import UserMenu from "./UserMenu";
import { useTheme } from "../contexts/theme";
import NotiButton from "./NotiButton";
import { useRouter } from "next/router";
import { useCnails } from "../contexts/cnails";

interface props {
  sub: string;
  name: string;
  email: string;
}

const TopBar = ({ sub, name, email }: props) => {
  const { isDark, setDark } = useTheme();
  const { systemMessage, setSystemMessage } = useCnails();

  const router = useRouter();
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
    <div
      className={`flex flex-row  items-center z-[10] p-5 ${
        systemMessage && systemMessage.id && systemMessage.show
          ? "justify-between"
          : "justify-end"
      }`}
      id="topbar"
    >
      {systemMessage.id && systemMessage.show && (
        <div id="system-message">
          ⚠️{" "}
          <span className="font-bold mr-2 capitalize whitespace-nowrap">
            System notification:
          </span>
          {systemMessage.text}
          <button
            id="close"
            onClick={() => {
              setSystemMessage({
                id: systemMessage.id,
                text: systemMessage.text,
                show: false,
              });
            }}
          >
            <XIcon className="h-4 w-4 text-gray-500 hover:text-blue-500"></XIcon>
          </button>
        </div>
      )}
      <div className="flex flex-row justify-end  items-center">
        {/* the system message */}
        {/* <SearchBar /> */}
        <div className="flex flex-row items-center text-gray-500 justify-end gap-x-4">
          <UserMenu
            sub={sub}
            name={name}
            email={email}
            items={[
              {
                text: "Report Issue",
                onClick: () => {
                  window.open(
                    "https://github.com/FYP-2021-2022-cloud-ide/Public-Issues/issues"
                  );
                },
              },
              {
                text: "Sign Out",
                onClick: () => {
                  router.push("/logout");
                },
              },
            ]}
          ></UserMenu>
          <NotiButton />
          <button id="help_doc_btn" title="Help and docs">
            <QuestionMarkCircleIcon
              onClick={() => {
                window.open("https://brenkysbwim.gitbook.io/cnails/");
              }}
            ></QuestionMarkCircleIcon>
          </button>
          <div id="change_theme_btn" title="Change Theme">
            {!isDark ? (
              <SunIcon data-icon-sun onClick={() => setDark(!isDark)}></SunIcon>
            ) : (
              <MoonIcon onClick={() => setDark(!isDark)}></MoonIcon>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
