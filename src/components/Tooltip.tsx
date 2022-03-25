import React, { useEffect, useState } from "react";
import { DOMAttributes, HTMLAttributes } from "react";
import { usePopper } from "react-popper";

type Props = {
  className?: string;
  children: React.ReactNode;
  parentEl: HTMLElement;
  offset: [number, number];
};

const Tooltip = React.forwardRef(
  ({ className, children, parentEl, offset }: Props) => {
    const [popperElement, setPopperElement] = useState<HTMLDivElement>();
    const { styles, attributes, update } = usePopper(parentEl, popperElement, {
      placement: "bottom",

      modifiers: [
        {
          name: "offset",
          options: {
            offset: offset,
          },
        },
        {
          name: "preventOverflow",
          options: {
            mainAxis: false, // true by
            altAxis: false,
          },
        },
      ],
    });

    return (
      <div
        className={`flex flex-col items-center ${className}`}
        id="tooltip"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        onClick={() => {
          console.log(parentEl, popperElement);
        }}
      >
        <div id="tooltip-arrow" className="tooltip-arrow-up"></div>
        <div
          id="tooltip-content"
          className=" bg-red-200 backdrop-blur rounded text-center p-2 text-xs "
        >
          {children}
        </div>
      </div>
    );
  }
);

export default Tooltip;
