import React, {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Menu, { MenuItem } from "./CardMenu";
import { Template } from "../lib/cnails";
import myToast from "./CustomToast";
import Tilt from "react-parallax-tilt";
import { EyeIcon, EyeOffIcon, AcademicCapIcon } from "@heroicons/react/solid";
import { useInstructor } from "../contexts/instructor";
import useCleanTilt from "./useCleanTilt";

interface Props {
  template: Template;
  highlighted?: Boolean;
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
  zIndex?: number;
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
      className="rounded  bg-blue-200/20 dark:bg-black/30 p-2 flex flex-row space-x-2 "
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
          className={`relative inline-flex rounded-full h-3 w-3 ${template.containerID ? "bg-green-400" : "bg-gray-400"
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
  highlighted: _highlighted = false,
  onClick,
  onUpdate,
  onDelete,
  onToggle,
  onToggleActivation,
  onInspect,
  onWorkspaceCardClick,
  onToggleFreshSave,
  zIndex,
}: Props) {
  const { environments, highlightedEnv, setHighlightedEnv } = useInstructor();
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );
  const belong = environments.findIndex(
    (e) => e.id === template.environment_id
  );
  var meunItems: MenuItem[] = [];
  if (onDelete)
    meunItems.push({
      text: "Delete",
      onClick: () => {
        onDelete(template);
      },
    });
  if (onUpdate)
    meunItems.push({
      text: "Update",
      onClick: () => {
        onUpdate(template);
      },
    });
  if (onToggle)
    meunItems.push({
      text: template.containerID ? "Stop workspace" : "Start workspace",
      onClick: () => {
        if (onToggle) {
          onToggle(template, !Boolean(template.containerID));
        }
      },
    });
  if (onToggleActivation) {
    meunItems.push({
      text: template.active ? "Unpublish" : "Publish",
      onClick: () => {
        onToggleActivation(template, !template.active);
      },
    });
  }
  if (template.active)
    meunItems.push({
      text: "Share link",
      onClick: () => {
        myToast.success("link to copied to clipboard.");
        navigator.clipboard.writeText(
          "https://codespace.ust.dev/quickAssignmentInit/" + template.id
        );
      },
    });

  useEffect(() => {
    if (highlightedEnv && highlightedEnv.id === template.environment_id) {
      // setHighlighted(false);
      const id = setTimeout(() => {
        setHighlightedEnv(null);
      }, 1000);
      return () => {
        clearTimeout(id);
      };
    }
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
        onClick={() => {
          if (onClick) onClick(template);
        }}
        className={`template-card  transition-all duration-300 ease-in ${highlightedEnv && highlightedEnv.id === template.environment_id
          ? "bg-yellow-300/80 shadow-yellow-300 shadow-xl"
          : template.active
            ? "bg-white dark:bg-gray-600 shadow-sm"
            : "bg-gray-200 dark:bg-gray-900 shadow-sm"
          }`}
      >
        <div className="env-card-content justify-between w-full">
          <div>
            <div>
              <div className="font-semibold text-sm text-gray-600 dark:text-gray-300  whitespace-nowrap truncate">
                {template.name}
              </div>
            </div>
            {belong != -1 && (
              <div className="text-2xs text-gray-600 dark:text-gray-300 truncate">
                using{" "}
                <span className="font-bold">{environments[belong].name}</span>
              </div>
            )}
            <p className="template-card-des">{template.description}</p>
          </div>
          <div className="flex flex-col space-y-1">
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
            <div className="flex flex-row space-x-2">
              {
                template.isExam ? <div className="flex flex-row items-center">
                  <AcademicCapIcon className="w-3 h-3 text-gray-400" />
                  <span className="text-2xs text-gray-400">Exam</span>
                </div> : <></>
              }
              {template.active ? (
                <div className="flex flex-row  items-center">
                  <EyeIcon className="w-3 h-3 text-gray-400 "></EyeIcon>
                  <span className="text-2xs text-gray-400">Published</span>
                </div>
              ) : (
                <div className="flex flex-row  items-center">
                  <EyeOffIcon className="w-3 h-3 text-gray-400 "></EyeOffIcon>
                  <span className="text-2xs text-gray-400 ">Not Published</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col justify-between h-full items-center"> */}
        <Menu items={meunItems}></Menu>

      </div>
      {/* </div> */}
    </Tilt>
  );
}

export default TemplateCard;
