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
import { Fragment } from "react";
const SideBar = () => {
  var pages = [
    { name: "Dashboard", link: "/", icon: HomeIcon },
    { name: "Notifications", link: "/messages", icon: AnnotationIcon },
    { name: "Cloud", link: "/cloud", icon: CloudIcon },
    { name: "Sandbox", link: "/sandbox", icon: CubeTransparentIcon },
    { name: "Admin", link: "/admin", icon: IdentificationIcon },
  ];
  const router = useRouter();
  const { isAdmin, containerInfo, containerQuota, containers } = useCnails();
  return (
    <div className="sidebar-container justify-between">
      <div>
        <Link href="/">
          <a href="">
            <Logo className="sidebar-icon" />
          </a>
        </Link>

        <div className="sidebar-btn-col">
          {pages.map((page, index) => {
            const isActive = router.pathname === page.link;
            if (page.name == "Admin" && !isAdmin)
              return <Fragment key={index}></Fragment>;
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

      {containers && containerInfo && containerQuota && (
        <div className="w-full flex flex-col space-y-2 text-xs text-gray-500 dark:text-gray-400 select-none mb-5 px-4">
          <div className="">
            <p>
              {containers.length}/{containerInfo.containersTotal} (All
              containers)
            </p>
            <div className="current-run-bar-outer">
              <div
                style={{
                  width: `${
                    (containers.length /
                      Math.max(1, containerInfo.containersTotal)) *
                    100
                  }%`,
                }}
                className={`current-run-bar-inner bg-green-300`}
              ></div>
            </div>
          </div>
          <div className="">
            <p>
              {containers.length}/{containerQuota} (Quota)
            </p>
            <div className="current-run-bar-outer">
              <div
                style={{
                  width: `${(containers.length / containerQuota) * 100}%`,
                }}
                className={`current-run-bar-inner ${
                  (containers.length / containerQuota) * 100 >= 100
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
