import { Dialog } from "@headlessui/react";
import React, { createRef, memo, useEffect, useRef, useState } from "react";
import ListBox, { Option } from "./ListBox";
import Modal, { ModalProps } from "./Modal";
import Toggle from "./Toggle";
import { InformationCircleIcon } from "@heroicons/react/solid";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import EasyMDE from "easymde";
import ReactDOMServer from "react-dom/server";
import { MyMarkDown } from "../pages/messages";
// import { MyMarkDown } from "../pages/messages";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// export type Data = { [id: string]: boolean | string | Option  };
export type Data = { [id: string]: any };

export type ValidationOutput = { ok: false; message: string } | { ok: true };

export type Entry = {
  label?: string;
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
  | { type: "markdown"; defaultValue: string }
  | { type: "date"; defaultValue: string }
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
  displayTitle?: boolean;
  conditional?: (data: Data) => boolean;
  entries: { [id: string]: Entry };
};

export type FormStructure = { [title: string]: Section };

export type Props = {
  /**
   * the open and close state of modal
   */
  isOpen: Boolean;
  /**
   * a setState function which control the open and close of modal
   */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * click the overlay to close the modal
   */
  clickOutsideToClose?: boolean;
  /**
   * press ese key to close the modal
   */
  escToClose?: boolean;
  /**
   * callback when the modal is open
   */
  onOpen?: () => void;
  /**
   * callback when the modal is close
   * @param data the data in the form when the modal is closed
   * @param isEnter whether this form close because of enter
   */
  onClose?: (data: Data, isEnter: boolean) => void;
  /**
   * the title of this form
   */
  title: string;
  /**
   * control the width of the form
   */
  size?: "sm" | "md" | "lg";
  /**
   * The skeleton of the form
   */
  formStructure: FormStructure;
  /**
   * a callback when the data of the form is change
   * @param data the new data
   * @param id the id of the data which is changed
   */
  onChange?: (data: Data, id: string) => void;
  /**
   * a callback when the form is submitted
   */
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
    console.log(entry.conditional(data));
    if (!entry.conditional(data)) return <></>;
  }
  if (entry.type == "input") {
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
      <div className="modal-form-list-box" style={{ zIndex: zIndex }} id={id}>
        <div className="flex flex-row space-x-2 items-center">
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
      <div className="modal-form-toggle" style={{ zIndex: zIndex }} id={id}>
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
        <Toggle
          text={entry.label}
          onChange={(newValue) =>
            onChange(Object.assign(data, { [id]: newValue }), id)
          }
          enabled={data[id] as boolean}
        ></Toggle>
      </div>
    );
  } else if (entry.type == "custom") {
    return (
      <div style={{ zIndex: zIndex }} id={id}>
        <div className="flex flex-row space-x-2 items-center">
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
        {entry.node(
          (newValue) => onChange(Object.assign(data, { [id]: newValue }), id),
          data[id]
        )}
      </div>
    );
  } else if (entry.type == "markdown") {
    return (
      <div
        onDoubleClick={(e) => {
          console.log("called");
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {window && window.navigator && (
          <MDE
            text={data[id] as string}
            onChange={(text) => {
              onChange(Object.assign(data, { [id]: text }), id);
            }}
          />
        )}
      </div>
    );
  } else throw new Error("not such entry type in <ModalForm>");
};

const MDE = memo(
  ({
    text: _text,
    onChange,
  }: {
    text: string;
    onChange: (text: string) => void;
  }) => {
    const mdeRef = useRef<EasyMDE>();
    useEffect(() => {
      const handleTab = (event: KeyboardEvent) => {
        if (
          event.key === "Tab" &&
          mdeRef.current.codemirror
            .getWrapperElement()
            .contains(document.activeElement)
        ) {
          event.stopImmediatePropagation();
          mdeRef.current.codemirror.execCommand("insertSoftTab");
          mdeRef.current.codemirror.execCommand("indentLess");
        }
      };
      window.addEventListener("keydown", handleTab);
      return () => window.removeEventListener("keydown", handleTab);
    }, [mdeRef.current]);
    return (
      <SimpleMDE
        onChange={onChange}
        options={{
          spellChecker: false,
          autofocus: true,
          initialValue: _text,
          // showIcons: ["undo"],
          hideIcons: ["fullscreen"],
          sideBySideFullscreen: false,
          indentWithTabs: false,
          maxHeight: "500px",
          renderingConfig: {},
          previewRender: () => {
            return ReactDOMServer.renderToString(
              <MyMarkDown text={mdeRef.current.codemirror.getValue()} />
            );
            // return ReactDOMServer.renderToString(<div></div>);
          },
        }}
        getMdeInstance={(instance) => {
          mdeRef.current = instance;
        }}
      />
    );
  },
  () => true
);

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
  () => false
);

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
      <div className="flex flex-col space-y-3" id={title}>
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
      </div>
    );
};

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
    // const [text, setText] = useState(_text);
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
            // setText(e.target.value);
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
  () => false
);

/**
 * this function will convert the form structure to the initial data of the form.
 * @param structure
 * @returns
 */
const fromStructureToData = (structure: FormStructure): Data => {
  let data: Data = {};
  if (!structure) return data;
  Object.keys(structure).forEach((title) => {
    Object.keys(structure[title].entries).forEach((entry) => {
      const type = structure[title].entries[entry].type;
      //@ts-ignore
      const emptyValue = structure[title].entries[entry].emptyValue;
      // if the default value is empty and emptyValue exists, data will be the empty value else it will be the defaultValue
      if (
        (type === "input" || type === "textarea" || type === "markdown") &&
        structure[title].entries[entry].defaultValue == "" &&
        emptyValue
      ) {
        data[entry] = emptyValue;
      } else data[entry] = structure[title].entries[entry].defaultValue;
    });
  });
  return data;
};

/**
 * A component to show a form in modal. Use this component to keep consistency in the app.
 * To use this, put the `<ModalForm>` in a component and supply a form structure.
 */
const ModalForm = (props: Props) => {
  const {
    isOpen,
    setOpen,
    onClose,
    onOpen,
    clickOutsideToClose,
    escToClose,
    formStructure,
    onEnter,
    title,
    size = "sm",
    onChange,
  } = props;
  // let ref = createRef<HTMLDivElement>();
  let okBtnRef = createRef<HTMLButtonElement>();
  const [data, setData] = useState<Data>(fromStructureToData(formStructure));
  useEffect(() => {
    setData(fromStructureToData(formStructure));
  }, [formStructure]);

  const sizeMap = {
    sm: "w-[550px]",
    md: "w-[850px]",
    lg: "w-[1100px]",
  };

  const patchedOnClose = (isEnter: boolean = false) => {
    if (onClose) {
      onClose(data, isEnter);
    }
    // reset the initial data
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

  if (!formStructure) return <></>;

  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      onClose={patchedOnClose}
      onOpen={onOpen}
      clickOutsideToClose={clickOutsideToClose}
      escToClose={escToClose}
    >
      <div className={`modal-form ${sizeMap[size]} hide-scroll `}>
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
                  console.log(newData, id);
                  setData(Object.assign({}, newData));
                  if (onChange) onChange(newData, id);
                }}
              ></Section>
            );
          })}
          <div className="modal-form-btn-row pt-4">
            <button
              className="modal-form-btn-cancel "
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
