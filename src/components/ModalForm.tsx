import { Dialog } from "@headlessui/react";
import React, { createRef, useRef, useState } from "react";
import ListBox, { Option } from "./course/instructor/ListBox";
import Modal, { ModalProps } from "./Modal";
import Toggle from "./Toggle";
import { InformationCircleIcon } from "@heroicons/react/solid";

export type Entry = {
  type: "input" | "textarea" | "listbox" | "toggle";
  text?: string;
  placeholder?: string;
  options?: Option[]; // for listbox
  description?: string;
  tooltip?: string;
  conditional?: (data: { [id: string]: boolean | string | Option }) => boolean; // return a boolean which determine whether it is shown
};

export type Section = {
  children?: React.ReactNode; // support drop in react elements
  displayTitle?: boolean;
  conditional?: (data: { [id: string]: boolean | string | Option }) => boolean;
  entries: { [id: string]: Entry };
};

export type Props = ModalProps & {
  title: string;
  formStructure?: { [title: string]: Section };
  initData: { [id: string]: boolean | string | Option };
  onChange?: (
    data: { [id: string]: boolean | string | Option },
    id: string
  ) => void;
  onEnter?: (data: { [id: string]: boolean | string | Option }) => void;
};

const Entry = ({
  entry,
  id,
  data,
  onChange,
}: {
  entry: Entry;
  id: string;
  data: { [id: string]: boolean | string | Option };
  onChange: (
    newData: { [id: string]: boolean | string | Option },
    id: string
  ) => void;
}) => {
  if (entry.conditional) {
    if (!entry.conditional(data)) return <></>;
  }
  if (entry.type == "input") {
    return (
      <div className="">
        <p className="modal-form-text-base">{entry.text}</p>
        <Input
          text={data[id] as string}
          placeholder={entry.placeholder}
          onChange={(text) => onChange(Object.assign(data, { [id]: text }), id)}
        ></Input>
      </div>
    );
  } else if (entry.type == "textarea") {
    return (
      <div>
        <p className="modal-form-text-base">{entry.text}</p>
        <TextArea
          text={data[id] as string}
          placeholder={entry.placeholder}
          onChange={(text) => onChange(Object.assign(data, { [id]: text }), id)}
        ></TextArea>
      </div>
    );
  } else if (entry.type == "listbox") {
    return (
      <div className="modal-form-list-box">
        <p className="modal-form-text-base">{entry.text}</p>
        <ListBox
          initSelected={data[id] as Option}
          onChange={(option) =>
            onChange(Object.assign(data, { [id]: option }), id)
          }
          environments={entry.options}
        />
      </div>
    );
  } else if (entry.type == "toggle") {
    return (
      <div className="modal-form-toggle">
        <p className="modal-form-text-base">{entry.text}</p>
        {entry.tooltip && (
          <div
            className="tooltip tooltip-bottom tooltip-info"
            data-tip={entry.tooltip}
          >
            <InformationCircleIcon className="tooltip-icon" />
          </div>
        )}
        <Toggle
          text={entry.text}
          onChange={(newValue) =>
            onChange(Object.assign(data, { [id]: newValue }), id)
          }
          enabled={data[id] as boolean}
        ></Toggle>
      </div>
    );
  } else throw new Error("not such entry type in <ModalForm>");
};

const TextArea = ({
  text: _text,
  placeholder,
  onChange,
}: {
  text: string;
  placeholder: string;
  onChange: (text: string) => void;
}) => {
  const [text, setText] = useState(_text);
  return (
    <textarea
      className="modal-form-textarea"
      placeholder={placeholder}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        onChange(text);
      }}
    ></textarea>
  );
};

const Section = ({
  section,
  title,
  data,
  onChange,
}: {
  section: Section;
  title: string;
  data: {
    [id: string]: boolean | string | Option;
  };
  onChange: (
    newValues: { [id: string]: boolean | string | Option },
    id: string
  ) => void; // return the new values of this sections
}) => {
  if (section.conditional) {
    if (!section.conditional(data)) return <></>;
  } else
    return (
      <>
        {title && section.displayTitle && (
          <div className="font-medium mt-4 dark:text-gray-300">{title}</div>
        )}
        {React.isValidElement(section.entries)
          ? section.entries
          : Object.keys(section.entries).map((id) => (
              <Entry
                key={id}
                entry={section.entries[id]}
                id={id}
                data={data}
                onChange={(newData) => onChange(newData, id)}
              ></Entry>
            ))}
      </>
    );
};

const Input = ({
  text: _text,
  placeholder,
  onChange,
}: {
  text: string;
  placeholder: string;
  onChange: (text: string) => void;
}) => {
  const [text, setText] = useState(_text);
  return (
    <input
      className="modal-form-input"
      placeholder={placeholder}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        onChange(e.target.value);
      }}
    ></input>
  );
};

const ModalForm = ({
  isOpen,
  setOpen,
  onClose,
  onOpen,
  clickOutsideToClose,
  initData,
  formStructure,
  onEnter,
  title,
  onChange,
}: Props) => {
  let ref = createRef<HTMLDivElement>();
  const [data, setData] =
    useState<{ [id: string]: boolean | string | Option }>(initData);

  // check if data match form structure
  Object.keys(formStructure).forEach((sectionTitle) => {
    const section = formStructure[sectionTitle];
    if (!React.isValidElement(section.entries))
      Object.keys(section.entries).forEach((id) => {
        if (data[id] == undefined) {
          throw new Error(
            `form data does not match form structure : ${id} not found in data`
          );
        }
      });
  });

  const patchedOnClose = () => {
    if (onClose) {
      onClose();
    }
    setData(initData);
  };
  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      onClose={patchedOnClose}
      onOpen={onOpen}
      clickOutsideToClose={clickOutsideToClose}
    >
      <div ref={ref} className="modal-form ">
        <div className="modal-form-content">
          <Dialog.Title as="h3" className="modal-form-title">
            {title}
          </Dialog.Title>
          {Object.keys(formStructure).map((sectionTitle) => {
            const section = formStructure[sectionTitle];
            return (
              <Section
                key={sectionTitle}
                section={section}
                title={sectionTitle}
                data={data}
                onChange={(newData, id) => {
                  setData(Object.assign({}, newData));
                  onChange(newData, id);
                }}
              ></Section>
            );
          })}
          <div className="modal-form-btn-row">
            <button
              className="modal-form-btn-cancel"
              onClick={() => {
                setOpen(false);
                patchedOnClose();
              }}
            >
              Cancel
            </button>
            <button
              className="modal-form-btn-ok"
              onClick={() => {
                if (onEnter) {
                  onEnter(data);
                  setOpen(false);
                  patchedOnClose();
                }
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// export default React.memo(ModalForm, (prevProps, nextProps) => {
//   return false;
// });

export default ModalForm;
