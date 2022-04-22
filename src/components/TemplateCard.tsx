import React from "react";
import Menu from "./CardMenu";
import { Template } from "../lib/cnails";
import Tilt from "react-parallax-tilt";
import { EyeIcon, EyeOffIcon, AcademicCapIcon } from "@heroicons/react/solid";
import useCleanTilt from "../hooks/useCleanTilt";
import EmbeddedWorkspaceCard from "./EmbeddingWorkspaceCard";
import useTemplateCard from "../hooks/useTemplateCard";

interface Props {
  template: Template;
  zIndex?: number;
}

function TemplateCard(props: Props) {
  const { template, zIndex } = props;
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );
  const { onClick, isHighlighted, env, menuItems, container, comment } =
    useTemplateCard(template);

  return (
    <Tilt
      onLeave={cleanStyle}
      ref={ref}
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      tiltReverse
    >
      <div
        onClick={onClick}
        data-status={template.status}
        data-highlighted={isHighlighted}
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
          <Menu items={menuItems}></Menu>
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
