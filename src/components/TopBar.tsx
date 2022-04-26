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
import { useCnails } from "../contexts/cnails";

const TopBar = () => {
  const { isDark, setDark } = useTheme();
  const { systemMessage, setSystemMessage } = useCnails();

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
      className="topbar"
      data-has-message={Boolean(
        systemMessage && systemMessage.id && systemMessage.show
      )}
      id="topbar"
    >
      {systemMessage && systemMessage.id && systemMessage.show && (
        <div id="system-message">
          <p>
            ⚠️{" "}
            <span className="font-bold mr-2 capitalize whitespace-nowrap">
              System notification:
            </span>
            {systemMessage.text}
          </p>
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
            <XIcon></XIcon>
          </button>
        </div>
      )}
      <div id="action-bar">
        <UserMenu></UserMenu>
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
  );
};

export default TopBar;
