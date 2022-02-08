import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import React from "react";

export interface ListBoxProps {
  environments: Option[];
  initSelected: Option;
  onChange?: (newValve: Option) => void;
}

export interface Option {
  value: string;
  id: string;
}

function ListBox({ environments, initSelected, onChange }: ListBoxProps) {
  const [selected, setSelected] = useState(initSelected);

  return (
    <div className="w-full top-16">
      <Listbox
        value={selected}
        onChange={(newValue) => {
          if (onChange) {
            onChange(newValue);
            setSelected(newValue);
          }
        }}
      >
        <div className="relative mt-1 z-50">
          <Listbox.Button className="relative border dark:border-0 w-full py-2 pl-3 pr-10 text-left bg-white dark:bg-gray-700 dark:text-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{selected.value}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="mb-10  absolute overflow-visible z-50 w-full py-1 mt-1  text-base bg-white dark:bg-gray-700 dark:text-gray-400 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {environments.map((environment, environmentIndex) => (
                <Listbox.Option
                  key={environmentIndex}
                  className={({ active }) =>
                    `${
                      active
                        ? "text-gray-800 bg-gray-300 "
                        : "text-gray-900 dark:text-white "
                    }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={environment}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {environment.value}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active
                              ? "text-amber-600 dark:text-white"
                              : "text-amber-600 dark:text-white"
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

// export default React.memo(ListBox, () => true);
export default ListBox;
