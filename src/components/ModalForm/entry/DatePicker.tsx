
import { DateTimeEntry, EntryProps } from "../types";
import Custom from "./Custom";

function Component<T>(props: EntryProps<T>) {
  const entry = props.entry as DateTimeEntry<T>;
  if (entry.type != "datetime") return <></>;
  return (
    <Custom
      {...props}
      entry={{
        ...entry,
        node: (onChange, data, formData) => {
          return (
            <input
              type="datetime-local"
              defaultValue={data}
              onChange={(e) => onChange(e.target.value)}
            />
          );
        },
      }}
    />
  );
};

export default Component;
