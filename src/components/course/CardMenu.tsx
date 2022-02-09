import { Menu, Transition } from "@headlessui/react";
import { Fragment, MouseEventHandler } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import { EnvironmentContent as Environment } from "./instructor/EnvironmentList";
interface MenuProps {
  items: {
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  }[];
}

export default function CardMenu({ items }: MenuProps) {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex justify-end w-full py-2 text-sm font-medium rounded-md ">
          <MenuIcon className="w-5 h-5 hover:scale-110 transition text-gray-600 dark:text-gray-300 ease-in-out duration-300"></MenuIcon>
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
          <Menu.Items className="absolute w-24 right-0 origin-top-right bg-white dark:bg-gray-900 dark:text-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="px-1 py-1">
              {items.map((item) => {
                return (
                  <Menu.Item key={item.text}>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-gray-200 dark:bg-gray-800 font-semibold"
                            : ""
                        } text-gray-900 dark:text-white group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={item.onClick}
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
