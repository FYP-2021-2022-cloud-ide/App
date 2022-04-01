import React, { useEffect, useRef } from "react";
import CardMenu from "./CardMenu";
import Tilt from "react-parallax-tilt";

import { SandboxImage } from "../lib/cnails";
import { useCleanTilt } from "./TemplateCard";

type Props = {
  sandboxImage: SandboxImage;
  onClick?: (sandboxImage: SandboxImage) => void;
  onDelete?: (sandboxImage: SandboxImage) => void;
  onUpdate?: (sandboxImage: SandboxImage) => void;
  onStart?: (sandboxImage: SandboxImage) => void;
  onStop?: (sandboxImage: SandboxImage) => void;
  zIndex?: number;
  id: string;
};

const SandboxImagesCard = ({
  sandboxImage,
  onClick,
  onDelete,
  onUpdate,
  onStop,
  onStart,
  zIndex,
  id,
}: Props) => {
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );

  if (sandboxImage.status) {

    return <Tilt
      onLeave={cleanStyle}
      ref={ref}
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      tiltReverse
    >
      <div id={id} className="sandbox-card select-none" title="creating personal workspace...">
        {/* the indicator */}
        <div className="mt-2 mr-2">
          <span className="relative flex h-3 w-3">
            {(sandboxImage.status == "STARTING_WORKSPACE" || sandboxImage.status == "STOPPING_WORKSPACE") && (
              <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            )}
            <span
              id="indicator"
              className={`relative inline-flex rounded-full h-3 w-3 ${(sandboxImage.status == "STARTING_WORKSPACE" || sandboxImage.status == "STOPPING_WORKSPACE") ? "bg-yellow-400" : "bg-gray-400"
                }`}
            ></span>
          </span>
        </div>
        <div className="w-full flex flex-col justify-between h-full">
          <div>
            <p id="sandbox-name" className="sandbox-card-name ">
              {sandboxImage.title}
            </p>
            {/* the pulsing animation */}
            <div className="animate-pulse flex space-x-4 mt-3" >
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
          <p className="text-xs capitalize text-gray-400 select-none">{
            sandboxImage.status == "CREATING" && "being created..." ||
            sandboxImage.status == "UPDATING" && "being updated..." ||
            sandboxImage.status == "REMOVING" && "being removed..." ||
            sandboxImage.status == "STARTING_WORKSPACE" && "workspace is starting..." ||
            sandboxImage.status == "STOPPING_WORKSPACE" && "workspace is stopping..."
          }</p>
        </div>
      </div>
    </Tilt>
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
        className={`sandbox-card select-none ${sandboxImage.sandboxesId ? "cursor-pointer" : ""
          } `}
        onClick={() => {
          if (onClick) onClick(sandboxImage);
        }}
      >
        <div className="sandbox-card-content grow">
          <div className=" flex flex-row items-start space-x-2 ">
            {/* the indicator */}
            <div className="mt-2">
              <span className="relative flex h-3 w-3">
                {sandboxImage.sandboxesId && (
                  <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                )}
                <span
                  id="indicator"
                  className={`relative inline-flex rounded-full h-3 w-3 ${sandboxImage.sandboxesId ? "bg-green-400" : "bg-gray-400"
                    }`}
                ></span>
              </span>
            </div>
            <div className=" ">
              <p id="sandbox-name" className="sandbox-card-name ">
                {sandboxImage.title}
              </p>
              <p id="sandbox-description" className="sandbox-card-des">
                {sandboxImage.description}
              </p>
            </div>
          </div>
        </div>
        <CardMenu
          items={[
            {
              text: "Delete",
              onClick: () => {
                if (onDelete) {
                  onDelete(sandboxImage);
                }
              },
            },
            {
              text: "Update",
              onClick: () => {
                if (onUpdate) {
                  onUpdate(sandboxImage);
                }
              },
            },
            {
              text: sandboxImage.sandboxesId ? "Stop" : "Start",
              onClick: sandboxImage.sandboxesId
                ? () => {
                  if (onStop) {
                    onStop(sandboxImage);
                  }
                }
                : () => {
                  if (onStart) {
                    onStart(sandboxImage);
                  }
                },
            },
          ]}
        />
      </div>
    </Tilt>
  );
};

export default SandboxImagesCard;
