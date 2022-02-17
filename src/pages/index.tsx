import React from "react";
import CoursesList from "../components/index/CoursesList";
import ContainersList from "../components/index/ContainersList";
import { SandboxWrapper } from "../components/SandboxWrapper";
import { Tab } from "@headlessui/react";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  // load once when page is rendered
  return (
    <div className="flex flex-col mx-6 space-y-4">
      <ContainersList></ContainersList>
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl w-96">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 dark:text-gray-300 rounded-lg",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 dark:ring-offset-slate-800 ring-white dark:ring-slate-700 ring-opacity-60",
                selected
                  ? "bg-white dark:bg-slate-900 shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Courses
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 dark:text-gray-300 rounded-lg",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 dark:ring-offset-slate-800 ring-white dark:ring-slate-700 ring-opacity-60",
                selected
                  ? "bg-white dark:bg-slate-900 shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
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
            <SandboxWrapper />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
