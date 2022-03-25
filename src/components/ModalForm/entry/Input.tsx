import { memo } from "react";
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
    validate: () => ValidationOutput;
  }) => {
    const validationResult = validate();
    return (
      <div>
        <input
          className={` border dark:border-0 focus:outline-none dark:bg-gray-700 p-1 px-3 w-full flex-row space-x-2  text-left rounded-md shadow-lg text-gray-500 dark:text-gray-300 ${
            disabled ? "dark:text-gray-500 text-gray-300" : ""
          } ${
            validationResult.ok
              ? ""
              : "border-red-400 border-2 bg-red-100 dark:bg-red-100  dark:border-red-400 dark:focus:outline-none text-gray-500 dark:text-gray-500 ring-2 ring-red-400"
          }`}
          placeholder={placeholder}
          // this component will never be rerender so text is the default value
          defaultValue={text}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          disabled={disabled}
        ></input>
        {validationResult.ok === false && (
          <p className="text-red-400 text-xs mt-1 ml-2 shiver">
            {" "}
            {validationResult.message}
          </p>
        )}
      </div>
    );
  },
  () => true
);

const component = (props: EntryProps) => {
  const entry = props.entry as InputEntry;
  if (entry.type != "input") return <></>;
  return (
    <Custom
      {...props}
      entry={{
        ...entry,
        // when you are creating a custom component,
        // you can either use the `onChange` from props or the parameter of callback because they are the same.
        // For consistency, we use the value from parameter
        node: (onChange, currentValue, data) => (
          <Input
            text={currentValue}
            placeholder={entry.placeholder}
            disabled={entry.disabled}
            onChange={(text) => {
              if (text == "" && entry.emptyValue) {
                text = entry.emptyValue;
              }
              onChange(text);
            }}
            validate={() => {
              if (entry.validate) return entry.validate(data);
              else return { ok: true, message: "" };
            }}
          ></Input>
        ),
      }}
    />
  );
};

export default component;
