import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useMemo } from "react";
import { useCnails } from "../contexts/cnails";

export default function UserMenu() {
  const { sub, name, email } = useCnails();
  const router = useRouter();

  const items = useMemo(
    () => [
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
    ],
    []
  );

  return (
    <div className={`w-fit  text-right top-16 `}>
      <Menu as="div" className="sm:relative text-left">
        <Menu.Button
          title="User menu"
          className="usermenu justify-center text-sm font-medium rounded-md hover:scale-105 transition ease-in-out duration-200 dark:text-gray-300"
        >
          {sub}
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-10 sm:right-0 w-72 mt-2 origin-top-right bg-white dark:bg-gray-600 divide-y divide-gray-100 dark:divide-gray-500 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-4">
              <div
                id="username"
                className="font-semibold text-gray-700 dark:text-gray-300 "
              >
                {name}
              </div>
              <div
                id="user_email"
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                {email}
              </div>
            </div>
            <div className="p-1">
              {items.map((item) => {
                return (
                  <Menu.Item key={item.text}>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-gray-200 dark:bg-gray-500 dark:font-semibold"
                            : ""
                        } text-[#775FBD] dark:text-gray-300 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => {
                          if (item.onClick) item.onClick();
                        }}
                      >
                        {item.text}
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
