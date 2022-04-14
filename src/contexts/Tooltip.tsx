import React, { createContext, SetStateAction } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import ReactDOM from "react-dom";
import classNames from "../lib/classnames";

type TooltipContextState = {};

const TooltipContext = createContext({} as TooltipContextState);

export const TooltipProvider = ({
  children,
  text,
}: {
  children: (
    setTriggerRef: React.Dispatch<SetStateAction<HTMLDivElement>>
  ) => JSX.Element;
  text: string;
}) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();

  return (
    <TooltipContext.Provider value={{}}>
      {children(setTriggerRef)}
      {visible &&
        ReactDOM.createPortal(
          <div
            ref={setTooltipRef}
            {...getTooltipProps({
              className: "tooltip-container",
            })}
          >
            {text}
            <div
              {...getArrowProps({
                className: "tooltip-arrow",
              })}
            />
          </div>,
          document.body
        )}
    </TooltipContext.Provider>
  );
};
