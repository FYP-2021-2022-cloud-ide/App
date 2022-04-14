import React from "react";
import CardMenu, { MenuItem } from "./CardMenu";
import { Workspace } from "../lib/cnails";
import useCleanTilt from "../hooks/useCleanTilt";
import Tilt from "react-parallax-tilt";
import WorkspaceIndicator from "./WorkspaceIndicator";
import { AcademicCapIcon } from "@heroicons/react/solid";
interface Props {
  workspace: Workspace;
  onClick?: () => void;
  menuItems: (workspace: Workspace) => MenuItem[];
  // onToggleStart?: () => void;
  zIndex?: number;
}

function WorkspaceCard({ workspace, onClick, menuItems, zIndex }: Props) {
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
        onClick={async (e) => {
          if (onClick) onClick();
        }}
        data-active={Boolean(workspace.containerId)}
        title={workspace.name}
        className="workspace-card"
      >
        <div id="content">
          <div className="flex flex-row min-w-0 space-x-2 items-start ">
            <div className="mt-2">
              <WorkspaceIndicator
                color={workspace.containerId ? "green" : "gray"}
              ></WorkspaceIndicator>
            </div>
            <div>
              <p id="name">{workspace.name}</p>
              <p id="description">{workspace.description}</p>
            </div>
          </div>
          <div className="flex flex-row space-x-2">
            {workspace.isExam ? (
              <div className="flex flex-row items-center">
                <AcademicCapIcon className="w-3 h-3 text-gray-400" />
                <span className="text-2xs text-gray-400">Exam</span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <CardMenu items={menuItems(workspace)}></CardMenu>
      </div>
    </Tilt>
  );
}

export default WorkspaceCard;
