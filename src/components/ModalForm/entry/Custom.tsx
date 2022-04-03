import { InformationCircleIcon } from "@heroicons/react/solid";
import _ from "lodash";
import { EntryProps } from "../types";
import ReactDOM from "react-dom";
import { usePopperTooltip } from "react-popper-tooltip";
import styles from "./Tooltip.module.css";
import classNames from "../../../lib/classnames";

function Label<T>({ entry }: EntryProps<T>) {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();
  return (
    <div className="flex flex-row space-x-2 items-center">
      {entry.label && (
        <p className="modal-form-text-base capitalize" id="label">
          {entry.label}
        </p>
      )}
      {entry.tooltip && (
        <>
          {/* <div
            id="tooltip"
            className="tooltip tooltip-bottom tooltip-info"
            data-tip={entry.tooltip}
          >
            <InformationCircleIcon className="tooltip-icon" />
          </div> */}
          <div ref={setTriggerRef}>
            <InformationCircleIcon className="tooltip-icon" />
          </div>
          {visible &&
            ReactDOM.createPortal(
              <div
                ref={setTooltipRef}
                {...getTooltipProps({
                  className: classNames(styles, "tooltip-container"),
                })}
              >
                {entry.tooltip}
                <div
                  {...getArrowProps({
                    className: classNames(styles, "tooltip-arrow"),
                  })}
                />
              </div>,
              document.body
            )}
        </>
      )}
    </div>
  );
};

function Component<T>(props: EntryProps<T>) {
  const { zIndex, id, entry, sectionId, data, onChange } = props;
  return (
    <div
      style={{ zIndex: zIndex }}
      id={id}
      className={`modal-form-${entry.type}`}
    >
      <Label {...props}></Label>
      {entry.node(onChange, data[sectionId][id], data)}
    </div>
  );
};

export default Component;
