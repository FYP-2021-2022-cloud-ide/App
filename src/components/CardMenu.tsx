import { Menu, Transition } from "@headlessui/react";
import { Fragment, MouseEventHandler } from "react";
import { MenuIcon } from "@heroicons/react/outline";

export type MenuItem = {
  text: string;
  icon?: JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  show?: boolean;
};

export type Props = {
  items: MenuItem[];
  sort?: boolean;
  direction?: "left" | "right";
  prefixElement?: JSX.Element;
};

/**
 * A component to create a menu which is open from a button.
 * Although it is called `CardMenu` but it doesn't need to be used in a card. It can be used anywhere.
 * Pass `items` array as props.
 */
export default function CardMenu({
  items,
  sort = true,
  direction = "left",
  prefixElement,
}: Props) {
  return (
    <>
      <Menu
        as="div"
        className="menu relative inline-block text-left shrink-0 overflow-visible"
      >
        <Menu.Button className="inline-flex justify-end w-full py-2 text-sm font-medium rounded-md ">
          <MenuIcon className="w-5 h-5 hover:scale-110 transition text-gray-600 dark:text-gray-300 ease-in-out duration-300 "></MenuIcon>
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
          <Menu.Items
            className={`absolute ${
              direction == "left" ? "right-0" : "left-0"
            } origin-top-right bg-white dark:bg-gray-900 dark:text-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none`}
          >
            <div className="p-1">
              {prefixElement}
              {items
                .filter((item) => item.show ?? true)
                .sort((a, b) => {
                  if (!sort) return 1;
                  return a.text.localeCompare(b.text);
                })
                .map((item) => {
                  return (
                    <Menu.Item key={item.text}>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-gray-200 dark:bg-gray-800" : ""
                          } text-left text-gray-900 dark:text-white group flex rounded-md items-center w-full px-2 py-2 text-sm capitalize select-none whitespace-nowrap`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (item.onClick) {
                              item.onClick(e);
                            }
                          }}
                        >
                          {item.icon ?? <></>}
                          <span>{item.text}</span>
                        </button>
                      )}
                    </Menu.Item>
                  );
                })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
