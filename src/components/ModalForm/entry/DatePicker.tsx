import { useCallback } from "react";
import { useModalForm } from "../modalFormContext";
import { DateTimeEntry, EntryProps } from "../types";
import Custom from "./Custom";

function Component(props: EntryProps) {
  const { sectionId, id } = props;
  const { formStructure, changeData } = useModalForm();
  const entry = formStructure[sectionId].entries[id] as DateTimeEntry;
  const onChange = useCallback(
    (e) => changeData(e.target.value, sectionId, id),
    [changeData, sectionId, id]
  );
  if (entry.type != "datetime") return <></>;
  return (
    <Custom {...props}>
      <input
        type="datetime-local"
        defaultValue={entry.defaultValue}
        onChange={onChange}
      />
    </Custom>
  );
}

export default Component;
