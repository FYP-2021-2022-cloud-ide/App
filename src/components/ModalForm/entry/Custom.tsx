import { InformationCircleIcon } from "@heroicons/react/solid";
import _ from "lodash";
import { EntryProps } from "../types";
import { TooltipProvider } from "../../../contexts/Tooltip";

function Label<T>({ entry }: EntryProps<T>) {
  return (
    <div className="flex flex-row space-x-2 items-center">
      {entry.label && (
        <p className="modal-form-text-base capitalize" id="label">
          {entry.label}
        </p>
      )}
      {entry.tooltip && (
        <>
          <TooltipProvider text={entry.tooltip}>
            {(setTriggerRef) => (
              <div ref={setTriggerRef}>
                <InformationCircleIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
            )}
          </TooltipProvider>
        </>
      )}
    </div>
  );
}

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
}

export default Component;
