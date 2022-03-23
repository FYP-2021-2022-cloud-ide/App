import { InformationCircleIcon } from "@heroicons/react/solid";
import { memo, useEffect, useRef } from "react";
import { EntryProps, ValidationOutput } from "../types";

const Input = memo(
  ({
    text: _text,
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
    const ref = useRef<HTMLInputElement>();
    useEffect(() => {
      if (ref.current) {
        ref.current.value = _text;
      }
    }, []);
    const validationResult = validate();
    return (
      <div>
        <input
          ref={ref}
          className={`modal-form-input text-gray-500 dark:text-gray-300 ${
            disabled ? "dark:text-gray-500 text-gray-300" : ""
          } ${
            validationResult.ok
              ? ""
              : "border-red-400 border-2 bg-red-100 dark:bg-red-100  dark:border-red-400 dark:focus:outline-none text-gray-500 dark:text-gray-500 ring-2 ring-red-400"
          }`}
          placeholder={placeholder}
          // value={text}
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

const component = ({
  zIndex,
  id,
  entry,
  sectionId,
  data,
  onChange,
}: EntryProps) => {
  if (entry.type != "input") return <></>;
  return (
    <div className="" style={{ zIndex: zIndex }} id={id}>
      <div className="flex flex-row space-x-2  items-center">
        {entry.label && (
          <p className="modal-form-text-base capitalize">{entry.label}</p>
        )}
        {entry.tooltip && (
          <div className="tooltip tooltip-info" data-tip={entry.tooltip}>
            <InformationCircleIcon className="tooltip-icon" />
          </div>
        )}
      </div>
      <Input
        text={data[sectionId][id] as string}
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
    </div>
  );
};

export default component;
