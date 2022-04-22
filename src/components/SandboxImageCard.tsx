import React, { useCallback, useEffect, useRef } from "react";
import CardMenu, { MenuItem } from "./CardMenu";
import Tilt from "react-parallax-tilt";

import { SandboxImage } from "../lib/cnails";
import useCleanTilt from "../hooks/useCleanTilt";
import WorkspaceIndicator from "./WorkspaceIndicator";
import useSandboxImageCard from "../hooks/useSandboxImageCard";

type Props = {
  sandboxImage: SandboxImage;
  zIndex: number;
  id: string;
};

const SandboxImagesCard = (props: Props) => {
  const { sandboxImage, zIndex, id } = props;
  const { status, containerId } = sandboxImage;
  const { onClick, color, menuItems, comment, container } =
    useSandboxImageCard(sandboxImage);
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
        id={id}
        data-status={status}
        data-container={Boolean(container && container.status == "DEFAULT")}
        className="sandbox-card"
        onClick={onClick}
      >
        <div className=" flex flex-row items-start ">
          {/* the indicator */}
          <div className="mt-2 mr-2">
            <WorkspaceIndicator color={color}></WorkspaceIndicator>
          </div>
          <div className="w-full">
            <p id="name">{sandboxImage.title}</p>
            <p id="description">{sandboxImage.description}</p>
            {/* the pulsing animation */}
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
          <CardMenu items={menuItems} />
        </div>
        <p id="status" className="text-xs  text-gray-400">
          {comment}
        </p>
      </div>
    </Tilt>
  );
};

export default SandboxImagesCard;
