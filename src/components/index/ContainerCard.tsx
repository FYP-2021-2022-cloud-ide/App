import React, { useLayoutEffect, useRef } from "react";
import { ClockIcon, XIcon } from "@heroicons/react/outline";
import Tilt from "react-parallax-tilt";
import { useCleanTilt } from "../TemplateCard";
import { containerAPI } from "../../lib/api/containerAPI";
import { sandboxAPI } from "../../lib/api/sandboxAPI";
import { useCnails } from "../../contexts/cnails";
import myToast from "../CustomToast";
import { errorToToastDescription } from "../../lib/errorHelper";

type Props = {
  courseTitle: string;
  containerName: string;
  existedTime: string;
  containerID: string;
  zIndex?: number;
};

function ContainerCard({
  courseTitle,
  containerName,
  existedTime,
  containerID,
  zIndex,
}: Props) {
  const { removeContainer } = containerAPI;
  const { removeSandbox } = sandboxAPI;
  const { sub, fetchContainers } = useCnails();
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );
  return (
    <Tilt
      onLeave={cleanStyle}
      ref={ref}
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      tiltReverse
    >
      <div
        onClick={() =>
          window.open(
            "https://codespace.ust.dev/user/container/" + containerID + "/"
          )
        }
        className="flex flex-col h-full min-h-[8rem] justify-between
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
          <button
            title="remove workspace"
            onClick={async (e) => {
              e.stopPropagation();
              let success = false;
              if (containerName == "A sandbox") {
                const response = await removeSandbox(containerID, sub);
                if (response.success) {
                  success = true;
                }
              } else {
                const response = await removeContainer(containerID, sub);
                if (response.success) {
                  success = true;
                }
              }

              if (success) {
                myToast.success("Workspace is removed.");
                fetchContainers(sub);
              } else
                myToast.error({
                  title: "Fail to remove workspace",
                  description: errorToToastDescription({
                    error: "sdflsdk",
                    status: "sdfds",
                  }),
                });
            }}
          >
            <XIcon className="w-3 h-3 text-gray-700 dark:text-gray-300 hover:text-blue-500" />
          </button>
        </div>
        <div className="w-full flex flex-row justify-end items-center space-x-1 ">
          <ClockIcon className="h-4 w-4 text-gray-600 dark:text-gray-300 "></ClockIcon>
          <div className="font-medium text-xs text-gray-600 dark:text-gray-300">
            {existedTime.includes("m")
              ? existedTime.split("m")[0] + "m"
              : existedTime.split(".")[0] + "s"}
          </div>
        </div>
      </div>
    </Tilt>
  );
}

export default ContainerCard;
