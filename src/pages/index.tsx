import React from "react";
import CoursesList from "../components/CoursesList";
import ContainersList from "../components/ContainersList";
import { SandboxWrapper } from "../components/SandboxWrapper";
import { Tab } from "@headlessui/react";
import { SandboxProvider } from "../contexts/sandbox"

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  // load once when page is rendered
  return (
    <div className="flex flex-col mx-6 space-y-4 mb-10">
      <ContainersList></ContainersList>
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl w-full max-w-[24rem]">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 dark:text-gray-300 rounded-lg",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 dark:ring-offset-slate-800 ring-white dark:ring-slate-700 ring-opacity-60",
                selected
                  ? "bg-white dark:bg-slate-900 shadow"
                  : "text-blue-100 hover:bg-white/[0.12] dark:hover:bg-white/[0.05] hover:text-white"
              )
            }
          >
            Courses
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full py-2.5 text-sm leading-5 font-medium dark:text-gray-300 rounded-lg",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 dark:ring-offset-slate-800 ring-white dark:ring-slate-700 ring-opacity-60",
                selected
                  ? "bg-white text-blue-700 dark:bg-slate-900 shadow"
                  : "text-white hover:bg-white/[0.12] dark:hover:bg-white/[0.05] hover:text-white"
              )
            }
          >
            Personal Workspaces
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <CoursesList></CoursesList>
          </Tab.Panel>
          <Tab.Panel>
            <SandboxProvider>
              <SandboxWrapper />
            </SandboxProvider>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
