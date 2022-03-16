import React from "react";
import CardMenu, { MenuItem } from "./CardMenu";
import { Template, Workspace } from "../lib/cnails";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Toggle from "./Toggle";
import { useCleanTilt } from "./TemplateCard";
import Tilt from "react-parallax-tilt";
interface Props {
  workspace: Workspace;
  onClick?: () => void;
  onToggleStart?: () => void;
  zIndex?: number;
}

function WorkspaceCard({ workspace, onClick, onToggleStart, zIndex }: Props) {
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );
  var menuItems: MenuItem[] = [
    {
      text: workspace.containerID ? "Stop" : "Start",
      onClick: () => {
        if (onToggleStart) onToggleStart();
      },
    },
  ];

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
        className="env-card"
      >
        <div className="flex flex-row min-w-0 space-x-2">
          <span className="relative flex h-2 w-3">
            {workspace.containerID && (
              <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            )}
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                workspace.containerID ? "bg-green-400" : "bg-gray-400"
              }`}
            ></span>
          </span>
          <div className="env-card-content justify-between w-full">
            <div>
              <div className="env-card-name mt-2">{workspace.name}</div>
              <div className=" text-xs text-gray-600 dark:text-gray-300 line-clamp-3">
                {workspace.description}
              </div>
            </div>
            <div>
              {
                // show a badge if student haven't started this workspace before.
              }
            </div>
          </div>
        </div>
        <CardMenu items={menuItems}></CardMenu>
      </div>
    </Tilt>
  );
}

export default WorkspaceCard;
