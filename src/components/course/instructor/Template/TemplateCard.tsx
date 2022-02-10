import React, { useState, useRef } from "react";
import { useCnails } from "../../../../contexts/cnails";
import Menu from "../../CardMenu";
import Modal from "../../../Modal";

import TemplateUpdate from "./TemplateUpdate";
import { Dialog } from "@headlessui/react";
import Loader from "../../../Loader";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Toggle from "../../../Toggle";
import { templateAPI } from "../../../../lib/templateAPI";
import { containerAPI } from "../../../../lib/containerAPI";
import { Template } from "../../../../lib/cnails";
interface Props {
  template: Template;
  memLimit: number;
  numCPU: number;
  sectionUserID: string;
  onClick?: () => void;
  onDelete?: () => void;
  // return the newValue
  onToggle?: (open: boolean) => void;
  // return the new value
  onToggleActivation?: (active: boolean) => void;
}

function TemplateCard({ template, memLimit, numCPU, sectionUserID }: Props) {
  const { sub } = useCnails();
  const { removeTemplate, activateTemplate, deactivateTemplate } = templateAPI;
  const { addContainer, removeContainer } = containerAPI;
  let [isOpen, setIsOpen] = useState(false);
  let [updateIsOpen, setUpdateIsOpen] = useState(false);
  let [useFreshSave, setUseFreshSave] = useState(false);
  var instanceFlag = true;

  var meunItems = [
    {
      text: "delete",
      onClick: async () => {
        const response = await removeTemplate(template.id, sectionUserID);
        console.log(response);
        window.location.reload();
      },
    },
    {
      text: "update",
      onClick: () => setUpdateIsOpen(true),
    },
    {
      text: instanceFlag ? "close" : "open",
      onClick: instanceFlag
        ? async () => {
            const response = await removeContainer(template.containerID, sub);
            console.log(response);
            window.location.reload();
          }
        : async () => {
            setIsOpen(true);
            const response = await addContainer(
              template.imageId,
              memLimit,
              numCPU,
              sectionUserID,
              template.id,
              "student",
              useFreshSave
            );
            window.location.reload();
          },
    },
    {
      text: template.active ? "deactivate" : "activate",
      onClick: template.active
        ? async () => {
            const response = await deactivateTemplate(
              template.id,
              sectionUserID
            );
            console.log(response);
            window.location.reload();
          }
        : async () => {
            const response = await activateTemplate(template.id, sectionUserID);
            console.log(response);
            window.location.reload();
          },
    },
  ];
  if (template.active) {
    meunItems.push({
      text: "share link",
      onClick: () => {
        navigator.clipboard.writeText(
          "https://codespace.ust.dev/quickAssignmentInit/" + template.id
        );
      },
    });
  }

  return (
    <div
      onClick={() => {
        window.open(
          "https://codespace.ust.dev/user/container/" +
            template.containerID +
            "/"
        );
      }}
      className={`min-h-36 h-36 border cursor-pointer border-gray-200 dark:border-gray-700 shadow-sm rounded-lg px-5 py-4 ${
        template.active
          ? "bg-white dark:bg-gray-600"
          : "bg-gray-200 dark:bg-gray-900"
      }`}
    >
      <div className="flex flex-row  justify-between h-full">
        <div className=" flex flex-row  space-x-3 ">
          <div className="w-1/12 mt-4">
            <span className="relative flex h-3 w-3">
              {instanceFlag && (
                <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              )}
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${
                  instanceFlag ? "bg-green-400" : "bg-gray-400"
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
            {!template.isExam && (
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
            )}
          </div>
        </div>

        <div className="w-1/12">
          <Menu items={meunItems}></Menu>
        </div>
      </div>
    </div>
  );
}

export default TemplateCard;
