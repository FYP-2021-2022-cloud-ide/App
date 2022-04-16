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
  EntryProps,
  FormStructure,
  Props,
  Section,
  SectionProps,
  ValidationOutput,
} from "./types";
import { ChevronRightIcon } from "@heroicons/react/solid";

function Entry<T>(props: EntryProps<T>) {
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
}

function Section<T>({
  section,
  id: sectionId,
  data,
  onChange,
  useDisclosure,
}: SectionProps<T>) {
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
}

/**
 * this function will convert the form structure to the initial data of the form.
 * @param sections
 * @returns
 */
function fromStructureToData<T>(sections: FormStructure<T>): T {
  let data = {} as T;
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
}

/**
 * A component to show a form in modal. Use this component to keep consistency in the app.
 * To use this, put the `<ModalForm>` in a component and supply a form structure.
 *
 * a good practice that you define a type of the formData as well. As `ModalForm` is generic,
 * by providing a type of form data to form structure, you can typing for `data` return as parameter when
 * props like `onChange` and `onEnter`.
 *
 * @remark `ModalForm` is a over-complex higher order component. It could be simplified by using context.
 * Although this component is perfectly workable, it is foreseed that this component will soon be deprecated.
 * @remark this component suppose to be use to aid the creation of a form. Although it is possible to create
 * your custom entry, it is suggested not to do so unless really necessary because it defeats the purpose of
 * the modal form. The entry type are supported because they are used frequently and common in many general forms.
 */
function ModalForm<T>(props: Props<T>) {
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
  const [data, setData] = useState<T>(fromStructureToData(formStructure));
  const dataRef = useRef<T>(data);
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
      <div
        className={`modal-form ${sizeMap[size]} hide-scroll overflow-y-scroll overflow-x-visible `}
      >
        <Twemoji noWrapper options={{ className: "twemoji" }}>
          <div id="content">
            <Dialog.Title as="h3">{title}</Dialog.Title>
            {Object.keys(formStructure).map((sectionId) => {
              const section = formStructure[sectionId];
              return (
                <Section
                  key={sectionId}
                  section={section}
                  id={sectionId}
                  data={data}
                  useDisclosure={useDisclosure}
                  onChange={(newValue: any, id: string) => {
                    const newData = flat.unflatten({
                      ...(flat.flatten(dataRef.current) as object),
                      [`${sectionId}.${id}`]: newValue,
                    }) as T;
                    setData(newData);
                    if (onChange) onChange(newData, id);
                  }}
                ></Section>
              );
            })}
            <div id="btn-group">
              <button
                id="btn-cancel"
                onClick={() => {
                  setOpen(false);
                  patchedOnClose();
                }}
              >
                {cancelBtnText ?? "Cancel"}
              </button>
              <button
                id="btn-ok"
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
}

export default ModalForm;
