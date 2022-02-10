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
  const { isAdmin } = useCnails();
  return (
    <div className="sidebar-container">
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
  );
};

export default SideBar;
