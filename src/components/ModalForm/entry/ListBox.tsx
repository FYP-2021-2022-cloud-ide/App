import ListBox from "../../ListBox";
import { EntryProps, ListBoxEntry } from "../types";
import Custom from "./Custom";

const component = (props: EntryProps) => {
  const entry = props.entry as ListBoxEntry;
  if (entry.type != "listbox") return <></>;
  return (
    <Custom
      {...props}
      entry={{
        ...entry,
        node: (onChange, data, formData) => (
          <ListBox
            selected={data}
            onChange={onChange}
            options={entry.options}
          />
        ),
      }}
    ></Custom>
  );
};

export default component;
