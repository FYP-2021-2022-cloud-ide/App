import React, { useEffect, useRef } from "react";
import CardMenu, { MenuItem } from "./CardMenu";
import Tilt from "react-parallax-tilt";

import { SandboxImage } from "../lib/cnails";
import useCleanTilt from "../hooks/useCleanTilt";
import WorkspaceIndicator from "./WorkspaceIndicator";

type Props = {
  sandboxImage: SandboxImage;
  onClick?: (sandboxImage: SandboxImage) => void;
  menuItems: (sandboxImage: SandboxImage) => MenuItem[];
  zIndex?: number;
  id: string;
};

const LoadingSandboxImageCard = (props: Props) => {
  const { sandboxImage, onClick, menuItems, zIndex, id } = props;
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );

  const comment =
    (sandboxImage.status == "CREATING" && "being created...") ||
    (sandboxImage.status == "UPDATING" && "being updated...") ||
    (sandboxImage.status == "REMOVING" && "being removed...") ||
    (sandboxImage.status == "STARTING_WORKSPACE" &&
      "workspace is starting...") ||
    (sandboxImage.status == "STOPPING_WORKSPACE" &&
      "workspace is stopping...") ||
    (sandboxImage.status == "UPDATING_INTERNAL" && "internal being upated...");
  return (
    <Tilt
      onLeave={cleanStyle}
      ref={ref}
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      tiltReverse
    >
      <div
        id={id}
        className="sandbox-card"
        data-active={Boolean(sandboxImage.containerId)}
        title={comment}
        onClick={() => {
          if (sandboxImage.containerId) {
            window.open(
              "https://codespace.ust.dev/user/container/" +
                sandboxImage.containerId +
                "/"
            );
          }
          if (onClick) onClick(sandboxImage);
        }}
      >
        {/* the indicator */}
        <div className="mt-2 mr-2">
          <WorkspaceIndicator
            color={
              (sandboxImage.status == "STARTING_WORKSPACE" && "yellow") ||
              (sandboxImage.status == "STOPPING_WORKSPACE" && "yellow") ||
              (sandboxImage.status == "UPDATING_INTERNAL" && "green") ||
              "gray"
            }
          ></WorkspaceIndicator>
        </div>
        <div className="w-full flex flex-col justify-between h-full">
          <div>
            <p id="name">{sandboxImage.title}</p>
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

const SandboxImagesCard = (props: Props) => {
  const { sandboxImage, onClick, menuItems, zIndex, id } = props;
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );

  if (sandboxImage.status != "DEFAULT") {
    return <LoadingSandboxImageCard {...props}></LoadingSandboxImageCard>;
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
        id={id}
        data-active={Boolean(sandboxImage.containerId)}
        className={`sandbox-card`}
        onClick={() => {
          if (sandboxImage.containerId) {
            window.open(
              "https://codespace.ust.dev/user/container/" +
                sandboxImage.containerId +
                "/"
            );
          }
          if (onClick) onClick(sandboxImage);
        }}
      >
        <div className=" flex flex-row items-start space-x-2 ">
          {/* the indicator */}
          <div className="mt-2">
            <WorkspaceIndicator
              color={sandboxImage.containerId ? "green" : "gray"}
            ></WorkspaceIndicator>
          </div>
          <div id="content">
            <p id="name">{sandboxImage.title}</p>
            <p id="description">{sandboxImage.description}</p>
          </div>
        </div>
        <CardMenu items={menuItems(sandboxImage)} />
      </div>
    </Tilt>
  );
};

export default SandboxImagesCard;
