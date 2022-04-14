import React from "react";
import { DocumentTextIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
//testing
import EmptyDiv from "./EmptyDiv";
import { Environment, Template } from "../lib/cnails";
import TemplateCard from "./TemplateCard";
import { MenuItem } from "./CardMenu";

export type Props = {
  templates: Template[];
  environments: Environment[];
  sectionUserID: string;
  highlightedEnv?: Environment;
  onCreate?: () => void;
  onClick?: (template: Template) => void;
  menuItems: (template: Template) => MenuItem[];
};

const TemplateList = ({
  templates,
  highlightedEnv,
  onClick,
  onCreate,
  menuItems,
}: Props) => {
  return (
    <div className="template-list">
      <div id="header">
        <DocumentTextIcon id="icon"></DocumentTextIcon>
        <div id="title">Templates</div>
        <button
          onClick={() => {
            if (onCreate) onCreate();
          }}
          id="add"
          title="create template"
        >
          <PlusCircleIcon></PlusCircleIcon>
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
