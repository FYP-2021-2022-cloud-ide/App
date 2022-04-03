import React, { useEffect, useRef } from "react";
import CardMenu from "./CardMenu";
import Tilt from "react-parallax-tilt";

import { SandboxImage } from "../lib/cnails";
import useCleanTilt from "./useCleanTilt";


type Props = {
  sandboxImage: SandboxImage;
  onClick?: (sandboxImage: SandboxImage) => void;
  menuItems: (sandboxImage: SandboxImage) => {
    text: string | ((sandboxImage: SandboxImage) => string),
    onClick: (sandboxImage: SandboxImage) => void;
  }[];
  zIndex?: number;
  id: string;
};

const SandboxImagesCard = ({
  sandboxImage,
  onClick,
  menuItems,
  zIndex,
  id,
}: Props) => {
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );

  if (sandboxImage.status != "DEFAULT") {
    return <Tilt
      onLeave={cleanStyle}
      ref={ref}
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      tiltReverse
    >
      <div id={id} className="sandbox-card select-none" title="creating personal workspace..." onClick={
        () => {
          if (sandboxImage.sandboxesId) {
            window.open(
              "https://codespace.ust.dev/user/container/" +
              sandboxImage.sandboxesId +
              "/"
            );
          }
          if (onClick) onClick(sandboxImage);
        }
      } >
        {/* the indicator */}
        <div className="mt-2 mr-2">
          <span className="relative flex h-3 w-3">
            {(sandboxImage.status == "STARTING_WORKSPACE" || sandboxImage.status == "STOPPING_WORKSPACE" || sandboxImage.status == "UPDATING_INTERNAL") && (
              <span className={`absolute animate-ping inline-flex h-full w-full rounded-full opacity-75 ${sandboxImage.status == "STARTING_WORKSPACE" && "bg-yellow-400" ||
                sandboxImage.status == "STOPPING_WORKSPACE" && "bg-yellow-400" ||
                sandboxImage.status == "UPDATING_INTERNAL" && "bg-green-400"
                }`}></span>
            )}
            <span
              id="indicator"
              className={`relative inline-flex rounded-full h-3 w-3 ${sandboxImage.status == "STARTING_WORKSPACE" && "bg-yellow-400" ||
                sandboxImage.status == "STOPPING_WORKSPACE" && "bg-yellow-400" ||
                sandboxImage.status == "UPDATING_INTERNAL" && "bg-green-400"
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
            sandboxImage.status == "STOPPING_WORKSPACE" && "workspace is stopping..." ||
            sandboxImage.status == "UPDATING_INTERNAL" && "internal being upated..."
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
          if (sandboxImage.sandboxesId) {
            window.open(
              "https://codespace.ust.dev/user/container/" +
              sandboxImage.sandboxesId +
              "/"
            );
          }
          if (onClick) onClick(sandboxImage);
        }}
      >
        <div className="flex flex-col justify-between h-full">
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
          {/* {sandboxImage.status == "UPDATING_INTERNAL" && <p className="text-gray-500 dark:text-gray-300 text-2xs">Internal is updating</p>} */}
        </div>
        <CardMenu
          items={menuItems(sandboxImage).map(item => ({
            text: typeof item.text == "string" ? item.text : item.text(sandboxImage),
            onClick: () => item.onClick(sandboxImage)
          }))}
        />
      </div>
    </Tilt>
  );
};

export default SandboxImagesCard;
