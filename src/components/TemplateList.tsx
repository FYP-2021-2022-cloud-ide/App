import React from "react";
import { DocumentTextIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
//testing
import EmptyDiv from "./EmptyDiv";
import { Environment, Template } from "../lib/cnails";
import TemplateCard from "./TemplateCard";

export type Props = {
  templates: Template[];
  environments: Environment[];
  sectionUserID: string;
  highlightedEnv?: Environment;
  onWorkspaceCardClick?: (template: Template) => void;
  onCreate?: () => void;
  onClick?: (template: Template) => void;
  menuItems: {
    text: string | ((template: Template) => string),
    onClick: (template: Template) => void;
  }[]

  // onDelete?: (template: Template) => void;
  // onUpdate?: (template: Template) => void;
  // onToggle?: (template: Template, open: boolean) => void;
  // onInspect?: (template: Template) => void;
  // onToggleActivation?: (template: Template, active: boolean) => void;
};

const TemplateList = ({
  templates,
  highlightedEnv,
  onClick,
  onCreate,

  onWorkspaceCardClick,
  menuItems
}: Props) => {
  return (
    <div className="flex flex-col w-full">
      <div className="course-list-title">
        <DocumentTextIcon className="course-list-title-icon"></DocumentTextIcon>
        <div className="course-list-title-text">Templates</div>
        <button
          onClick={() => {
            if (onCreate) onCreate();
          }}
        >
          <PlusCircleIcon className="course-list-title-add"></PlusCircleIcon>
        </button>
      </div>
      {
        // generate the templates
        templates?.length == 0 ? (
          <EmptyDiv message="There is no template for this course yet." />
        ) : (
          <div className="template-grid">
            {templates
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((template, index) => {
                const highlighted = Boolean(
                  highlightedEnv &&
                  template.environment_id === highlightedEnv.id
                );
                return (
                  <TemplateCard
                    key={template.id}
                    highlighted={highlighted}
                    template={template}
                    onClick={() => {
                      if (onClick) onClick(template);
                    }}
                    onWorkspaceCardClick={(template) => {
                      if (onWorkspaceCardClick) onWorkspaceCardClick(template);
                    }}
                    zIndex={templates.length - index}
                    menuItems={menuItems}
                  ></TemplateCard>
                );
              })}
          </div>
        )
      }
    </div>
  );
};

export default TemplateList;
