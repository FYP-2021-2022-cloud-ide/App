import React, { useState } from "react";
import { ClockIcon, XIcon } from "@heroicons/react/outline";
import Tilt from "react-parallax-tilt";
import useCleanTilt from "../hooks/useCleanTilt";

import { Container } from "../lib/cnails";
import moment from "moment";
import useInterval from "../hooks/useInterval";
import { useContainers } from "../contexts/containers";
import WorkspaceIndicator from "./WorkspaceIndicator";
type Props = Container & { zIndex: number };

/**
 *
 * @param isoTime a timestamp
 * @returns the time from the timestamp
 */
const getTimeDiff = (isoTime: string) => {
  return moment.duration(moment().diff(moment(isoTime)));
};

const formatDuration = (duration: moment.Duration): string => {
  const second = duration.asSeconds();
  if (second < 60) {
    return `${Math.floor(second)}s`;
  } else if (second < 3600) {
    return `${Math.floor(duration.asMinutes())}m`;
  } else return `${Math.floor(duration.asHours())}h`;
};

const LoadingContainerCard = (props: Props) => {
  const { status, isTemporary, zIndex, redisPatch } = props;
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
      <div className="container-card">
        <div className="flex flex-row  space-x-4 items-start ">
          {/* the indicator */}
          <div className="mt-2">
            <WorkspaceIndicator color="yellow"></WorkspaceIndicator>
          </div>
          <div className="w-full">
            <div id="title">{redisPatch.title}</div>
            {isTemporary && (
              <>
                <p id="temporary">Temporary Workspace</p>
                <p id="temporary">({redisPatch.cause})</p>
              </>
            )}
          </div>
        </div>
        <p className="text-gray-500 text-xs">
          {(status == "CREATING" && "being created...") ||
            (status == "REMOVING" && "being removed...")}
        </p>
      </div>
    </Tilt>
  );
};

function ContainerCard(props: Props) {
  const {
    startAt,
    id: containerId,
    status,
    isTemporary,
    zIndex,
    redisPatch,
  } = props;
  const { removeContainer } = useContainers();

  // if the container temporary, API doesn't return the start time,
  // so we use the request time, although it is technically wrong
  const [timeDiff, setTimeDiff] = useState(
    getTimeDiff(isTemporary ? redisPatch.requestAt : startAt)
  );
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );
  useInterval(() => {
    setTimeDiff(getTimeDiff(isTemporary ? redisPatch.requestAt : startAt));
  }, 30 * 1000);

  if (status != "DEFAULT") {
    return <LoadingContainerCard {...props}></LoadingContainerCard>;
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
        className="container-card"
        data-ready
        title={redisPatch.title}
      >
        <div className="flex flex-row  space-x-4 items-start ">
          {/* the indicator */}
          <div className="mt-2">
            <WorkspaceIndicator color="green"></WorkspaceIndicator>
          </div>
          <div className="w-full">
            <p id="title">{redisPatch.title}</p>
            {isTemporary && (
              <>
                <p id="temporary">Temporary Workspace</p>
                <p id="temporary">({redisPatch.cause})</p>
              </>
            )}
          </div>
          <button
            title="remove workspace"
            onClick={async (e) => {
              e.stopPropagation();
              removeContainer(containerId);
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
    </Tilt>
  );
}

export default ContainerCard;
