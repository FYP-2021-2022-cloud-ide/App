import ListBox from "../../ListBox";
import { useModalForm } from "../modalFormContext";
import { EntryProps, ListBoxEntry } from "../types";
import Custom from "./Custom";

function Component<T>(props: EntryProps) {
  const { data, formStructure, changeData } = useModalForm<T>();
  const { sectionId, id } = props;
  const entry = formStructure[sectionId].entries[id] as ListBoxEntry<T>;
  if (entry.type != "listbox") return <></>;
  return (
    <Custom {...props}>
      <ListBox
        selected={data[sectionId][id]}
        onChange={(newValue) => {
          changeData(newValue, sectionId, id);
        }}
        options={entry.options}
      />
    </Custom>
  );
}

export default Component;
