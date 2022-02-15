import React, { useLayoutEffect, useRef } from "react";
import { LogoutIcon, ClockIcon } from "@heroicons/react/outline";
import Tilt from "react-parallax-tilt";

type Props = {
  courseTitle: string;
  containerName: string;
  existedTime: string;
  containerID: string;
};

function ContainerCard({
  courseTitle,
  containerName,
  existedTime,
  containerID,
}: Props) {
  const ref = useRef<Tilt>();
  const cleanStyle = () =>
    setTimeout(() => {
      if (ref.current) {
        //@ts-ignore
        let node = ref.current.wrapperEl.node as HTMLDivElement;
        if (node.getAttribute("style") != "") {
          node.setAttribute("style", "");
          cleanStyle();
        }
      }
    }, 10);
  useLayoutEffect(() => {
    cleanStyle();
  });
  return (
    <Tilt
      onLeave={cleanStyle}
      ref={ref}
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      tiltReverse
    >
      <a
        target="_blank"
        rel="noreferrer"
        href={"https://codespace.ust.dev/user/container/" + containerID + "/"}
        className="flex flex-col h-full justify-between
        rounded-xl border-gray-200 dark:border-gray-700 border min-w-max transition-all ease-in-out duration-300 p-4 bg-white dark:bg-gray-600"
      >
        <div className="flex flex-row  space-x-4 items-start ">
          {/* the indicator */}
          <div className="mt-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
            </span>
          </div>
          <div className="w-full">
            <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">
              {containerName}
            </div>
            <div className="font-medium text-xs text-gray-600 dark:text-gray-300">
              {courseTitle}
            </div>
          </div>
          <button onClick={(e) => e.stopPropagation()}></button>
        </div>
        <div className="w-full flex flex-row justify-end items-center space-x-1 ">
          <ClockIcon className="h-4 w-4 text-gray-600 dark:text-gray-300 "></ClockIcon>
          <div className="font-medium text-xs text-gray-600 dark:text-gray-300">
            {existedTime.includes("m")
              ? existedTime.split("m")[0] + "m"
              : existedTime.split(".")[0] + "s"}
          </div>
        </div>
      </a>
    </Tilt>
  );
}

export default ContainerCard;
