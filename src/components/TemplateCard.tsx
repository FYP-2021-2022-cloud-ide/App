import React, { useLayoutEffect, useRef, useState } from "react";
import Menu, { MenuItem } from "./CardMenu";
import { Template } from "../lib/cnails";
import myToast from "./CustomToast";
import Tilt from "react-parallax-tilt";

export const useCleanTilt = () => {
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
  return { ref, cleanStyle };
};

interface Props {
  template: Template;
  onClick?: (template: Template) => void;
  onDelete?: (template: Template) => void;
  // return the newValue
  onToggle?: (template: Template, open: boolean) => void;
  // return the new value
  onToggleActivation?: (template: Template, active: boolean) => void;
  onToggleFreshSave?: (freshSave: boolean) => void;
  onInspect?: (template: Template) => void;
  onWorkspaceCardClick?: (template: Template) => void;
  onUpdate?: (template: Template) => void;
}

const EmbeddedWorkspaceCard = ({
  template,
  onClick,
}: {
  template: Template;
  onClick: () => void;
}) => {
  return (
    <div
      className="rounded  bg-blue-200/20 dark:bg-black/30 p-2 flex flex-row space-x-2"
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
    >
      <span className="relative flex h-3 w-3">
        {template.containerID && (
          <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-3 w-3 ${
            template.containerID ? "bg-green-400" : "bg-gray-400"
          }`}
        ></span>
      </span>
      <div className="env-card-content min-h-[32px]">
        <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
          Workspace
        </p>
      </div>
    </div>
  );
};

function TemplateCard({
  template,
  onClick,
  onUpdate,
  onDelete,
  onToggle,
  onToggleActivation,
  onInspect,
  onWorkspaceCardClick,
  onToggleFreshSave,
}: Props) {
  let [useFreshSave, setUseFreshSave] = useState(false);
  const { ref, cleanStyle } = useCleanTilt();
  var meunItems: MenuItem[] = [
    {
      text: "Delete",
      onClick: () => {
        if (onDelete) onDelete(template);
      },
    },
    {
      text: "Update",
      onClick: () => {
        if (onUpdate) {
          onUpdate(template);
        }
      },
    },
    {
      text: template.containerID ? "Stop workspace" : "Start workspace",
      onClick: () => {
        if (onToggle) {
          onToggle(template, !Boolean(template.containerID));
        }
      },
    },
    {
      text: template.active ? "Deactivate" : "Activate",
      onClick: () => {
        if (onToggleActivation) {
          onToggleActivation(template, !template.active);
        }
      },
    },
    // {
    //   text: "Inspect",
    //   onClick: () => {
    //     if (onInspect) onInspect(template);
    //   },
    // },
    {
      text: "Share link",
      onClick: () => {
        myToast.success("link to copied to clipboard.");
        navigator.clipboard.writeText(
          "https://codespace.ust.dev/quickAssignmentInit/" + template.id
        );
      },
      conditional: () => {
        return template.active;
      },
    },
  ];

  return (
    <Tilt
      onLeave={cleanStyle}
      ref={ref}
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      tiltReverse
    >
      <div
        onClick={() => {
          if (onClick) onClick(template);
        }}
        className={`env-card ${
          template.active
            ? "bg-white dark:bg-gray-600"
            : "bg-gray-200 dark:bg-gray-900"
        }`}
      >
        <div className="env-card-content justify-between w-full">
          <div>
            <div>
              <div className="font-semibold text-sm text-gray-600 dark:text-gray-300  whitespace-nowrap truncate">
                {template.name}
              </div>
            </div>
            <div className="font-medium text-xs text-gray-400 line-clamp-3 ">
              {template.description}
            </div>
          </div>
          {template.containerID && (
            <EmbeddedWorkspaceCard
              template={template}
              onClick={() => {
                if (onWorkspaceCardClick) {
                  onWorkspaceCardClick(template);
                }
              }}
            />
          )}
        </div>

        <Menu items={meunItems}></Menu>
      </div>
    </Tilt>
  );
}

export default TemplateCard;
