import { Dialog, Disclosure, Transition } from "@headlessui/react";
import React from "react";

import Modal from "../Modal";
import _ from "lodash";
import Twemoji from "react-twemoji";
import Input from "./entry/Input";
import TextArea from "./entry/TextArea";
import ListBox from "./entry/ListBox";
import Toggle from "./entry/Toggle";
import MDE from "./entry/MDE";
import DatePicker from "./entry/DatePicker";
import { EntryProps, Props, SectionProps } from "./types";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { ModalFormProvider, useModalForm } from "./modalFormContext";
import { canProceed } from "./modalFormHelper";

function Entry<T>(props: EntryProps) {
  const { sectionId, id } = props;
  const { data, formStructure } = useModalForm<T>();
  const entry = formStructure[sectionId].entries[id];

  // conditionally hide this entry
  if (entry.conditional && !entry.conditional(data)) return <></>;

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
  } else if (entry.type == "datetime") {
    return <DatePicker {...props}></DatePicker>;
  } else throw new Error("not such entry type in <ModalForm>");
}

function Section<T>({ id: sectionId }: SectionProps) {
  const { data, useDisclosure, formStructure } = useModalForm<T>();
  const section = formStructure[sectionId];

  // conditionally hide this section
  if (section.conditional && !section.conditional(data)) return <></>;

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
              <div className="flex flex-col space-y-3 px-5 mt-3" id={sectionId}>
                {React.isValidElement(section.entries)
                  ? section.entries
                  : Object.keys(section.entries).map((id, index) => {
                      return (
                        <Entry key={id} id={id} sectionId={sectionId}></Entry>
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
            return <Entry key={id} id={id} sectionId={sectionId}></Entry>;
          })}
    </div>
  );
}

/**
 * A component to show a form in modal. Use this component to keep consistency in the app.
 * To use this, put the `<ModalForm>` in a component and supply a form structure.
 *
 * a good practice that you define a type of the formData as well. As `ModalForm` is generic,
 * by providing a type of form data to form structure, you can typing for `data` return as parameter when
 * props like `onChange` and `onEnter`.
 */
function Wrapped<T>() {
  // const [data, setData] = useState<T>(fromStructureToData(formStructure));
  const {
    data,
    formStructure,
    isOpen,
    onClose,
    setOpen,
    onOpen,
    clickOutsideToClose = true,
    escToClose = true,
    okBtnText,
    cancelBtnText,
    size = "sm",
    title,
    close,
  } = useModalForm<T>();
  const sizeMap = {
    sm: "w-[550px]",
    md: "w-[850px]",
    lg: "w-[1100px]",
  };

  if (!formStructure) return <></>;

  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      onClose={() => {
        if (onClose) onClose(data);
      }}
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
            {Object.keys(formStructure).map((sectionId) => (
              <Section key={sectionId} id={sectionId}></Section>
            ))}
            <div id="btn-group">
              <button
                id="btn-cancel"
                onClick={() => {
                  close(false);
                }}
              >
                {cancelBtnText ?? "Cancel"}
              </button>
              <button
                id="btn-ok"
                disabled={!canProceed(formStructure, data)}
                onClick={() => {
                  close(true);
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

function ModalForm<T>(props: Props<T>) {
  return (
    <ModalFormProvider props={props}>
      <Wrapped></Wrapped>
    </ModalFormProvider>
  );
}

export default ModalForm;
