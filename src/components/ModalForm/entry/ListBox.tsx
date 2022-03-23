import { EntryProps } from "../types";
import ListBox, { Option } from "../../ListBox";
import { InformationCircleIcon } from "@heroicons/react/solid";

const component = ({
  zIndex,
  id,
  entry,
  sectionId,
  data,
  onChange,
}: EntryProps) => {
  if (entry.type != "listbox") return <></>;
  return (
    <div className="modal-form-list-box" style={{ zIndex: zIndex }} id={id}>
      <div className="flex flex-row space-x-2 items-center">
        {entry.label && (
          <p className="modal-form-text-base capitalize">{entry.label}</p>
        )}
        {entry.tooltip && (
          <div
            className="tooltip tooltip-bottom tooltip-info"
            data-tip={entry.tooltip}
          >
            <InformationCircleIcon className="tooltip-icon" />
          </div>
        )}
      </div>
      <ListBox
        selected={data[sectionId][id] as Option}
        onChange={onChange}
        options={entry.options}
      />
    </div>
  );
};

export default component;
