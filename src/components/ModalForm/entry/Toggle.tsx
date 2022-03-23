import { EntryProps } from "../types";
import ListBox, { Option } from "../../ListBox";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Toggle from "../../Toggle";

const component = ({
  zIndex,
  id,
  entry,
  sectionId,
  data,
  onChange,
}: EntryProps) => {
  return (
    <div className="modal-form-toggle" style={{ zIndex: zIndex }} id={id}>
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
      <Toggle
        text={entry.label}
        onChange={onChange}
        enabled={data[sectionId][id] as boolean}
      ></Toggle>
    </div>
  );
};

export default component;
