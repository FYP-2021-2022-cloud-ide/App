import React, { useEffect } from "react";
import Menu, { MenuItem } from "./CardMenu";
import { Template } from "../lib/cnails";
import Tilt from "react-parallax-tilt";
import { EyeIcon, EyeOffIcon, AcademicCapIcon } from "@heroicons/react/solid";
import { useInstructor } from "../contexts/instructor";
import useCleanTilt from "../hooks/useCleanTilt";
import EmbeddedWorkspaceCard from "./EmbeddingWorkspaceCard";
import { useContainers } from "../contexts/containers";

interface Props {
  template: Template;
  highlighted?: Boolean;
  onClick?: (template: Template) => void;
  // onWorkspaceCardClick?: (template: Template) => void;
  menuItems: (template: Template) => MenuItem[];
  zIndex?: number;
}

function TemplateCard(props: Props) {
  const { template, onClick, menuItems, zIndex } = props;
  const { highlightedEnv, setHighlightedEnv, getEnvironment } = useInstructor();
  const { containers } = useContainers();
  // const [status , setStatus ] =
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );
  const env = getEnvironment(template.environment_id);
  const container = containers.find(
    (container) => container.redisPatch.sourceId == template.id
  );

  /**
   * this hook highlight the template for 1000ms
   */
  useEffect(() => {
    if (highlightedEnv && highlightedEnv.id === template.environment_id) {
      // setHighlighted(false);
      const id = setTimeout(() => {
        setHighlightedEnv(undefined);
      }, 1000);
      return () => {
        clearTimeout(id);
      };
    }
  });

  const comment =
    (template.status == "CREATING" && "being created...") ||
    (template.status == "REMOVING" && "being removed...") ||
    (template.status == "UPDATING" && "being updated...") ||
    (template.status == "STARTING_WORKSPACE" && "starting workspace...") ||
    (template.status == "STOPPING_WORKSPACE" && "stopping workspace...") ||
    (template.status == "STARTING_UPDATE_WORKSPACE" &&
      "starting temporary workspace...") ||
    (template.status == "STOPPING_UPDATE_WORKSPACE" &&
      "stopping temporary workspace...");

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
        data-status={template.status}
        data-highlighted={Boolean(
          highlightedEnv && highlightedEnv.id === template.environment_id
        )}
        data-published={template.active}
        title={template.name}
        className="template-card"
      >
        <div className="flex flex-row items-start justify-between">
          <div className="w-full">
            <p id="name">{template.name}</p>
            {env && (
              <div id="environment">
                using <span className="font-bold">{env.name}</span>
              </div>
            )}
            <p id="description">{template.description}</p>
            {/* loading pulse */}
            <div
              id="loading-pulse"
              className="animate-pulse flex space-x-4 mt-3"
            >
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
          <Menu items={menuItems(template)}></Menu>
        </div>

        <div className="flex flex-col space-y-1">
          {/* the embedding container card  */}
          {container && <EmbeddedWorkspaceCard container={container} />}
          <p id="status" className="text-xs  text-gray-400">
            {comment}
          </p>
          {/* attributes */}
          <div id="attributes" className="flex flex-row space-x-2">
            {template.isExam && (
              <div className="flex flex-row items-center">
                <AcademicCapIcon className="w-3 h-3 text-gray-400" />
                <span className="text-2xs text-gray-400">Exam</span>
              </div>
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
    </Tilt>
  );
}

export default TemplateCard;
