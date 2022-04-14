import React, { useEffect, useLayoutEffect, useRef } from "react";
import CardMenu, { MenuItem } from "./CardMenu";
import Tilt from "react-parallax-tilt";
import { Environment } from "../lib/cnails";
import useCleanTilt from "../hooks/useCleanTilt";

type Props = {
  environment: Environment;
  onClick?: (environment: Environment) => void;
  menuItems: (environment: Environment) => MenuItem[];
  zIndex?: number;
};

const LoadingEnvCard = (props: Props) => {};

function EnvironmentCard({ environment, onClick, menuItems, zIndex }: Props) {
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
        <CardMenu items={menuItems(environment)}></CardMenu>
      </div>
    </Tilt>
  );
}

export default EnvironmentCard;
