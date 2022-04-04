import React, { useLayoutEffect, useRef, useState } from "react";
import { ClockIcon, XIcon } from "@heroicons/react/outline";
import Tilt from "react-parallax-tilt";
import useCleanTilt from "./useCleanTilt";

import { useCnails } from "../contexts/cnails";
import myToast from "./CustomToast";
import { errorToToastDescription } from "../lib/errorHelper";
import { Container } from "../lib/cnails";

import { Error } from "../lib/api/api";
import { templateAPI } from "../lib/api/templateAPI";
import { containerAPI } from "../lib/api/containerAPI";
import { sandboxAPI } from "../lib/api/sandboxAPI";
import moment from "moment";
import useInterval from "./useInterval";
import { CLICK_TO_REPORT } from "../lib/constants";
import { useContainers } from "../contexts/containers";
type Props = Container & { zIndex: number };

/**
 * 
 * @param isoTime a timestamp
 * @returns the time from the timestamp
 */
const getTimeDiff = (isoTime: string) => {
  return moment.duration(moment().diff(moment(isoTime)))
}

const formatDuration = (duration: moment.Duration): string => {
  const second = duration.asSeconds()
  if (second < 60) {
    return `${Math.floor(second)}s`
  } else if (second < 3600) {
    return `${Math.floor(duration.asMinutes())}m`
  } else return `${Math.floor(duration.asHours())}h`
}

function ContainerCard({
  title,
  subTitle,
  startAt,
  containerId,
  type,
  status,
  isTemporary,
  zIndex,
}: Props) {

  const { removeTempContainer } = containerAPI;
  const { removeTemplateContainer } = templateAPI;
  const { removeSandbox } = sandboxAPI;
  const { userId, sub } = useCnails();
  const { fetchContainers } = useContainers()

  const [timeDiff, setTimeDiff] = useState(getTimeDiff(startAt))
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );
  useInterval(() => {
    setTimeDiff(getTimeDiff(startAt))
  }, 30 * 1000)

  if (status != "DEFAULT") {
    return (
      <Tilt
        onLeave={cleanStyle}
        ref={ref}
        tiltMaxAngleX={4}
        tiltMaxAngleY={4}
        tiltReverse
      >
        <div
          className="flex flex-col h-full min-h-[8rem] justify-between
        rounded-xl border-gray-200 dark:border-gray-700 border min-w-max transition-all ease-in-out duration-300 p-4 bg-gray-200 dark:bg-gray-900 select-none"
        >
          <div className="flex flex-row  space-x-4 items-start ">
            {/* the indicator */}
            <div className="mt-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
              </span>
            </div>
            <div className="w-full">
              <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                {subTitle}
              </div>
              <div className="font-medium text-xs text-gray-600 dark:text-gray-300">
                {isTemporary ? "Tempory Container" : title}
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-xs">{
            status == "CREATING" && "being created..." ||
            status == "REMOVING" && "being removed..."
          }</p>

        </div>
      </Tilt>
    )
  }

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
            "https://codespace.ust.dev/user/container/" + containerId + "/"
          )
        }
        className="flex flex-col h-full min-h-[8rem] justify-between
        rounded-xl border-gray-200 dark:border-gray-700 border min-w-max transition-all ease-in-out duration-300 p-4 bg-white dark:bg-gray-600 select-none"
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
              {title == "" ? "UNKNOWN" : title}
            </div>
            <div className="font-medium text-xs text-gray-600 dark:text-gray-300">
              {isTemporary ? "Temporary Workspace" : subTitle}
            </div>
          </div>
          <button
            title="remove workspace"
            onClick={async (e) => {
              e.stopPropagation();

              const response = isTemporary ? await removeTempContainer({
                containerId, sub: sub
              }) : type == "SANDBOX" ? await removeSandbox({
                containerId, userId: userId
              }) : await removeTemplateContainer({
                containerId,
                sub: sub
              })

              if (response.success) {
                myToast.success("Workspace is removed.");
                fetchContainers();
              } else
                myToast.error({
                  title: "Fail to remove workspace",
                  description: errorToToastDescription(response.error),
                  comment: CLICK_TO_REPORT
                });
            }}
          >
            <XIcon className="w-3 h-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
          </button>
        </div>
        <div className="w-full flex flex-row justify-end items-center space-x-1 ">
          <ClockIcon className="h-4 w-4 text-gray-600 dark:text-gray-300 "></ClockIcon>
          <div className="font-medium text-xs text-gray-600 dark:text-gray-300">
            {formatDuration(timeDiff)}
          </div>
        </div>
      </div>
    </Tilt >
  );
}

export default ContainerCard;
