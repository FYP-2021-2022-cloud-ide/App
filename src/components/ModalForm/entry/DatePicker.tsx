import { useRef, useState } from "react";
import { DateTimeEntry, EntryProps } from "../types";
import styles from "./DatePicker.module.css";
import classNames from "../../../lib/classnames";
import { usePopper } from "react-popper";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Custom from "./Custom";

const component = (props: EntryProps) => {
  const entry = props.entry as DateTimeEntry;
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

export default component;
