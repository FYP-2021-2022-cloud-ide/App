import _ from "lodash";
import { memo, useCallback, useRef } from "react";
import { useModalForm } from "../modalFormContext";
import { EntryProps, InputEntry, ValidationOutput } from "../types";
import Custom from "./Custom";

function Component(props: EntryProps) {
  const { sectionId, id } = props;
  const { formStructure, data, changeData } = useModalForm<any>();
  const entry = formStructure[sectionId].entries[id] as InputEntry<any>;
  const validate: ValidationOutput = entry.validate
    ? entry.validate(data)
    : { ok: true };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      changeData(e.target.value, sectionId, id);
    },
    [changeData, sectionId, id]
  );

  if (entry.type != "input") return <></>;

  return (
    <Custom {...props}>
      <>
        <input
          data-validate={validate.ok}
          className={`border-gray-300 dark:border-gray-600 border dark:border-0 focus:outline-none dark:bg-gray-700 p-1 px-3 w-full flex-row space-x-2  text-left rounded-md shadow-md text-gray-500 dark:text-gray-300 ${
            entry.disabled ? "dark:text-gray-500 text-gray-300" : ""
          }`}
          placeholder={entry.placeholder}
          value={data[sectionId][id]}
          onChange={onChange}
          disabled={entry.disabled}
        ></input>
        {validate.ok == false && (
          <p
            id="validate-message"
            className="text-red-400 text-xs mt-1 ml-2 shiver"
          >
            {validate.message}
          </p>
        )}
      </>
    </Custom>
  );
}

export default Component;
