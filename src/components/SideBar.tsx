import Link from "next/link";
import { HomeIcon, AnnotationIcon, CloudIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Logo from "./Logo";
import { useContainers } from "../contexts/containers";
import { TooltipProvider } from "../contexts/Tooltip";

const SideBar = () => {
  const { containerQuota, containers } = useContainers();
  const router = useRouter();
  var pages = [
    { name: "Dashboard", link: "/", icon: HomeIcon },
    { name: "Messages", link: "/messages", icon: AnnotationIcon },
    { name: "File Transfer", link: "/file_transfer", icon: CloudIcon },
    // { name: "Admin", link: "/admin", icon: IdentificationIcon },
  ];
  return (
    <div className="sidebar-container justify-between" id="sidebar">
      <div>
        <Link href="/">
          <a href="">
            <Logo className="sidebar-icon" />
          </a>
        </Link>

        <div className="sidebar-btn-col">
          {pages.map((page, index) => {
            const isActive = router.pathname === page.link;
            return (
              <Link key={page.link} href={page.link}>
                <a
                  id={page.name}
                  className={`sidebar-btn ${
                    isActive
                      ? "text-gray-900 dark:text-gray-200"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <page.icon className="w-6 h-6" />
                  <div className="sidebar-text">{page.name}</div>
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
              className="w-full flex flex-col space-y-2 text-xs text-gray-500 dark:text-gray-400 select-none mb-5 px-4"
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
