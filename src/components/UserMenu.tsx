import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useTheme } from "../contexts/theme";

interface UserMenuProps {
  sub: string;
  name: string;
  email: string;
}

export default function UserMenu({ sub, name, email }: UserMenuProps) {
  const { isDark } = useTheme();
  return (
    <div className={`w-fit  text-right top-16 ${isDark && "dark"}`}>
      <Menu as="div" className="relative text-left">
        <div
          data-tip="User menu"
          className="tooltip tooltip-primary tooltip-bottom"
        >
          <Menu.Button className="justify-center text-sm font-medium rounded-md hover:scale-105 transition ease-in-out duration-200 dark:text-gray-300">
            {sub}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-72 mt-2 origin-top-right bg-white dark:bg-gray-600 divide-y divide-gray-100 dark:divide-gray-500 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-4">
              <div className="font-semibold text-gray-700 dark:text-gray-300 ">
                {name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {email}
              </div>
            </div>
            <div className="px-1 py-1">
              {/* <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-gray-200 dark:font-semibold dark:bg-gray-500' : ''
                    } text-[#775FBD] dark:text-gray-300 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item> */}
              <Menu.Item>
                {({ active }) => (
                  <Link href="/settings">
                    <button
                      className={`${
                        active
                          ? "bg-gray-200 dark:bg-gray-500 dark:font-semibold"
                          : ""
                      } text-[#775FBD] dark:text-gray-300 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Settings
                    </button>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`${
                      active
                        ? "bg-gray-200 dark:bg-gray-500 dark:font-semibold"
                        : ""
                    } text-[#775FBD] dark:text-gray-300 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <Link href="/logout">
                      <a className="w-full">Sign Out</a>
                    </Link>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
