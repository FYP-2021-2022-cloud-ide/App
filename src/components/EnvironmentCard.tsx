import React, { useEffect, useLayoutEffect, useRef } from "react";
import CardMenu, { MenuItem } from "./CardMenu";
import Tilt from "react-parallax-tilt";
import { Environment } from "../lib/cnails";
import useCleanTilt from "../hooks/useCleanTilt";
import EmbeddingWorkspaceCard from "./EmbeddingWorkspaceCard";

type Props = {
  environment: Environment;
  onClick?: (environment: Environment) => void;
  menuItems: (environment: Environment) => MenuItem[];
  zIndex?: number;
};

const LoadingEnvCard = (props: Props) => {
  const { environment, zIndex } = props;
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );

  const comment =
    (environment.status == "STARTING_UPDATE_WORKSPACE" &&
      "starting temporary workspace...") ||
    (environment.status == "STOPPING_UPDATE_WORKSPACE" &&
      "stopping temporary workspace...") ||
    (environment.status == "UPDATING_INTERNAL" && "updating internal...");
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
          <div>
            <EmbeddingWorkspaceCard
              name="Temporary Workspace"
              tooltip={comment}
              color={
                environment.status == "UPDATING_INTERNAL" ? "green" : "yellow"
              }
              containerId={environment.temporaryContainerId}
            ></EmbeddingWorkspaceCard>
            <p className="text-xs  text-gray-400">{comment}</p>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

function EnvironmentCard(props: Props) {
  const { environment, onClick, menuItems, zIndex } = props;
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );

  if (environment.status != "DEFAULT") {
    return <LoadingEnvCard {...props}></LoadingEnvCard>;
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
        title={environment.name}
        className="env-card"
        onClick={() => {
          if (onClick) onClick(environment);
        }}
      >
        <div id="content">
          <div>
            <p id="name">{environment.name}</p>
            <p id="lib">{environment.libraries}</p>
            <p id="description">{environment.description}</p>
          </div>
        </div>
        <CardMenu items={menuItems(environment)}></CardMenu>
      </div>
    </Tilt>
  );
}

export default EnvironmentCard;
