import { memo, useCallback } from "react";
import { useModalForm } from "../modalFormContext";
import { EntryProps, TextAreaEntry } from "../types";
import Custom from "./Custom";

function Component(props: EntryProps) {
  const { formStructure, data, changeData } = useModalForm();
  const { sectionId, id } = props;
  const entry = formStructure[sectionId].entries[id] as TextAreaEntry;
  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      changeData(e.target.value, sectionId, id);
    },
    [changeData, sectionId, id]
  );
  if (entry.type != "textarea") return <></>;
  return (
    <Custom {...props}>
      <textarea
        className=" min-h-[100px] max-h-[400px] border dark:border-0 focus:outline-none dark:bg-gray-700 p-1 px-3 w-full text-gray-500 dark:text-gray-300 flex-row space-x-2  text-left rounded-xl shadow-lg h-32"
        value={data[sectionId][id]}
        placeholder={entry.placeholder}
        disabled={entry.disabled}
        onChange={onChange}
      ></textarea>
    </Custom>
  );
}
export default Component;
