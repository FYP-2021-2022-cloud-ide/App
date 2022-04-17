import { EntryProps, ToggleEntry } from "../types";
import Toggle from "../../Toggle";
import Custom from "./Custom";
import { useModalForm } from "../modalFormContext";

function Component(props: EntryProps) {
  const { formStructure, data, changeData } = useModalForm<any>();
  const { sectionId, id } = props;
  const entry = formStructure[sectionId].entries[id] as ToggleEntry<any>;
  if (entry.type != "toggle") return <></>;
  return (
    <Custom {...props}>
      <Toggle
        text={entry.label}
        onChange={(newValue) => {
          changeData(newValue, sectionId, id);
        }}
        enabled={data[sectionId][id]}
      ></Toggle>
    </Custom>
  );
}

export default Component;
