import { Dialog } from "@headlessui/react";
import React, { createRef, useEffect, useRef, useState } from "react";
import ListBox, { Option } from "./ListBox";
import Modal, { ModalProps } from "./Modal";
import Toggle from "./Toggle";
import { InformationCircleIcon } from "@heroicons/react/solid";

// export type Data = { [id: string]: boolean | string | Option  };
export type Data = { [id: string]: any };

export type ValidationOutput = { ok: false; message: string } | { ok: true };

export type Entry = {
  text?: string;
  description?: string;
  tooltip?: string;
  conditional?: (data: Data) => boolean; // return a boolean which determine whether it is shown
  validate?: (data: Data) => ValidationOutput;
} & (
  | {
      type: "input";
      defaultValue: string;
      placeholder?: string;
      emptyValue?: string; // when empty value is given, this value will be return on enter when the actual value is empty
      disabled?: boolean;
    }
  | {
      type: "textarea";
      defaultValue: string;
      placeholder?: string;
      emptyValue?: string; // when empty value is given, this value will be return on enter when the actual value is empty
      disabled?: boolean;
    }
  | { type: "listbox"; defaultValue: Option; options: Option[] }
  | { type: "toggle"; defaultValue: boolean }
  | {
      type: "custom";
      defaultValue: any;
      node: (
        onChange: (newValue: any) => void,
        currentValue: any
      ) => React.ReactNode;
    }
);

// the key of a form structure will be the title
export type Section = {
  children?: React.ReactNode; // support drop in react elements
  displayTitle?: boolean;
  conditional?: (data: Data) => boolean;
  entries: { [id: string]: Entry };
};

export type FormStructure = { [title: string]: Section };

export type Props = {
  isOpen: Boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clickOutsideToClose?: boolean;
  onOpen?: () => void;
  onClose?: (data: Data, isEnter: boolean) => void;
  title: string;
  size?: "sm" | "md" | "lg";
  formStructure: FormStructure;
  onChange?: (data: Data, id: string) => void;
  onEnter?: (data: Data) => void;
};

const Entry = ({
  zIndex,
  entry,
  id,
  data,
  onChange,
}: {
  zIndex: number;
  entry: Entry;
  id: string;
  data: Data;
  onChange: (newData: Data, id: string) => void;
}) => {
  if (entry.conditional) {
    if (!entry.conditional(data)) return <></>;
  }
  if (entry.type == "input") {
    return (
      <div className="" style={{ zIndex: zIndex }}>
        <div className="flex flex-row space-x-2  items-center">
          {entry.text && (
            <p className="modal-form-text-base capitalize">{entry.text}</p>
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
        <Input
          text={data[id] as string}
          placeholder={entry.placeholder}
          disabled={entry.disabled}
          onChange={(text) => {
            if (text == "" && entry.emptyValue) {
              text = entry.emptyValue;
            }
            onChange(Object.assign(data, { [id]: text }), id);
          }}
          validate={() => {
            if (entry.validate) return entry.validate(data);
            else return { ok: true, message: "" };
          }}
        ></Input>
      </div>
    );
  } else if (entry.type == "textarea") {
    return (
      <div style={{ zIndex: zIndex }}>
        <div className="flex flex-row space-x-2  items-center">
          {entry.text && (
            <p className="modal-form-text-base capitalize">{entry.text}</p>
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
          text={data[id] as string}
          placeholder={entry.placeholder}
          disabled={entry.disabled}
          onChange={(text) => {
            if (text == "" && entry.emptyValue) {
              text = entry.emptyValue;
            }
            onChange(Object.assign(data, { [id]: text }), id);
          }}
        ></TextArea>
      </div>
    );
  } else if (entry.type == "listbox") {
    return (
      <div className="modal-form-list-box" style={{ zIndex: zIndex }}>
        <div className="flex flex-row space-x-2 items-center">
          {entry.text && (
            <p className="modal-form-text-base capitalize">{entry.text}</p>
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
        <ListBox
          initSelected={data[id] as Option}
          onChange={(option) =>
            onChange(Object.assign(data, { [id]: option }), id)
          }
          options={entry.options}
        />
      </div>
    );
  } else if (entry.type == "toggle") {
    return (
      <div className="modal-form-toggle" style={{ zIndex: zIndex }}>
        {entry.text && (
          <p className="modal-form-text-base capitalize">{entry.text}</p>
        )}
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
  } else if (entry.type == "custom") {
    return (
      <div style={{ zIndex: zIndex }}>
        <div className="flex flex-row space-x-2 items-center">
          {entry.text && (
            <p className="modal-form-text-base capitalize">{entry.text}</p>
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
        {entry.node(
          (newValue) => onChange(Object.assign(data, { [id]: newValue }), id),
          data[id]
        )}
      </div>
    );
  } else throw new Error("not such entry type in <ModalForm>");
};

const TextArea = ({
  text: _text,
  placeholder,
  disabled = false,
  onChange,
}: {
  text: string;
  placeholder: string;
  disabled?: boolean;
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
        onChange(e.target.value);
      }}
      disabled={disabled}
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
  data: Data;
  onChange: (newValues: Data, id: string) => void; // return the new values of this sections
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
          : Object.keys(section.entries).map((id, index) => (
              <Entry
                zIndex={Object.keys(section.entries).length - index}
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
  const [text, setText] = useState(_text);
  //@ts-ignore
  const { ok, message } = validate();
  return (
    <div>
      <input
        className={`modal-form-input text-gray-500 dark:text-gray-300 ${
          disabled ? "dark:text-gray-500 text-gray-300" : ""
        } ${
          ok
            ? ""
            : "border-red-400 border-2 bg-red-100 dark:bg-red-100  dark:border-red-400 dark:focus:outline-none text-gray-500 dark:text-gray-500 ring-2 ring-red-400"
        }`}
        placeholder={placeholder}
        value={text}
        data-tip={message}
        onChange={(e) => {
          setText(e.target.value);
          onChange(e.target.value);
        }}
        disabled={disabled}
      ></input>
      {!ok && (
        <p className="text-red-400 text-xs mt-1 ml-2 shiver"> {message}</p>
      )}
    </div>
  );
};

const fromStructureToData = (structure: FormStructure): Data => {
  let data: Data = {};
  Object.keys(structure).forEach((title) => {
    Object.keys(structure[title].entries).forEach((entry) => {
      const type = structure[title].entries[entry].type;
      //@ts-ignore
      const emptyValue = structure[title].entries[entry].emptyValue;
      if (
        (type === "input" || type === "textarea") &&
        structure[title].entries[entry].defaultValue == "" &&
        emptyValue
      ) {
        data[entry] = emptyValue;
      } else data[entry] = structure[title].entries[entry].defaultValue;
    });
  });
  return data;
};

const ModalForm = ({
  isOpen,
  setOpen,
  onClose,
  onOpen,
  clickOutsideToClose,
  formStructure,
  onEnter,
  title,
  size = "sm",
  onChange,
}: Props) => {
  let ref = createRef<HTMLDivElement>();
  let okBtnRef = createRef<HTMLButtonElement>();
  const [data, setData] = useState<Data>(fromStructureToData(formStructure));
  const sizeMap = {
    sm: "w-[550px]",
    md: "w-[850px]",
    lg: "w-[1100px]",
  };

  useEffect(() => {
    setData(fromStructureToData(formStructure));
  }, [formStructure]);

  const patchedOnClose = (isEnter: boolean = false) => {
    if (onClose) {
      onClose(data, isEnter);
    }
    setData(fromStructureToData(formStructure));
  };

  const canProceed = (): boolean => {
    return Object.keys(formStructure).every((sectionTitle) =>
      Object.keys(formStructure[sectionTitle].entries).every((entryTitle) => {
        if (formStructure[sectionTitle].entries[entryTitle].validate) {
          return formStructure[sectionTitle].entries[entryTitle].validate(data)
            .ok;
        } else return true;
      })
    );
  };
  // size = "lg";

  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      onClose={patchedOnClose}
      onOpen={onOpen}
      clickOutsideToClose={clickOutsideToClose}
    >
      <div ref={ref} className={`modal-form ${sizeMap[size]} hide-scroll `}>
        <div className="modal-form-content">
          <Dialog.Title as="h3" className="modal-form-title capitalize">
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
                  if (onChange) onChange(newData, id);
                }}
              ></Section>
            );
          })}
          <div className="modal-form-btn-row pt-4">
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
              className={
                canProceed() ? "modal-form-btn-ok" : "modal-form-btn-cancel"
              }
              disabled={!canProceed()}
              onClick={() => {
                if (onEnter) {
                  onEnter(data);
                  setOpen(false);
                  patchedOnClose(true);
                }
              }}
              ref={okBtnRef}
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
