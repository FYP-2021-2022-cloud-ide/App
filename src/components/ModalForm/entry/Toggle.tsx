import { EntryProps, ToggleEntry } from "../types";
import Toggle from "../../Toggle";
import Custom from "./Custom";
import { useModalForm } from "../modalFormContext";
import { useCallback } from "react";

function Component(props: EntryProps) {
  const { formStructure, data, changeData } = useModalForm();
  const { sectionId, id } = props;
  const entry = formStructure[sectionId].entries[id] as ToggleEntry;
  const onChange = useCallback(
    (newValue) => {
      changeData(newValue, sectionId, id);
    },
    [changeData, sectionId, id]
  );
  if (entry.type != "toggle") return <></>;
  return (
    <Custom {...props}>
      <Toggle
        text={entry.label}
        onChange={onChange}
        enabled={data[sectionId][id]}
      ></Toggle>
    </Custom>
  );
}

export default Component;
