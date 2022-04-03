import { EntryProps, ToggleEntry } from "../types";
import Toggle from "../../Toggle";
import Custom from "./Custom";

function component <T>(props: EntryProps<T>) {
  const entry = props.entry as ToggleEntry<T>;
  if (entry.type != "toggle") return <></>;
  return (
    <Custom
      {...props}
      entry={{
        ...entry,
        node: (onChange, currentValue) => (
          <Toggle
            text={entry.label}
            onChange={onChange}
            enabled={currentValue}
          ></Toggle>
        ),
      }}
    ></Custom>
  );
};

export default component;
