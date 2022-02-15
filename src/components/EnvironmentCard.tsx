import React, { useEffect, useLayoutEffect, useRef } from "react";
import Menu from "./CardMenu";
import Tilt from "react-parallax-tilt";
import { Environment } from "../lib/cnails";

type Props = {
  environment: Environment;
  onClick?: (environment: Environment) => void;
  onDelete?: (environment: Environment) => void;
  onUpdate?: (environment: Environment) => void;
  onHighlight?: (environment: Environment) => void;
};

function EnvironmentCard({
  environment,
  onClick,
  onDelete,
  onUpdate,
  onHighlight,
}: Props) {
  const ref = useRef<Tilt>();
  const cleanStyle = () =>
    setTimeout(() => {
      if (ref.current) {
        //@ts-ignore
        let node = ref.current.wrapperEl.node as HTMLDivElement;
        if (node.getAttribute("style") != "") {
          node.setAttribute("style", "");
          cleanStyle();
        }
      }
    }, 10);
  useLayoutEffect(() => {
    cleanStyle();
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
