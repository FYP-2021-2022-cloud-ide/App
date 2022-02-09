import React from "react";
import Menu from "../CardMenu";
import { EnvironmentContent } from "./EnvironmentList";
import Tilt from "react-parallax-tilt";

interface EnvironmentProps {
  sectionUserID: string;
  environment: EnvironmentContent;
  onDelete?: (environment: EnvironmentContent) => void;
  onUpdate?: (environment: EnvironmentContent) => void;
}

function EnvironmentCard({
  environment,
  onDelete,
  onUpdate,
}: EnvironmentProps) {
  return (
    <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} tiltReverse>
      <div className="env-card">
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
          ]}
        ></Menu>
      </div>
    </Tilt>
  );
}

export default EnvironmentCard;
