import React, { useCallback, useRef, useState } from "react";
import CoursesList from "../components/CoursesList";
import ContainersList from "../components/ContainersList";
import { Tab } from "@headlessui/react";
import { SandboxProvider } from "../contexts/sandbox";
import SandboxImageList from "../components/SandboxImageList";
import { useCourses, SortOrder } from "../contexts/courses";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const { sortOrder, setSortOrder } = useCourses();
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const tabListRef = useRef<HTMLDivElement>();

  const onTabChange: (index: number) => void = useCallback(
    (index) => {
      setSelectedIndex(index);
      // if (index == 0)
      //   tabListRef.current.setAttribute("data-selected-tab", "courses");
      //   if(index == 1)
      //   tabListRef.current.setAttribute("data-selected-tab" , )
    },
    [setSelectedIndex]
  );

  const onSortOrderChange: React.ChangeEventHandler<HTMLSelectElement> =
    useCallback(
      (e) => {
        setSortOrder(e.target.value as SortOrder);
      },
      [setSortOrder]
    );
  return (
    <div className="flex flex-col mx-6 space-y-4 mb-10">
      <ContainersList></ContainersList>
      <Tab.Group selectedIndex={selectedIndex} onChange={onTabChange}>
        <div id="course-list-tab" data-selected-tab={selectedIndex}>
          <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl w-full max-w-[24rem] select-none">
            <Tab data-selected={selectedIndex == 0}>Courses</Tab>
            <Tab data-selected={selectedIndex == 1}>Personal Workspaces</Tab>
          </Tab.List>
          <div id="sort-order">
            <p className="capitalize">sort order: </p>
            <select
              value={sortOrder}
              onChange={onSortOrderChange}
              className="bg-transparent border border-gray-400"
            >
              <option value="title" className="capitalize">
                Course Code
              </option>
              <option value="time" className="capitalize">
                Last Updated
              </option>
            </select>
          </div>
        </div>
        <Tab.Panels>
          <Tab.Panel>
            <CoursesList></CoursesList>
          </Tab.Panel>
          <Tab.Panel>
            <SandboxProvider>
              <SandboxImageList />
            </SandboxProvider>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
