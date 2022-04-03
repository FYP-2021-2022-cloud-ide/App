import { EntryProps, ToggleEntry } from "../types";
import Toggle from "../../Toggle";
import Custom from "./Custom";

const component = (props: EntryProps) => {
  const entry = props.entry as ToggleEntry;
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
