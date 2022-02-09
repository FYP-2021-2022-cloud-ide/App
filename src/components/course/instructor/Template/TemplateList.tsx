import { useCnails } from "../../../../contexts/cnails";
import React, { useEffect, useRef, useState } from "react";
import Template from "./TemplateCard";
import { DocumentTextIcon } from "@heroicons/react/outline";
import { PlusCircleIcon, InformationCircleIcon } from "@heroicons/react/solid";
import Modal from "../../../Modal";
import ListBox, { Option } from "../../../ListBox";
import TemplateCreate from "./TemplateCreate";
//testing
import EmptyDiv from "../../../EmptyDiv";
import { EnvironmentContent as environment } from "../EnvironmentList";
import ModalForm, { Section } from "../../../ModalForm";
import { envAPI } from "../../../../lib/envAPI";
import myToast from "../../../CustomToast";

export interface template {
  id: string;
  name: string;
  description: string;
  imageId: string;
  assignment_config_id: string;
  storage: string;
  containerID: string;
  active: boolean;
  isExam: boolean;
  timeLimit: Number;
  allow_notification: boolean;
}

export interface props {
  templates: template[];
  environments: environment[];
  sectionUserID: string;
}

const TemplateList = ({ templates, sectionUserID, environments }: props) => {
  const [memLimit, setmemLimit] = useState(400);
  const [numCPU, setnumCPU] = useState(0.5);
  const [warningOpen, setWarningOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let ref = React.createRef<HTMLDivElement>();

  // building the environemnts list
  var environmentList: Option[] = [];
  for (let i = 0; i < environments.length; i++) {
    environmentList.push({
      value:
        environments[i].environmentName + " (" + environments[i].imageId + ")",
      id: environments[i].imageId,
    } as Option);
  }

  const initTemplateCreateFormStructure: { [title: string]: Section } = {
    create_template: {
      entries: {
        select_environment: {
          type: "listbox",
          options: environmentList,
          tooltip: "Pick an environment which has been defined in the course.",
        },
      },
    },
  };

  return (
    <div className="flex flex-col w-full">
      <div className="course-list-title">
        <DocumentTextIcon className="course-list-title-icon"></DocumentTextIcon>
        <div className="course-list-title-text">Templates</div>
        <button
          onClick={() => {
            if (environmentList.length == 0) {
              myToast.warning(
                "You need to have at least one environment before creating a template."
              );
            } else {
              setIsOpen(true);
            }
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
          <div className="grid grid-cols-2 gap-4 flex-1">
            {templates.map((template: template) => {
              return (
                <Template
                  key={template.id}
                  template={template}
                  memLimit={memLimit}
                  numCPU={numCPU}
                  sectionUserID={sectionUserID}
                ></Template>
              );
            })}
          </div>
        )
      }
      {/* <Modal isOpen={isOpen} setOpen={setIsOpen}>
        <TemplateCreate
          closeModal={() => setIsOpen(false)}
          memLimit={memLimit}
          numCPU={numCPU}
          environments={environmentList}
          ref={ref}
          sectionUserID={sectionUserID}
        ></TemplateCreate>
      </Modal> */}
      {environmentList.length != 0 && (
        <ModalForm
          isOpen={isOpen}
          setOpen={setIsOpen}
          formStructure={initTemplateCreateFormStructure}
          title="Create Template"
          initData={{
            select_environment:
              initTemplateCreateFormStructure.create_template.entries
                .select_environment.options[0],
          }}
        ></ModalForm>
      )}
    </div>
  );
};

export default TemplateList;
