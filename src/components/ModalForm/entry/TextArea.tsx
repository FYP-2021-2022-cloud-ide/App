import { InformationCircleIcon } from "@heroicons/react/solid";
import { memo, useEffect, useRef } from "react";
import { EntryProps, ValidationOutput } from "../types";

const TextArea = memo(
  ({
    text: _text,
    placeholder,
    disabled = false,
    onChange,
    isMarkdown = false,
  }: {
    text: string;
    placeholder: string;
    disabled?: boolean;
    onChange: (text: string) => void;
    isMarkdown?: boolean;
  }) => {
    // const [text, setText] = useState(_text);
    const ref = useRef<HTMLTextAreaElement>();
    useEffect(() => {
      if (ref.current) {
        ref.current.value = _text;
      }
    }, []);
    return (
      <textarea
        className="modal-form-textarea"
        placeholder={placeholder}
        ref={ref}
        // value={text}
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

const component = ({
  zIndex,
  id,
  entry,
  sectionId,
  data,
  onChange,
}: EntryProps) => {
  if (entry.type != "textarea") return <></>;
  return (
    <div style={{ zIndex: zIndex }} id={id}>
      <div className="flex flex-row space-x-2  items-center">
        {entry.label && (
          <p className="modal-form-text-base capitalize">{entry.label}</p>
        )}
        {entry.tooltip && (
          <div
            className="tooltip tooltip-bottom tooltip-info"
            data-tip={entry.tooltip}
          >
            <InformationCircleIcon className="tooltip-icon" />
          </div>
        )}
      </div>

      <TextArea
        text={data[sectionId][id] as string}
        placeholder={entry.placeholder}
        disabled={entry.disabled}
        onChange={(text) => {
          if (text == "" && entry.emptyValue) {
            text = entry.emptyValue;
          }
          onChange(text);
        }}
      ></TextArea>
    </div>
  );
};
export default component;
