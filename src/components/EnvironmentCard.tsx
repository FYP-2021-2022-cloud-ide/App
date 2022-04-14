import React, { useEffect, useLayoutEffect, useRef } from "react";
import CardMenu from "./CardMenu";
import Tilt from "react-parallax-tilt";
import { Environment } from "../lib/cnails";
import useCleanTilt from "../hooks/useCleanTilt";

type Props = {
  environment: Environment;
  onClick?: (environment: Environment) => void;
  menuItems: {
    text: string | ((environment: Environment) => string);
    onClick: (environment: Environment) => void;
  }[];
  zIndex?: number;
};

function EnvironmentCard({
  environment,
  onClick,
  // onDelete,
  // onUpdate,
  // onHighlight,
  // onUpdateInternal,
  menuItems,
  zIndex,
}: Props) {
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
        onClick={() => {
          if (onClick) onClick(environment);
        }}
      >
        <div id="content">
          <p id="name">{environment.name}</p>
          <p id="lib">{environment.libraries}</p>
          <p id="description">{environment.description}</p>
        </div>
        <CardMenu
          items={menuItems.map((item) => ({
            text:
              typeof item.text == "string" ? item.text : item.text(environment),
            onClick: () => item.onClick(environment),
          }))}
        ></CardMenu>
      </div>
    </Tilt>
  );
}

export default EnvironmentCard;
