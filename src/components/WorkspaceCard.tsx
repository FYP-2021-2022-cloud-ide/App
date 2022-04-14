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

const LoadingWorkspaceCard = (props: Props) => {
  const { workspace, onClick, menuItems, zIndex } = props;
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );

  const comment =
    (workspace.status == "STARTING_WORKSPACE" && "starting workspace...") ||
    (workspace.status == "STOPPING_WORKSPACE" && "stopping workspace...");
  return (
    <Tilt
      onLeave={cleanStyle}
      ref={ref}
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      tiltReverse
    >
      <div
        className="workspace-card"
        data-active={Boolean(workspace.containerId)}
        onClick={() => {
          if (workspace.containerId) {
            window.open(
              "https://codespace.ust.dev/user/container/" +
                workspace.containerId +
                "/"
            );
          }
        }}
      >
        <div className="mt-2 mr-2 ">
          <WorkspaceIndicator color="yellow"></WorkspaceIndicator>
        </div>
        <div id="content">
          <div>
            <p id="name">{workspace.name}</p>
            {/* the pulsing animation */}
            <div className="animate-pulse flex space-x-4 mt-3">
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
          <p className="text-xs  text-gray-400">{comment}</p>
        </div>
      </div>
    </Tilt>
  );
};

function WorkspaceCard(props: Props) {
  const { workspace, onClick, menuItems, zIndex } = props;
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );

  if (workspace.status != "DEFAULT")
    return <LoadingWorkspaceCard {...props}></LoadingWorkspaceCard>;

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
