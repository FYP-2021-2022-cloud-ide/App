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
import fm from "front-matter";
import flat from "flat";
import _ from "lodash";
import Twemoji from "react-twemoji";
// import { MyMarkDown } from "../pages/messages";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

/**
 *  the id is a flatten JSON object, each property is named in the format of `sectionId.entryId`
 */
export type Data = { [id: string]: any };

export type ValidationOutput = { ok: false; message: string } | { ok: true };

export type Entry = {
  /**
   * label of entry
   */
  label?: string;
  /**
   * description of this entry in small text
   */
  description?: string;
  /**
   * whether this entry has a tooltip. shown next to the label.
   */
  tooltip?: string;
  /**
   * whether this entry should be shown
   */
  conditional?: (data: Data) => boolean;
  /**
   * validate the entry data on input. If the result is not ok, the form cannot proceed.
   */
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
  /**
   * the title of this section
   */
  title?: string;
  /**
   * whether this section should be in a disclosure.
   * If it is not in a disclosure, its content will spread out.
   */
  inDisclosure?: boolean;
  /**
   * whether this section should be shown
   */
  conditional?: (data: Data) => boolean;
  entries: { [id: string]: Entry };
};

/**
 * a form is composed of many sections
 */
export type FormStructure = { [id: string]: Section };

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
   *
   * @param data the new data
   * @param id the id of the data which is changed. id in the form of `sectionId.entryId`
   */
  onChange?: (data: Data, id: string) => void;
  /**
   * a callback when the form is submitted
   */
  onEnter?: (data: Data) => void;
  /**
   * text for the ok and cancel buttons
   */
  btnsText?: { cancel: string; ok: string };
};

type EntryProps = {
  /**
   * the z index to be used for styling. The upper entry usually has a higher z index than a lower entry
   */
  zIndex: number;
  /**
   * an `Entry` object from the `FromStructure`
   */
  entry: Entry;
  /**
   * the section of this entry
   */
  sectionId: string;
  /**
   * id of this entry in the format
   */
  id: string;
  /**
   * the current data
   */
  data: Data;
  /**
   * @param data new value of this entry
   */
  onChange: (data: any) => void;
};

const Entry = ({
  zIndex,
  entry,
  id,
  data,
  sectionId,
  onChange,
}: EntryProps) => {
  if (entry.conditional) {
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
          selected={data[sectionId][id] as Option}
          onChange={onChange}
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
          onChange={onChange}
          enabled={data[sectionId][id] as boolean}
        ></Toggle>
      </div>
    );
  } else if (entry.type == "markdown") {
    const getBadge = () => {
      try {
        return fm(data[sectionId][id] as string).attributes;
      } catch (error) {
        return {};
      }
    };
    return (
      <div>
        {window && window.navigator && (
          <>
            <FrontMatter attributes={getBadge()}></FrontMatter>
            <MDE text={data[sectionId][id] as string} onChange={onChange} />
          </>
        )}
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
        {entry.node((newValue) => onChange(newValue), data[sectionId][id])}
      </div>
    );
  } else throw new Error("not such entry type in <ModalForm>");
};

const validFrontmatter = ["course.code", "status", "course.section"];

const FrontMatter = ({ attributes }: { attributes?: unknown }) => {
  const flattened = flat.flatten(attributes);
  return _.isEqual(attributes, {}) ? (
    <></>
  ) : (
    <div className="flex flex-row space-x-2 mb-4">
      {Object.keys(flattened)
        .filter((a) => validFrontmatter.includes(a))
        .map((a) => {
          return (
            <div
              className={`flex rounded bg-blue-500 select-none overflow-hidden frontmatter-badge-${a.replace(
                ".",
                "-"
              )}`}
            >
              <div className="px-1 text-2xs text-white font-bold">{a}</div>
              <div className="px-1 text-2xs text-white bg-white/20">
                {flattened[a]}
              </div>
            </div>
          );
        })}
    </div>
  );
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
      <>
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
      </>
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
  () => true
);

type SectionProps = {
  /**
   * the `Section` object from `FromStructure`
   */
  section: Section;
  /**
   * id of this section
   */
  id: string;
  /**
   * the current form data
   */
  data: Data;
  /**
   * onChange callback
   *
   * @param data the new value of a data
   * @param id the entry id
   */
  onChange: (data: any, id: string) => void;
};

const Section = ({ section, id: sectionId, data, onChange }: SectionProps) => {
  if (section.conditional) {
    if (!section.conditional(data)) return <></>;
  } else
    return (
      <div className="flex flex-col space-y-3" id={sectionId}>
        {section.title && (
          <div className="font-medium mt-4 dark:text-gray-300">
            {section.title}
          </div>
        )}
        {React.isValidElement(section.entries)
          ? section.entries
          : Object.keys(section.entries).map((id, index) => {
              return (
                <Entry
                  zIndex={Object.keys(section.entries).length - index}
                  key={id}
                  entry={section.entries[id]}
                  id={id}
                  sectionId={sectionId}
                  data={data}
                  onChange={(data) => onChange(data, id)}
                ></Entry>
              );
            })}
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

/**
 * this function will convert the form structure to the initial data of the form.
 * @param sections
 * @returns
 */
const fromStructureToData = (sections: FormStructure): Data => {
  let data: Data = {};
  if (!sections) return data;
  Object.keys(sections).forEach((sectionId) => {
    Object.keys(sections[sectionId].entries).forEach((entryId) => {
      const type = sections[sectionId].entries[entryId].type;
      //@ts-ignore
      const emptyValue = sections[sectionId].entries[entryId].emptyValue;
      // if the default value is empty and emptyValue exists, data will be the empty value else it will be the defaultValue
      const id = `${sectionId}.${entryId}`;
      if (
        (type === "input" || type === "textarea" || type === "markdown") &&
        sections[sectionId].entries[entryId].defaultValue == "" &&
        emptyValue
      ) {
        // add the value
        data[id] = emptyValue;
      } else data[id] = sections[sectionId].entries[entryId].defaultValue;
    });
  });
  return flat.unflatten(data);
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
    btnsText,
  } = props;
  const [data, setData] = useState<Data>(fromStructureToData(formStructure));
  const dataRef = useRef<Data>(data);
  useEffect(() => {
    setData(fromStructureToData(formStructure));
  }, [formStructure]);
  useEffect(() => {
    dataRef.current = data;
    console.log(dataRef.current);
  });

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
    if (_.isEmpty(data)) return false;
    return Object.keys(formStructure).every((sectionId) =>
      Object.keys(formStructure[sectionId].entries).every((entryId) => {
        if (formStructure[sectionId].entries[entryId].validate) {
          return formStructure[sectionId].entries[entryId].validate(data).ok;
        } else return true;
      })
    );
  };

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
        <Twemoji noWrapper options={{ className: "twemoji" }}>
          <div className="modal-form-content">
            <Dialog.Title as="h3" className="modal-form-title capitalize">
              {title}
            </Dialog.Title>
            {Object.keys(formStructure).map((sectionId) => {
              const section = formStructure[sectionId];
              return (
                <Section
                  key={sectionId}
                  section={section}
                  id={sectionId}
                  data={data}
                  onChange={(newValue, id) => {
                    const newData = flat.unflatten({
                      ...(flat.flatten(dataRef.current) as object),
                      [`${sectionId}.${id}`]: newValue,
                    });
                    setData(newData);
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
                {btnsText?.cancel ?? "Cancel"}
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
              >
                {btnsText?.ok ?? "OK"}
              </button>
            </div>
          </div>
        </Twemoji>
      </div>
    </Modal>
  );
};

export default ModalForm;
