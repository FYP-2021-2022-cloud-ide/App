import Link from "next/link";
import {
  HomeIcon,
  AnnotationIcon,
  CloudIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import {
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Logo from "./Logo";
import { useContainers } from "../contexts/containers";
import { TooltipProvider } from "../contexts/Tooltip";
import CardMenu from "./CardMenu";
import { useCnails } from "../contexts/cnails";
import { useTheme } from "../contexts/theme";

const SideBar = () => {
  const { sub, name, email } = useCnails();
  const { isDark, setDark } = useTheme();
  const { containerQuota, containers } = useContainers();
  const router = useRouter();
  var pages = [
    { name: "Dashboard", link: "/", icon: HomeIcon },
    { name: "Messages", link: "/messages", icon: AnnotationIcon },
    {
      name: "File Transfer",
      link: "/file_transfer",
      icon: CloudIcon,
    },
    // { name: "Admin", link: "/admin", icon: IdentificationIcon },
  ];

  const PrefixElement = () => {
    return (
      <div id="prefix">
        <p id="name">{name}</p>
        <p id="email">{email}</p>
        <div className="h-[1px] bg-gray-300 dark:bg-gray-600 mt-3"></div>
      </div>
    );
  };

  return (
    <div className="sidebar">
      <CardMenu
        items={pages
          .map((page) => {
            return {
              text: page.name,
              icon: page.icon({ className: "w-5 h-5 mr-2" }),
              onClick: () => {
                router.push(page.link);
              },
            };
          })
          .concat([
            {
              text: "Report Issue",
              icon: ExclamationCircleIcon({ className: "w-5 h-5 mr-2" }),
              onClick: () => {
                window.open(
                  "https://github.com/FYP-2021-2022-cloud-ide/Public-Issues/issues"
                );
              },
            },

            {
              text: "Help and docs",
              icon: QuestionMarkCircleIcon({ className: "w-5 h-5 mr-2" }),
              onClick: () => {
                window.open("https://brenkysbwim.gitbook.io/cnails/");
              },
            },
            {
              text: "Change Theme",
              icon: isDark
                ? SunIcon({ className: "w-5 h-5 mr-2" })
                : MoonIcon({ className: "w-5 h-5 mr-2" }),
              onClick: () => {
                setDark(!isDark);
              },
            },
            {
              text: "Logout",
              icon: LogoutIcon({ className: "w-5 h-5 mr-2" }),
              onClick: () => {
                router.push("/logout");
              },
            },
          ])}
        sort={false}
        direction={"right"}
        prefixElement={PrefixElement()}
      ></CardMenu>
      <div className="sm:w-full">
        <Link href="/">
          <a href="">
            <Logo />
          </a>
        </Link>

        <div id="navigation">
          {pages.map((page, index) => {
            const isActive = router.pathname === page.link;
            return (
              <Link key={page.link} href={page.link}>
                <a id={page.name} data-active={isActive}>
                  <page.icon className="w-6 h-6" />
                  <p>{page.name}</p>
                </a>
              </Link>
            );
          })}
        </div>
      </div>

      {containers && containerQuota && (
        <TooltipProvider
          text={`${containers.length}/${containerQuota} (Quota)`}
        >
          {(setTriggerRef) => (
            <div
              ref={setTriggerRef}
              className="w-full flex flex-col space-y-2 text-xs text-gray-500 dark:text-gray-400 select-none sm:mb-5 px-4"
            >
              <p className="capitalize whitespace-nowrap">
                current running Workspaces
              </p>
              <div className="h-2 rounded-full w-full bg-gray-300 overflow-hidden">
                <div
                  style={{
                    width: `${(containers.length / containerQuota) * 100}%`,
                  }}
                  className={`h-2 rounded-full ${
                    (containers.length / containerQuota) * 100 >= 100
                      ? "bg-red-400"
                      : "bg-green-300"
                  }`}
                ></div>
              </div>
            </div>
          )}
        </TooltipProvider>
      )}
    </div>
  );
};

export default SideBar;
