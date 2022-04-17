import { memo } from "react";
import { useModalForm } from "../modalFormContext";
import { EntryProps, TextAreaEntry } from "../types";
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
          onChange(e.target.value);
        }}
        disabled={disabled}
      ></textarea>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.onChange == nextProps.onChange;
  }
);

function Component(props: EntryProps) {
  const { formStructure, data, changeData } = useModalForm();
  const { sectionId, id } = props;
  const entry = formStructure[sectionId].entries[id] as TextAreaEntry;
  if (entry.type != "textarea") return <></>;
  return (
    <Custom {...props}>
      <TextArea
        text={data[sectionId][id]}
        placeholder={entry.placeholder}
        disabled={entry.disabled}
        onChange={(text) => {
          changeData(text, sectionId, id);
        }}
      ></TextArea>
    </Custom>
  );
}
export default Component;
