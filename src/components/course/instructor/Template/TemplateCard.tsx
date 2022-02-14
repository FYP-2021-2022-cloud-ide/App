import React, { useState } from "react";
import Menu, { MenuItem } from "../../../CardMenu";
import { Template } from "../../../../lib/cnails";
import myToast from "../../../CustomToast";

interface Props {
  template: Template;
  onClick?: (template: Template) => void;
  onDelete?: (template: Template) => void;
  // return the newValue
  onToggle?: (template: Template) => void;
  // return the new value
  onToggleActivation?: (active: boolean) => void;
  onToggleFreshSave?: (freshSave: boolean) => void;
  onUpdate?: (template: Template) => void;
}

function TemplateCard({
  template,
  onClick,
  onUpdate,
  onDelete,
  onToggle,
  onToggleActivation,
  onToggleFreshSave,
}: Props) {
  let [useFreshSave, setUseFreshSave] = useState(false);

  var meunItems: MenuItem[] = [
    {
      text: "delete",
      onClick: () => {
        if (onDelete) onDelete(template);
      },
    },
    {
      text: "update",
      onClick: () => {
        if (onUpdate) {
          onUpdate(template);
        }
      },
    },
    {
      text: template.containerID ? "close" : "open",
      onClick: () => {
        if (onToggle) {
          onToggle(template);
        }
      },
    },
    {
      text: template.active ? "deactivate" : "activate",
      onClick: () => {
        if (onToggleActivation) {
          onToggleActivation(!Boolean(template.active));
        }
      },
    },
    {
      text: "share link",
      onClick: () => {
        myToast.success("link to copied to clipboard.");
        navigator.clipboard.writeText(
          "https://codespace.ust.dev/quickAssignmentInit/" + template.id
        );
      },
      conditional: () => {
        return Boolean(template.active);
      },
    },
  ];

  return (
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
      <div className="env-card-content ">
        <div className="flex flex-row">
          <div className="w-1/12 mt-4">
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
          </div>
          <div className="flex flex-col h-full justify-between w-full">
            <div>
              <div className="font-semibold text-sm text-gray-600 dark:text-gray-300  text-left ">
                {template.name}
              </div>
              <div className="font-medium text-xs text-gray-400  ">
                {template.imageId}
              </div>
            </div>
            <div className="font-medium text-xs text-gray-400 justify-self-end">
              {template.description}
            </div>
            {/* {!template.isExam && (
              <div>
                <div className="flex flex-row font-medium mt-4 dark:text-gray-300">
                  <span>Use fresh new save</span>
                  <span>
                    <InformationCircleIcon
                      data-for="messageTip"
                      data-tip
                      className="w-6 h-6"
                    ></InformationCircleIcon>
                  </span>
                </div>
                <Toggle
                  text={""}
                  enabled={useFreshSave}
                  onChange={() => setUseFreshSave(!useFreshSave)}
                />
              </div>
            )}
            {template.isExam && (
              <div className="badge border-0 dark:bg-gray-300 dark:text-gray-600">
                Exam
              </div>
            )} */}
          </div>
        </div>
      </div>

      <Menu items={meunItems}></Menu>
    </div>
  );
}

export default TemplateCard;
