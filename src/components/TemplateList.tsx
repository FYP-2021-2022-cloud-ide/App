import React, { useState } from "react";
import { DocumentTextIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { Option } from "./ListBox";
//testing
import EmptyDiv from "./EmptyDiv";
import ModalForm, { Section } from "./ModalForm";
import myToast from "./CustomToast";
import { Environment, Template } from "../lib/cnails";
import TemplateCard from "./TemplateCard";

export type Props = {
  templates: Template[];
  environments: Environment[];
  sectionUserID: string;
  onCreate?: () => void;
  onClick?: (template: Template) => void;
  onDelete?: (template: Template) => void;
  onUpdate?: (template: Template) => void;
  onToggle?: (template: Template) => void;
  onToggleActivation?: (template: Template, open: boolean) => void;
};

const TemplateList = ({
  templates,
  sectionUserID,
  environments,
  onClick,
  onCreate,
  onDelete,
  onToggle,
  onToggleActivation,
  onUpdate,
}: Props) => {
  let ref = React.createRef<HTMLDivElement>();

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
            {templates.map((template: Template) => {
              return (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onClick={() => {
                    if (onClick) onClick(template);
                  }}
                  onDelete={() => {
                    if (onDelete) onDelete(template);
                  }}
                  onToggle={() => {
                    if (onToggle) onToggle(template);
                  }}
                  onUpdate={(template) => {
                    if (onUpdate) onUpdate(template);
                  }}
                  onToggleActivation={(active) => {
                    if (onToggleActivation)
                      onToggleActivation(template, active);
                  }}
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
