import { useCallback } from "react";
import ListBox from "../../ListBox";
import { useModalForm } from "../modalFormContext";
import { EntryProps, ListBoxEntry } from "../types";
import Custom from "./Custom";

function Component(props: EntryProps) {
  const { data, formStructure, changeData } = useModalForm();
  const { sectionId, id } = props;
  const entry = formStructure[sectionId].entries[id] as ListBoxEntry;
  const onChange = useCallback(
    (newValue) => {
      changeData(newValue, sectionId, id);
    },
    [changeData, sectionId, id]
  );
  if (entry.type != "listbox") return <></>;
  return (
    <Custom {...props}>
      <ListBox
        selected={data[sectionId][id]}
        onChange={onChange}
        options={entry.options}
      />
    </Custom>
  );
}

export default Component;
