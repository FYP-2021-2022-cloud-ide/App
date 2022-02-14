import React from "react";
import CardMenu from "./CardMenu";
import Tilt from "react-parallax-tilt";

import { SandboxImage } from "../lib/cnails";

type Props = {
  sandboxImage: SandboxImage;
  onClick?: (sandboxImage: SandboxImage) => void;
  onDelete?: (sandboxImage: SandboxImage) => void;
  onUpdate?: (sandboxImage: SandboxImage) => void;
  onOpen?: (sandboxImage: SandboxImage) => void;
  onClose?: (sandboxImage: SandboxImage) => void;
};

const SandboxImagesCard = ({ sandboxImage, onClick, onDelete, onUpdate,onClose,onOpen }: Props) => {
  return (
    <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} tiltReverse>
      <div
        className="env-card"
        onClick={() => {
          if (onClick) onClick(sandboxImage);
        }}
      >
        <div className="env-card-content">
          <div className=" flex flex-row  space-x-7 ">
            <div className="w-1/12 mt-4">
              <span className="relative flex h-3 w-3">
                {sandboxImage.sandboxesId && (
                  <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex rounded-full h-3 w-3 ${
                    sandboxImage.sandboxesId ? "bg-green-400" : "bg-gray-400"
                  }`}
                ></span>
              </span>
            </div>
            <div className="   space-y-2 ">
              <div className="env-card-name ">{sandboxImage.title}</div>
              <div className="env-card-des">{sandboxImage.description}</div>
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
              text: sandboxImage.sandboxesId ? "Close" : "Open",
              onClick: sandboxImage.sandboxesId
                ?()=>{ if (onClose) {
                  onClose(sandboxImage);
                }}
                :()=>{if (onOpen) {
                  onOpen(sandboxImage);
                }}
            },
          ]}
        />
      </div>
    </Tilt>
  );
};

export default SandboxImagesCard;
