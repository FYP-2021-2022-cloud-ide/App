import React, { useCallback } from "react";
import { DocumentTextIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
//testing
import EmptyDiv from "./EmptyDiv";
import TemplateCard from "./TemplateCard";
import myToast from "./CustomToast";
import { useInstructor } from "../contexts/instructor";

const TemplateList = () => {
  const { environments, templates, setTemplateCreateOpen } = useInstructor();

  const onCreate = useCallback(() => {
    if (environments.length == 0)
      myToast.warning(
        "You need to have at least one environment before creating a template."
      );
    else {
      setTemplateCreateOpen(true);
    }
  }, [setTemplateCreateOpen]);

  return (
    <div className="template-list">
      <div id="header">
        <DocumentTextIcon id="icon"></DocumentTextIcon>
        <div id="title">Templates</div>
        <button onClick={onCreate} id="add" title="create template">
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
              .sort((a, b) => {
                if (a.active != b.active) {
                  return Number(b.active) - Number(a.active);
                } else {
                  return a.name.localeCompare(b.name);
                }
              })
              .map((template, index) => {
                return (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    zIndex={templates.length - index}
                  />
                );
              })}
          </div>
        )
      }
    </div>
  );
};

export default TemplateList;
