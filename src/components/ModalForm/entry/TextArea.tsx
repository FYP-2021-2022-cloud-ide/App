import { InformationCircleIcon } from "@heroicons/react/solid";
import { memo, useEffect, useRef } from "react";
import { EntryProps, TextAreaEntry, ValidationOutput } from "../types";
import Custom from "./Custom";

const TextArea = memo(
  ({
    text,
    placeholder,
    disabled = false,
    onChange,
  }: {
    text: string;
    placeholder: string;
    disabled?: boolean;
    onChange: (text: string) => void;
  }) => {
    return (
      <textarea
        className=" min-h-[100px] max-h-[400px] border dark:border-0 focus:outline-none dark:bg-gray-700 p-1 px-3 w-full text-gray-500 dark:text-gray-300 flex-row space-x-2  text-left rounded-xl shadow-lg h-32"
        placeholder={placeholder}
        // this component will never be rerender so the input props is the default value
        defaultValue={text}
        onChange={(e) => {
          // setText(e.target.value);
          onChange(e.target.value);
        }}
        disabled={disabled}
      ></textarea>
    );
  },
  () => true
);

const component = (props: EntryProps) => {
  const entry = props.entry as TextAreaEntry;
  if (entry.type != "textarea") return <></>;
  return (
    <Custom
      {...props}
      entry={{
        ...entry,
        node: (onChange, data) => (
          <TextArea
            text={data}
            placeholder={entry.placeholder}
            disabled={entry.disabled}
            onChange={(text) => {
              if (text == "" && entry.emptyValue) {
                text = entry.emptyValue;
              }
              onChange(text);
            }}
          ></TextArea>
        ),
      }}
    ></Custom>
  );
};
export default component;
