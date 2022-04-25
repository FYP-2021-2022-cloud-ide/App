import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React, { memo, useCallback, useState } from "react";
import { useMessaging } from "../../contexts/messaging";
import { getCourses } from "../../lib/messageHelper";
import { useMessageTable } from "./MessageTable";

const Arrow = memo(
  ({
    expand,
    setExpand,
  }: {
    expand: boolean;
    setExpand: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const Icon = expand ? ChevronUpIcon : ChevronDownIcon;
    const onClick = useCallback(() => {
      setExpand(!expand);
    }, [expand, setExpand]);
    return (
      <button onClick={onClick} title={expand ? "collapse" : "expand"}>
        <Icon className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2  bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 border border-[#D5D6D8] dark:border-[#2F3947]   rounded-full w-5 h-5 cursor-pointer"></Icon>
      </button>
    );
  },
  (p, n) => {
    return p.expand == n.expand;
  }
);

const Facet = () => {
  const [expand, setExpand] = useState<boolean>(true);
  const { setOnlyUnread, onlyUnread, onlyCourses, setOnlyCourses } =
    useMessageTable();
  const { messages } = useMessaging();
  return (
    <div className="relative min-w-[12rem] h-min  flex flex-col space-y-2 p-3 border rounded-md text-xs bg-gray-100 dark:bg-black/50   border-[#D5D6D8] dark:border-[#2F3947] ">
      <p className="text-lg font-bold">Facet</p>
      {expand && (
        <label htmlFor="only not read" className="whitespace-nowrap">
          <span>
            <input
              type="checkbox"
              onChange={(e) => {
                setOnlyUnread(e.target.checked);
              }}
              checked={onlyUnread}
            />
          </span>
          <span className="whitespace-nowrap ml-2">Unread</span>
        </label>
      )}
      {expand && (
        <div className="flex flex-col w-max">
          <p className="text-base font-semibold">Filter Course</p>
          {getCourses(messages).map((course) => {
            return (
              <label
                htmlFor="only not read"
                className="whitespace-nowrap"
                key={course.id}
              >
                <span>
                  <input
                    type="checkbox"
                    checked={onlyCourses.some(
                      (c) => JSON.parse(c).id == course.id
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setOnlyCourses([
                          ...onlyCourses,
                          JSON.stringify(course),
                        ]);
                      } else {
                        setOnlyCourses([
                          ...onlyCourses.filter(
                            (c) => JSON.parse(c).id != course.id
                          ),
                        ]);
                      }
                    }}
                  />
                </span>
                <span className="whitespace-nowrap ml-2">
                  {course.fullCode}
                </span>
              </label>
            );
          })}
        </div>
      )}
      <Arrow expand={expand} setExpand={setExpand}></Arrow>
    </div>
  );
};

export default Facet;
