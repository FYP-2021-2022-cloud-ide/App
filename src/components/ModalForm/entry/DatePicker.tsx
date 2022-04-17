import { useModalForm } from "../modalFormContext";
import { DateTimeEntry, EntryProps } from "../types";
import Custom from "./Custom";

function Component(props: EntryProps) {
  const { sectionId, id } = props;
  const { formStructure, changeData } = useModalForm<any>();
  const entry = formStructure[sectionId].entries[id] as DateTimeEntry<any>;
  if (entry.type != "datetime") return <></>;
  return (
    <Custom
      {...props}
      // entry={{
      //   ...entry,
      //   node: (onChange, data, formData) => {
      //     return (
      //       <input
      //         type="datetime-local"
      //         defaultValue={data}
      //         onChange={(e) => onChange(e.target.value)}
      //       />
      //     );
      //   },
      // }}
    >
      <input
        type="datetime-local"
        defaultValue={entry.defaultValue}
        onChange={(e) => changeData(e.target.value, sectionId, id)}
      />
    </Custom>
  );
}

export default Component;
