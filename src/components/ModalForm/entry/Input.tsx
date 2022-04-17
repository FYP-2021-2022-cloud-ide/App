import _ from "lodash";
import { memo, useRef } from "react";
import { useModalForm } from "../modalFormContext";
import { EntryProps, InputEntry, ValidationOutput } from "../types";
import Custom from "./Custom";

const Input = memo(
  ({
    text,
    placeholder,
    disabled = false,
    onChange,
    validate,
  }: {
    text: string;
    placeholder: string;
    disabled?: boolean;
    onChange: (text: string) => void;
    validate: (targetValue: any) => ValidationOutput;
  }) => {
    const ref = useRef<HTMLInputElement>();
    const validationMsgRef = useRef<HTMLParagraphElement>();
    return (
      <>
        <input
          ref={ref}
          className={`border-gray-300 dark:border-gray-600 border dark:border-0 focus:outline-none dark:bg-gray-700 p-1 px-3 w-full flex-row space-x-2  text-left rounded-md shadow-md text-gray-500 dark:text-gray-300 ${
            disabled ? "dark:text-gray-500 text-gray-300" : ""
          }`}
          placeholder={placeholder}
          // this component will never be rerender so text is the default value
          defaultValue={text}
          onChange={(e) => {
            onChange(e.target.value);
            const result = validate(e.target.value);
            if (result.ok == true) {
              ref.current.classList.remove("validate-fail");
              validationMsgRef.current.innerText = "";
              validationMsgRef.current.classList.add("hidden");
            } else {
              ref.current.classList.add("validate-fail");
              validationMsgRef.current.innerText = result.message;
              validationMsgRef.current.classList.remove("hidden");
            }
          }}
          disabled={disabled}
        ></input>
        <p
          ref={validationMsgRef}
          className="text-red-400 text-xs mt-1 ml-2 shiver hidden"
        ></p>
      </>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.onChange == nextProps.onChange;
  }
);

function Component(props: EntryProps) {
  const { sectionId, id } = props;
  const { formStructure, data, changeData } = useModalForm<any>();
  const entry = formStructure[sectionId].entries[id] as InputEntry<any>;
  if (entry.type != "input") return <></>;
  return (
    <Custom
      {...props}
      // entry={{
      //   ...entry,
      //   // when you are creating a custom component,
      //   // you can either use the `onChange` from props or the parameter of callback because they are the same.
      //   // For consistency, we use the value from parameter
      //   node: (onChange, currentValue, data) => (

      //   ),
      // }}
    >
      <Input
        text={data[sectionId][id]}
        placeholder={entry.placeholder}
        disabled={entry.disabled}
        onChange={(text) => {
          changeData(text, sectionId, id);
        }}
        // need to patch the validate function because this is a memorized component
        validate={(targetValue) => {
          if (entry.validate)
            return entry.validate(
              _.cloneDeepWith(data, (data) => {
                data[sectionId][id] = targetValue;
                return data;
              })
            );
          else return { ok: true, message: "" };
        }}
      ></Input>
    </Custom>
  );
}

export default Component;
