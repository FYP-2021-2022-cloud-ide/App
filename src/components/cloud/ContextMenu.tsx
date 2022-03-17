import { Dialog, Transition } from "@headlessui/react";
import { NodeModel } from "@minoru/react-dnd-treeview";
import React from "react";
import { CustomData } from "./CustomNode";

export type MenuItem = {
  text: string;
  /**
   * callback when the button is click
   */
  onClick?: () => void;
};

type Props = {
  /**
   *  true if menu visible.
   */
  isMenuVisible: boolean;
  /**
   * you need to set this to true in parent but don't need to set it to false because closing of the component is handled internally.
   */
  setIsMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * event.client location
   */
  menuLocation: number[];
  /**
   * useRef in parent component
   */
  menuItems: MenuItem[];
  /**
   * a callback on close
   */
  onClose?: () => void;
};

const ContextMenu = React.forwardRef(
  (
    {
      isMenuVisible,
      setIsMenuVisible,
      menuLocation,
      menuItems,
      onClose,
    }: Props,
    ref: React.MutableRefObject<HTMLDivElement>
  ) => {
    return (
      <Transition
        show={isMenuVisible}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          ref={ref}
          onClose={() => {
            setIsMenuVisible(false);
            if (onClose) onClose();
          }}
          style={{
            left: menuLocation[0] + "px",
            top: menuLocation[1] + "px",
          }}
          className="z-10 shadow-lg rounded-md left-[100%] absolute bg-white p-1 dark:bg-gray-700 text-gray-600 dark:text-gray-200 w-fit"
        >
          <div className="flex flex-col">
            {menuItems
              .sort((a, b) => a.text.localeCompare(b.text))
              .map((i) => {
                return (
                  <button
                    key={i.text}
                    onClick={() => {
                      i.onClick();
                      setIsMenuVisible(false);
                      if (onClose) onClose();
                    }}
                    className="hover:bg-gray-200 dark:hover:bg-gray-500 rounded  px-2 text-left whitespace-nowrap capitalize"
                  >
                    {i.text}
                  </button>
                );
              })}
          </div>
        </Dialog>
      </Transition>
    );
  }
);

export default ContextMenu;
