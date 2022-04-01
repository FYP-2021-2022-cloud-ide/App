import Image from "next/image";
import Link from "next/link";
import {
  HomeIcon,
  CubeTransparentIcon,
  AnnotationIcon,
  CloudIcon,
  IdentificationIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useCnails } from "../contexts/cnails";
import Logo from "./Logo";
const SideBar = () => {
  const { containerQuota, containers } = useCnails();
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
                  className={`sidebar-btn ${isActive
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
        <div className="w-full flex flex-col space-y-2 text-xs text-gray-500 dark:text-gray-400 select-none mb-5 px-4">
          <div
            className="tooltip tooltip-info"
            data-tip={`${containers.length}/${containerQuota} (Quota)`}
          >
            {/* <p id="current-run-percentage">
              
            </p> */}
            <p className="capitalize whitespace-nowrap">
              current running Workspaces
            </p>
            <div className="current-run-bar-outer">
              <div
                style={{
                  width: `${(containers.length / containerQuota) * 100}%`,
                }}
                className={`current-run-bar-inner ${(containers.length / containerQuota) * 100 >= 100
                    ? "bg-red-400"
                    : "bg-green-300"
                  }`}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
