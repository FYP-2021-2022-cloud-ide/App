import React, { useEffect, useRef } from "react";
import CardMenu from "./CardMenu";
import Tilt from "react-parallax-tilt";

import { SandboxImage } from "../lib/cnails";
import { useLayoutEffect } from "react";
import { useCleanTilt } from "./TemplateCard";

type Props = {
  sandboxImage: SandboxImage;
  onClick?: (sandboxImage: SandboxImage) => void;
  onDelete?: (sandboxImage: SandboxImage) => void;
  onUpdate?: (sandboxImage: SandboxImage) => void;
  onStart?: (sandboxImage: SandboxImage) => void;
  onStop?: (sandboxImage: SandboxImage) => void;
  zIndex?: number;
};

const SandboxImagesCard = ({
  sandboxImage,
  onClick,
  onDelete,
  onUpdate,
  onStop,
  onStart,
  zIndex,
}: Props) => {
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
        className={`sandbox-card ${
          sandboxImage.sandboxesId ? "cursor-pointer" : ""
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
                  className={`relative inline-flex rounded-full h-3 w-3 ${
                    sandboxImage.sandboxesId ? "bg-green-400" : "bg-gray-400"
                  }`}
                ></span>
              </span>
            </div>
            <div className=" ">
              <div className="sandbox-card-name ">{sandboxImage.title}</div>
              <div className="sandbox-card-des">{sandboxImage.description}</div>
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
