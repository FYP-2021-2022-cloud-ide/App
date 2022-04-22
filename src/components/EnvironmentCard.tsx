import React, { useEffect, useLayoutEffect, useRef } from "react";
import CardMenu, { MenuItem } from "./CardMenu";
import Tilt from "react-parallax-tilt";
import { Environment } from "../lib/cnails";
import useCleanTilt from "../hooks/useCleanTilt";
import EmbeddingWorkspaceCard from "./EmbeddingWorkspaceCard";
import { useContainers } from "../contexts/containers";
import useEnvironmentCard from "../hooks/useEnvironmentCard";

type Props = {
  environment: Environment;
  zIndex?: number;
};

const LoadingEnvCard = (props: Props) => {
  const { environment, zIndex } = props;
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );

  return (
    <Tilt
      ref={ref}
      onLeave={cleanStyle}
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      tiltReverse
    >
      <div className="env-card">
        <div id="content">
          <div>
            <p id="name">{environment.name}</p>
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
          <div></div>
        </div>
      </div>
    </Tilt>
  );
};

function EnvironmentCard(props: Props) {
  const { environment, zIndex } = props;
  const { menuItems, container, comment } = useEnvironmentCard(environment);
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
        title={environment.name}
        className="env-card"
        data-status={environment.status}
        data-container={Boolean(container && container.status == "DEFAULT")}
      >
        <div className="flex flex-row items-start">
          <div className="w-full">
            <p id="name">{environment.name}</p>
            <p id="env-choice">{environment.libraries}</p>
            <p id="description">{environment.description}</p>
            {/* loading pulse */}
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
          <CardMenu items={menuItems}></CardMenu>
        </div>
        <div className="flex flex-col space-y-1">
          {container && <EmbeddingWorkspaceCard container={container} />}
          <p id="status" className="text-xs  text-gray-400">
            {comment}
          </p>
        </div>
      </div>
    </Tilt>
  );
}

export default EnvironmentCard;
