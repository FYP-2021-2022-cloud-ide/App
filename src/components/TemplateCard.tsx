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
import useCleanTilt from "../hooks/useCleanTilt";

interface Props {
  template: Template;
  highlighted?: Boolean;
  onClick?: (template: Template) => void;
  onWorkspaceCardClick?: (template: Template) => void;
  menuItems: (template: Template) => MenuItem[];
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
      className="rounded  border bg-white hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-900 p-2 flex flex-row space-x-2 border-gray-300 dark:border-gray-800"
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      title="Workspace is running..."
    >
      <span className="relative flex h-3 w-3">
        {template.containerId && (
          <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-3 w-3 ${
            template.containerId ? "bg-green-400" : "bg-gray-400"
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
  onWorkspaceCardClick,
  menuItems,
  zIndex,
}: Props) {
  const { environments, highlightedEnv, setHighlightedEnv, getEnvironment } =
    useInstructor();
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );
  const env = getEnvironment(template.environment_id);

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
        data-active={
          highlightedEnv && highlightedEnv.id === template.environment_id
            ? "highlighted"
            : template.active
        }
        title={template.name}
        className="template-card"
      >
        <div id="content">
          <div>
            <div>
              <p id="name">{template.name}</p>
            </div>
            {env && (
              <div id="env">
                using <span className="font-bold">{env.name}</span>
              </div>
            )}
            <p id="description">{template.description}</p>
          </div>
          <div className="flex flex-col space-y-1">
            {template.containerId && (
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
              {template.isExam ? (
                <div className="flex flex-row items-center">
                  <AcademicCapIcon className="w-3 h-3 text-gray-400" />
                  <span className="text-2xs text-gray-400">Exam</span>
                </div>
              ) : (
                <></>
              )}
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
        <Menu items={menuItems(template)}></Menu>
      </div>
      {/* </div> */}
    </Tilt>
  );
}

export default TemplateCard;
