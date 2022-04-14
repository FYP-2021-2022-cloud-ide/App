import React, { useEffect } from "react";
import Menu, { MenuItem } from "./CardMenu";
import { Template } from "../lib/cnails";
import Tilt from "react-parallax-tilt";
import { EyeIcon, EyeOffIcon, AcademicCapIcon } from "@heroicons/react/solid";
import { useInstructor } from "../contexts/instructor";
import useCleanTilt from "../hooks/useCleanTilt";
import EmbeddedWorkspaceCard from "./EmbeddingWorkspaceCard";
import EmbeddingWorkspaceCard from "./EmbeddingWorkspaceCard";

interface Props {
  template: Template;
  highlighted?: Boolean;
  onClick?: (template: Template) => void;
  // onWorkspaceCardClick?: (template: Template) => void;
  menuItems: (template: Template) => MenuItem[];
  zIndex?: number;
}

const LoadingTemplateCard = (props: Props) => {
  const {
    template,
    highlighted: _highlighted = false,
    onClick,
    menuItems,
    zIndex,
  } = props;
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );
  const comment =
    (template.status == "STARTING_WORKSPACE" && "starting workspace...") ||
    (template.status == "STOPPING_WORKSPACE" && "stopping workspace...") ||
    (template.status == "STARTING_UPDATE_WORKSPACE" &&
      "starting temporary workspace...") ||
    (template.status == "STOPPING_UPDATE_WORKSPACE" &&
      "stopping temporary workspace...") ||
    (template.status == "UPDATING_INTERNAL" && "updating internal...");
  return (
    <Tilt
      onLeave={cleanStyle}
      ref={ref}
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      tiltReverse
    >
      <div className="template-card">
        <div id="content">
          <div>
            <p id="name">{template.name}</p>
            <div className="animate-pulse flex space-x-4 mt-3">
              <div className="flex-1 space-y-6 py-1">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-400 dark:bg-slate-800 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-400 dark:bg-slate-800 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-400 dark:bg-slate-800 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <EmbeddingWorkspaceCard
              name={
                template.status == "STARTING_WORKSPACE" ||
                template.status == "STOPPING_WORKSPACE"
                  ? template.name
                  : "Temporary Workspace"
              }
              tooltip={comment}
              color={
                template.status == "UPDATING_INTERNAL" ? "green" : "yellow"
              }
              containerId={template.containerId}
            ></EmbeddingWorkspaceCard>
            <p className="text-xs  text-gray-400">{comment}</p>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

function TemplateCard(props: Props) {
  const {
    template,
    highlighted: _highlighted = false,
    onClick,
    menuItems,
    zIndex,
  } = props;
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

  if (template.status != "DEFAULT")
    return <LoadingTemplateCard {...props}></LoadingTemplateCard>;

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
                name={template.name}
                tooltip={"workspace is running..."}
                color="green"
                containerId={template.containerId}
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
