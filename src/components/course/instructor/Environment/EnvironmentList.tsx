import Environment from "./Environment";
import EnvironmentCreate from "./EnvironmentCreate";
import { CubeIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import Modal from "../../../Modal";
import EmptyDiv from "../../../EmptyDiv";
import ModalForm, { Section } from "../../../ModalForm";
import { useCnails } from "../../../../contexts/cnails";
import { containerAPI } from "../../../../lib/containerAPI";
import { envAPI } from "../../../../lib/envAPI";

const registry = "143.89.223.188:5000";
const rootImage = "143.89.223.188:5000/codeserver:latest";
const CPU = 0.5;
const memory = 400;

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
  const { sub } = useCnails();
  const { addContainer, removeContainer, removeTempContainer } = containerAPI;
  const { buildEnvironment } = envAPI;
  const [loading, setLoading] = useState(false);
  const iniCreateEnvironmentFormStructure: { [title: string]: Section } = {
    create_environment: {
      displayTitle: false,
      entries: {
        is_predefined: {
          type: "toggle",
          text: "Use predefined environment? ",
          description: "whether this environment is a predefined environment",
          tooltip:
            "whether this environment is a predefined environment. You will be prompt to a temporary workspace where you can set up the environment",
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
        environment_name: {
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

  return (
    <div className="flex flex-col w-full">
      {loading && <p>loading</p>}
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
      {/* <Modal isOpen={isOpen} setOpen={setIsOpen} clickOutsideToClose={true}>
        <EnvironmentCreate
          sectionUserID={sectionUserID}
          closeModal={closeModal}
          ref={createRef}
        ></EnvironmentCreate>
      </Modal> */}
      <ModalForm
        isOpen={isOpen}
        setOpen={setIsOpen}
        clickOutsideToClose={true}
        title="Create Environment"
        formStructure={iniCreateEnvironmentFormStructure}
        initData={{
          is_predefined: true,
          environment_choice:
            iniCreateEnvironmentFormStructure.create_environment.entries
              .environment_choice.options[0],
          environment_name: "",
          environment_description: "",
        }}
        onChange={(data, id) => {
          console.log(data, id);
        }}
        onEnter={async (data) => {
          if (data.is_predefined) {
          } else {
            setLoading(true);
            try {
              const response = await addContainer(
                rootImage,
                memory,
                CPU,
                sectionUserID,
                "",
                "root",
                true
              );
              console.log(response);
              if (response.success) {
                // const link = "https://codespace.ust.dev/user/container/" + response.containerID + "/"
                window.open("https://www.google.com");
                await buildEnvironment(
                  data.environment_name as string,
                  data.environment_description as string,
                  sectionUserID,
                  response.containerID
                );
              }
            } catch (error) {
              console.log(error);
            } finally {
              setLoading(false);
            }
          }
        }}
      ></ModalForm>
    </div>
  );
};

export default EnvironmentList;
