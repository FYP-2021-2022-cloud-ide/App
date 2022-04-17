import { InformationCircleIcon } from "@heroicons/react/solid";
import _ from "lodash";
import { EntryProps } from "../types";
import { TooltipProvider } from "../../../contexts/Tooltip";
import { useModalForm } from "../modalFormContext";

function Label({ tooltip, text }: { tooltip?: string; text: string }) {
  return (
    <div className="flex flex-row space-x-2 w-fit items-center">
      <p className="capitalize" id="name">
        {text}
      </p>
      {tooltip && (
        <>
          <TooltipProvider text={tooltip}>
            {(setTriggerRef) => (
              <div ref={setTriggerRef}>
                <InformationCircleIcon
                  id="tooltip-icon"
                  className="w-5 h-5 text-gray-700 dark:text-gray-300"
                />
              </div>
            )}
          </TooltipProvider>
        </>
      )}
    </div>
  );
}

function Component({
  children,
  id,
  sectionId,
}: { children: JSX.Element } & EntryProps) {
  const { formStructure } = useModalForm();
  const entry = formStructure[sectionId].entries[id];
  return (
    <div id={id} data-entry-type={entry.type}>
      {entry.label && (
        <Label tooltip={entry.tooltip} text={entry.label}></Label>
      )}
      {children}
    </div>
  );
}

export default Component;
