import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import React from "react";

export interface ListBoxProps {
  options: Option[];
  selected: Option;
  onChange?: (newValve: Option) => void;
}

export interface Option {
  value: string;
  id: string;
  imageId: string;
}

/**
 * a stateless listbox using headless ui
 */
function ListBox({ options, selected, onChange }: ListBoxProps) {
  return (
    <div className="w-full top-16">
      <Listbox value={selected} onChange={onChange}>
        <div className="relative mt-1 ">
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
            <Listbox.Options className="listbox-options">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `${
                      active
                        ? "text-gray-800 bg-gray-300 "
                        : "text-gray-900 dark:text-white "
                    }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {option.value}
                      </span>
                      {selected ? (
                        <span
                          className={` absolute inset-y-0 left-0 flex items-center pl-3`}
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

export default ListBox;
