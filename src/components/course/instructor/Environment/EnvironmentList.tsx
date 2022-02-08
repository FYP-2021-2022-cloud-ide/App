import Environment from "./Environment";
import EnvironmentCreate from "./EnvironmentCreate";
import { CubeIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import Modal from "../../../Modal";
import EmptyDiv from "../../../EmptyDiv";
import ModalForm, { Section } from "../../../ModalForm";

const registry = "143.89.223.188:5000";

export interface EnvironmentContent {
  id: string;
  imageId: string;
  environmentName: string;
  libraries: string;
  description: string;
}

export interface props {
  sectionUserID: string;
  environments: EnvironmentContent[];
}

const EnvironmentList = ({ sectionUserID, environments }: props) => {
  let [isOpen, setIsOpen] = useState(false);
  let createRef = React.createRef<HTMLDivElement>();
  const iniCreateEnvironmentFormData: { [title: string]: Section } = {
    create_environment: {
      displayTitle: false,
      entries: {
        is_predefined: {
          type: "toggle",
          text: "Use predefined environment? ",
          description: "whether this environment is a predefined environment",
          tooltip: "whether this environment is a predefined environment",
        },
        environment_choice: {
          type: "listbox",
          text: "Pick the Programming Language",
          description: "Pick the Programming Language",
          tooltip: "Pick the Programming Language",
          options: [
            { value: "C++/C", id: `${registry}/codeserver:latest` },
            { value: "Python3", id: `${registry}/codeserver:latest` },
            { value: "Java", id: `${registry}/codeserver:latest` },
          ],
          conditional: (data) => {
            return data.is_predefined as boolean;
          },
        },
        environment_title: {
          type: "input",
          text: "Environment name",
          placeholder: "e.g. Environment 1",
        },
        environment_description: {
          type: "textarea",
          text: "Environment Description",
        },
      },
    },
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  console.log(
    iniCreateEnvironmentFormData.create_environment.entries.environment_choice
      .options[0]
  );
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row text-gray-700 dark:text-gray-300 justify-start gap-x-4 pb-4">
        <CubeIcon className="w-7 h-7"></CubeIcon>
        <div className="text-lg">Environments</div>
        <button onClick={openModal}>
          <PlusCircleIcon className="w-7 h-7 hover:scale-110 transition  ease-in-out duration-300"></PlusCircleIcon>
        </button>
      </div>
      {
        // generate the environment cards
        environments?.length == 0 ? (
          <EmptyDiv message="There is no environment for this course yet." />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {environments.map((environment) => {
              return (
                <Environment
                  key={environment.id}
                  sectionUserID={sectionUserID}
                  environment={environment}
                ></Environment>
              );
            })}
          </div>
        )
      }
      <Modal isOpen={isOpen} setOpen={setIsOpen} clickOutsideToClose={true}>
        <EnvironmentCreate
          sectionUserID={sectionUserID}
          closeModal={closeModal}
          ref={createRef}
        ></EnvironmentCreate>
      </Modal>
      {/* <ModalForm
        isOpen={isOpen}
        setOpen={setIsOpen}
        clickOutsideToClose={true}
        title="Create Environment"
        formStructure={iniCreateEnvironmentFormData}
        initData={{
          is_predefined: false,
          environment_choice:
            iniCreateEnvironmentFormData.create_environment.entries
              .environment_choice.options[0],
          environment_title: "",
          environment_description: "",
        }}
        onChange={(data, id) => {
          console.log(data, id);
        }}
        onEnter={(data) => {
          console.log(data);
        }}
      ></ModalForm> */}
    </div>
  );
};

export default EnvironmentList;
