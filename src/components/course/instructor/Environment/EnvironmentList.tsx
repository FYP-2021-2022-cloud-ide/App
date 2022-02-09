import Environment from "./Environment";
import EnvironmentCreate from "./EnvironmentCreate";
import { CubeIcon } from "@heroicons/react/outline";
import { InformationCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import Modal from "../../../Modal";
import ListBox, { Option } from "../../../course/instructor/ListBox";
import EmptyDiv from "../../../EmptyDiv";
import ModalForm, { Section } from "../../../ModalForm";
import { useCnails } from "../../../../contexts/cnails";
import { containerAPI } from "../../../../lib/containerAPI";
import { envAPI } from "../../../../lib/envAPI";
import { useRouter } from "next/router";
import { Environment as EnvironmentData } from "../../../../lib/cnails";
import _ from "lodash";
import toast from "react-hot-toast";

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
}

const EnvironmentList = ({ sectionUserID }: props) => {
  let [isCreateOpen, setIsCreateOpen] = useState(false);
  let [isUpdateOpen, setIsUpdateOpen] = useState(false);
  let [warningOpen, setWarningOpen] = useState(false);
  let warningRef = React.createRef<HTMLDivElement>();
  const router = useRouter();
  const sectionId = router.query.sectionId as string;
  const { sub } = useCnails();
  const { addContainer, removeContainer, removeTempContainer } = containerAPI;
  const {
    buildEnvironment,
    addEnvironment,
    environmentList,
    removeEnvironment,
  } = envAPI;
  const [environments, setEnvironments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEnvironments = async () => {
    const response = await environmentList(sectionId, sub);
    const {
      success,
      environments: newEnvironemnts,
    }: { success: boolean; environments: EnvironmentData[] } = response;
    if (success) {
      // check if the past environment is different from the new environments, rerender if yes
      if (!_.isEqual(environments, newEnvironemnts)) {
        setEnvironments(newEnvironemnts);
      }
    }
  };

  useEffect(() => {
    // this will be called everytime rerender --> fetch the container
    fetchEnvironments();
  });

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

  return (
    <div className="flex flex-col w-full">
      {loading && <p>loading</p>}
      <div className="flex flex-row text-gray-700 dark:text-gray-300 justify-start gap-x-4 pb-4">
        <CubeIcon className="w-7 h-7"></CubeIcon>
        <div className="text-lg">Environments</div>
        <button onClick={() => setIsCreateOpen(true)}>
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
                  onDelete={async (environment) => {
                    const response = await removeEnvironment(
                      environment.id,
                      sectionUserID
                    );
                    const { success } = response;
                    if (success) {
                      fetchEnvironments();
                    } else {
                      // do something else
                    }
                  }}
                  onUpdate={(environment) => {
                    setIsUpdateOpen(true);
                  }}
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
      {/* the create environment modal */}
      <ModalForm
        isOpen={isCreateOpen}
        setOpen={setIsCreateOpen}
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
          console.log(data);
          if (data.is_predefined) {
            const environment = data.environment_choice as Option;
            const name = data.environment_name as string;
            const description = data.environment_descripiton as string;
            const response = await addEnvironment(
              [environment.value + ":" + environment.id],
              name,
              description,
              sectionUserID
            );
            const { success, environmentID } = response;
            if (success) {
              toast.success(
                `Environment (${environmentID}) is successfully created.`
              );
              fetchEnvironments();
            }
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
              toast.error(error.message);
            } finally {
              setLoading(false);
            }
          }
        }}
      ></ModalForm>
      <ModalForm
        isOpen={isUpdateOpen}
        setOpen={setIsUpdateOpen}
        clickOutsideToClose
        formStructure={{}}
        initData={{}}
        title="Update Environment"
      ></ModalForm>
    </div>
  );
};

export default EnvironmentList;
