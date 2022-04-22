import React from "react";
import { ClockIcon, XIcon } from "@heroicons/react/outline";
import Tilt from "react-parallax-tilt";
import useCleanTilt from "../hooks/useCleanTilt";

import { Container } from "../lib/cnails";
import WorkspaceIndicator from "./WorkspaceIndicator";
import useContainerCard from "../hooks/useContainerCard";
type Props = { zIndex: number; container: Container };

function ContainerCard({ zIndex, container }: Props) {
  const { isTemporary, status, redisPatch } = container;
  const { onClick, onRemove, duration, comment } = useContainerCard(container);

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
        onClick={onClick}
        className="container-card"
        data-status={status}
        title={redisPatch.title}
      >
        <div className="flex flex-row items-start ">
          {/* the indicator */}
          <div className="mt-2 mr-2">
            <WorkspaceIndicator
              color={status == "DEFAULT" ? "green" : "yellow"}
            ></WorkspaceIndicator>
          </div>
          <div className="w-full">
            <p id="title">{redisPatch.title}</p>
            {/* the course code  */}
            {redisPatch.sectionUserInfo ? (
              <p
                id="course"
                data-section-role={redisPatch.sectionUserInfo.role}
              >
                {redisPatch.sectionUserInfo.courseCode} (
                {redisPatch.sectionUserInfo.sectionCode})
              </p>
            ) : (
              <p data-personal-workspace>Personal</p>
            )}

            {/*  whether the workspace is temporary  */}
            {isTemporary && (
              <>
                <p id="temporary">Temporary Workspace</p>
                <p id="temporary">({redisPatch.cause})</p>
              </>
            )}
          </div>
          {status == "DEFAULT" && (
            <button id="remove-btn" title="remove workspace" onClick={onRemove}>
              <XIcon className="w-3 h-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
            </button>
          )}
        </div>
        <div className="w-full flex flex-row-reverse justify-between ">
          <div className="flex flex-row items-center space-x-1" id="duration">
            <ClockIcon className="h-4 w-4 text-gray-600 dark:text-gray-300 "></ClockIcon>
            <div
              id="duration-text"
              className="font-medium text-xs text-gray-600 dark:text-gray-300"
            >
              {duration}
            </div>
          </div>
          <p id="status">{comment}</p>
        </div>
      </div>
    </Tilt>
  );
}

export default ContainerCard;
