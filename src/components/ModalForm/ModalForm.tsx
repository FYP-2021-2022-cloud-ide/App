import { Dialog, Disclosure, Transition } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";

import Modal from "../Modal";
import flat from "flat";
import _ from "lodash";
import Twemoji from "react-twemoji";
import Input from "./entry/Input";
import TextArea from "./entry/TextArea";
import ListBox from "./entry/ListBox";
import Toggle from "./entry/Toggle";
import MDE from "./entry/MDE";
import Custom from "./entry/Custom";
import DatePicker from "./entry/DatePicker";
import {
  Data,
  EntryProps,
  FormStructure,
  Props,
  Section,
  SectionProps,
} from "./types";
import { ChevronRightIcon } from "@heroicons/react/solid";

const Entry = (props: EntryProps) => {
  const { entry, data } = props;
  if (entry.conditional) {
    if (!entry.conditional(data)) return <></>;
  }
  if (entry.type == "input") {
    return <Input {...props}></Input>;
  } else if (entry.type == "textarea") {
    return <TextArea {...props}></TextArea>;
  } else if (entry.type == "listbox") {
    return <ListBox {...props}></ListBox>;
  } else if (entry.type == "toggle") {
    return <Toggle {...props}></Toggle>;
  } else if (entry.type == "markdown") {
    return <MDE {...props}></MDE>;
  } else if (entry.type == "custom") {
    return <Custom {...props}></Custom>;
  } else if (entry.type == "datetime") {
    return <DatePicker {...props}></DatePicker>;
  } else throw new Error("not such entry type in <ModalForm>");
};

const Section = ({
  section,
  id: sectionId,
  data,
  onChange,
  useDisclosure,
}: SectionProps) => {
  if (section.conditional) {
    if (!section.conditional(data)) return <></>;
  } else
    return useDisclosure ? (
      <Disclosure as="div" className={`modal-form-section-${sectionId} w-full`}>
        {({ open }) => (
          <>
            <Disclosure.Button className={` bg-blue-500 rounded-md w-full`}>
              <div className=" rounded flex flex-row justify-between p-2 items-center hover:bg-white/10 text-white transition ease-in-out ">
                <span className="font-bold">{section.title ?? sectionId}</span>
                <ChevronRightIcon
                  className={`w-5 h-5 ${open ? "transform rotate-90" : ""}`}
                />
              </div>
            </Disclosure.Button>
            <Transition
              enter="transition duration-200 ease-out"
              enterFrom="transform opacity-0"
              enterTo="transform  opacity-100"
              leave="transition duration-200 ease-out"
              leaveFrom="transform opacity-100"
              leaveTo="transform  opacity-0"
            >
              <Disclosure.Panel>
                <div
                  className="flex flex-col space-y-3 px-5 mt-3"
                  id={sectionId}
                >
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
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    ) : (
      <div className="flex flex-col space-y-3" id={sectionId}>
        {/* if disclosure is not use, title will be shown here */}
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
 * 
 * a good practice that you define a type of the formData as well. 
 * 
 * @remark `ModalForm` is a over-complex higher order component. It could be simplified by using context. 
 * Although this component is perfectly workable, a rework could be done to make it more user friendly and less buggy.
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
    okBtnText,
    cancelBtnText,
    useDisclosure,
  } = props;
  const [data, setData] = useState<Data>(fromStructureToData(formStructure));
  const dataRef = useRef<Data>(data);
  useEffect(() => {
    setData(fromStructureToData(formStructure));
  }, [formStructure]);
  useEffect(() => {
    dataRef.current = data;
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
                  useDisclosure={useDisclosure}
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
                {cancelBtnText ?? "Cancel"}
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
                {okBtnText ?? "OK"}
              </button>
            </div>
          </div>
        </Twemoji>
      </div>
    </Modal>
  );
};

export default ModalForm;
