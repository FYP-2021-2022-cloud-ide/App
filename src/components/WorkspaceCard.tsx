import React, { useCallback } from "react";
import CardMenu, { MenuItem } from "./CardMenu";
import { Workspace } from "../lib/cnails";
import useCleanTilt from "../hooks/useCleanTilt";
import Tilt from "react-parallax-tilt";
import WorkspaceIndicator from "./WorkspaceIndicator";
import { AcademicCapIcon } from "@heroicons/react/solid";
import useStudentWorkspaceCard from "../hooks/useStudentWorkspaceCard";
interface Props {
  workspace: Workspace;
  zIndex?: number;
}

function WorkspaceCard({ workspace, zIndex }: Props) {
  const { menuItems, onClick, comment, container, color } =
    useStudentWorkspaceCard(workspace);
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
        data-status={workspace.status}
        data-container={Boolean(container && container.status == "DEFAULT")}
        title={workspace.name}
        className="workspace-card"
      >
        <div className="flex flex-row w-full space-x-2 items-start justify-between">
          <div className="flex flex-row w-full">
            <div className="mt-2 mr-2">
              <WorkspaceIndicator color={color}></WorkspaceIndicator>
            </div>
            <div className="w-full ">
              <p id="name">{workspace.name}</p>
              <p id="description">{workspace.description}</p>
              <div
                id="loading-pulse"
                className="animate-pulse flex space-x-4 mt-3"
              >
                <div className="flex-1 space-y-6 py-1">
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-400 dark:bg-slate-800 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-400 dark:bg-slate-800 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-400 dark:bg-slate-800 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CardMenu items={menuItems}></CardMenu>
        </div>
        <div>
          <p id="status" className="text-xs text-gray-400">
            {comment}
          </p>
          <div id="attributes" className="flex flex-row space-x-2">
            {workspace.isExam && (
              <div className="flex flex-row items-center">
                <AcademicCapIcon className="w-3 h-3 text-gray-400" />
                <span className="text-2xs text-gray-400">Exam</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Tilt>
  );
}

export default WorkspaceCard;
