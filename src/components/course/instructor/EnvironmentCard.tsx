import React from "react";
import Menu from "../CardMenu";

import Tilt from "react-parallax-tilt";
import { Environment } from "../../../lib/cnails";

interface EnvironmentProps {
  environment: Environment;
  onClick?: (environment: Environment) => void;
  onDelete?: (environment: Environment) => void;
  onUpdate?: (environment: Environment) => void;
  onHighlight?: (environment: Environment) => void;
}

function EnvironmentCard({
  environment,
  onClick,
  onDelete,
  onUpdate,
  onHighlight,
}: EnvironmentProps) {
  return (
    <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} tiltReverse>
      <div
        className="env-card"
        onClick={() => {
          if (onClick) onClick(environment);
        }}
      >
        <div className="env-card-content">
          <div className="env-card-name">{environment.environmentName}</div>
          <div className="env-card-lib">{environment.libraries}</div>
          <div className="env-card-ref">{environment.imageId}</div>
          <div className="env-card-des">{environment.description}</div>
        </div>
        <Menu
          items={[
            {
              text: "Delete",
              onClick: () => {
                if (onDelete) {
                  onDelete(environment);
                }
              },
            },
            {
              text: "Update",
              onClick: () => {
                if (onUpdate) {
                  onUpdate(environment);
                }
              },
            },
            {
              text: "Highlight templates",
              onClick: () => {
                if (onHighlight) onHighlight(environment);
              },
            },
          ]}
        ></Menu>
      </div>
    </Tilt>
  );
}

export default EnvironmentCard;
