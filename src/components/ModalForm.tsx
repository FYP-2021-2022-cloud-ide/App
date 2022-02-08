import { Dialog } from "@headlessui/react";
import { ssrEntries } from "next/dist/build/webpack/plugins/middleware-plugin";
import React, {
  createRef,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react";
import ListBox, { Option } from "./course/instructor/ListBox";
import Modal, { ModalProps } from "./Modal";
import Toggle from "./Toggle";
import { InformationCircleIcon } from "@heroicons/react/solid";
import assert from "assert";

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
  const inputRefs: { [id: string]: React.MutableRefObject<HTMLInputElement> } =
    {};
  // const inputRef = React;
  Object.keys(formStructure).forEach((sectionTitle) => {
    const section = formStructure[sectionTitle];
    if (!React.isValidElement(section.entries))
      Object.keys(section.entries).forEach((id) => {
        if (data[id] == undefined) {
          throw new Error(
            `form data does not match form structure : ${id} not found in data`
          );
        }
        if (section.entries[id].type == "input") {
          Object.assign(inputRefs, {
            [id]: useRef<HTMLInputElement>(),
          });
        }
      });
  });

  const Entry = React.memo(
    ({ entry, id }: { entry: Entry; id: string }) => {
      if (entry.conditional) {
        if (!entry.conditional(data)) return <></>;
      }
      if (entry.type == "input") {
        return (
          <div className="">
            <p className="modal-form-text-base">{entry.text}</p>
            <input
              ref={inputRefs[id]}
              className="modal-form-input"
              placeholder={entry.placeholder}
              value={inputRefs[id].current.value}
              onChange={(e) => {
                const newData = Object.assign(Object.assign({}, data), {
                  [id]: e.target.value,
                });
                setData(newData);
                if (onChange) {
                  onChange(newData, id);
                }
              }}
            ></input>
          </div>
        );
      } else if (entry.type == "textarea") {
        return (
          <div>
            <p></p>
          </div>
        );
      } else if (entry.type == "listbox") {
        return (
          <div className="modal-form-list-box">
            <p className="modal-form-text-base">{entry.text}</p>
            <ListBox
              initSelected={data[id] as Option}
              onChange={(e) => {
                const newData = Object.assign(Object.assign({}, data), {
                  [id]: e,
                });
                setData(newData);
                if (onChange) {
                  onChange(newData, id);
                }
              }}
              environments={entry.options}
            />
          </div>
        );
      } else if (entry.type == "toggle") {
        return (
          <div className="modal-form-toggle">
            <p className="modal-form-text-base">{entry.text}</p>
            {entry.tooltip && (
              <div className="tooltip tooltip-bottom" data-tip={entry.tooltip}>
                <InformationCircleIcon className="tooltip-icon" />
              </div>
            )}
            <Toggle
              text={entry.text}
              onChange={(newValue) => {
                const newData = Object.assign(Object.assign({}, data), {
                  [id]: newValue,
                });
                setData(newData);
                if (onChange) {
                  onChange(newData, id);
                }
              }}
              enabled={data[id] as boolean}
            ></Toggle>
          </div>
        );
      } else throw new Error("not such entry type in <ModalForm>");
    },
    (prevProps, nextProps) => {
      const same =
        prevProps.entry.conditional(data) == nextProps.entry.conditional(data);
      if (!same) console.log(prevProps.id, "is rerender");
      return same;
    }
  );

  const Section = React.memo(
    ({ section, title }: { section: Section; title: string }) => {
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
                  <Entry key={id} entry={section.entries[id]} id={id}></Entry>
                ))}
          </>
        );
    },
    (prevProps, nextProps) => {
      const same =
        prevProps.section.conditional(data) ==
        nextProps.section.conditional(data);
      if (!same) console.log(prevProps.title, "is rerender");
      return same;
    }
  );

  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      onClose={onClose}
      onOpen={onOpen}
      clickOutsideToClose={clickOutsideToClose}
    >
      <div ref={ref} className="course-dialog-modal ">
        <div className="course-dialog-content">
          <Dialog.Title as="h3" className="course-dialog-title">
            {title}
          </Dialog.Title>
          {Object.keys(formStructure).map((sectionTitle) => {
            const section = formStructure[sectionTitle];
            return (
              <Section
                key={sectionTitle}
                section={section}
                title={sectionTitle}
              ></Section>
            );
          })}
          <div className="flex flex-row justify-end space-x-2">
            <button className="modal-form-btn-cancel" onClick={() => {}}>
              Cancel
            </button>
            <button
              className="modal-form-btn-ok"
              onClick={() => {
                if (onEnter) {
                  onEnter(data);
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

export default React.memo(ModalForm, (prevProps, nextProps) => {
  return false;
});
