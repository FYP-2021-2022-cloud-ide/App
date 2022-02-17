import React, { useEffect, useLayoutEffect, useRef } from "react";
import CardMenu from "./CardMenu";
import Tilt from "react-parallax-tilt";
import { Environment } from "../lib/cnails";
import { useCleanTilt } from "./TemplateCard";

type Props = {
  environment: Environment;
  onClick?: (environment: Environment) => void;
  onDelete?: (environment: Environment) => void;
  onUpdate?: (environment: Environment) => void;
  onHighlight?: (environment: Environment) => void;
  zIndex?: number;
};

function EnvironmentCard({
  environment,
  onClick,
  onDelete,
  onUpdate,
  onHighlight,
  zIndex,
}: Props) {
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );
  const menuItems = [];
  if (onDelete)
    menuItems.push({
      text: "Delete",
      onClick: () => {
        if (onDelete) {
          onDelete(environment);
        }
      },
    });
  if (onUpdate)
    menuItems.push({
      text: "Update",
      onClick: () => {
        if (onUpdate) {
          onUpdate(environment);
        }
      },
    });
  if (onHighlight)
    menuItems.push({
      text: "Highlight templates",
      onClick: () => {
        if (onHighlight) onHighlight(environment);
      },
    });

  return (
    <Tilt
      onLeave={cleanStyle}
      ref={ref}
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      tiltReverse
    >
      <div
        className="env-card"
        onClick={() => {
          if (onClick) onClick(environment);
        }}
      >
        <div className="env-card-content">
          <div className="env-card-name">{environment.name}</div>
          <div className="env-card-lib">{environment.libraries}</div>
          {/* <div className="env-card-ref">{environment.imageId}</div> */}
          <p className="env-card-des">{environment.description}</p>
        </div>
        <CardMenu items={menuItems}></CardMenu>
      </div>
    </Tilt>
  );
}

export default EnvironmentCard;
