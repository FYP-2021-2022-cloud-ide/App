import { Dialog, Transition } from "@headlessui/react";
import React, { MouseEventHandler, useEffect } from "react";
import { Fragment, useState } from "react";
import Select from "react-select";
import { finished } from "stream";
import Loader from "../../../../components/Loader";
import ListBox, { Option } from "../ListBox";
import { useCnails } from "../../../../contexts/cnails";
import { toast } from "react-hot-toast";
import { envAPI } from "../../../../lib/envAPI";

import { sandboxAPI } from "../../../../lib/sandboxAPI";
import Toggle from "../../../Toggle";
interface EnvironmentCreateProps {
  sectionUserID: string;
  closeModal: MouseEventHandler<HTMLButtonElement> | undefined;
}

const registry = "143.89.223.188:5000";

const EnvironmentCreate = React.forwardRef(
  (
    { sectionUserID, closeModal }: EnvironmentCreateProps,
    ref: React.LegacyRef<HTMLDivElement>
  ) => {
    const [mode, setMode] = useState("");
    const [isCustom, setIsCustom] = useState(false);
    const [environmentName, setEnvironmentName] = useState("");
    const [description, setDescription] = useState("");
    const rootImage = `${registry}/codeserver:latest`;
    const options: Option[] = [
      { value: "C++/C", id: `${registry}/codeserver:latest` },
      { value: "Python3", id: `${registry}/codeserver:latest` },
      { value: "Java", id: `${registry}/codeserver:latest` },
    ];

    const CPU = 0.5;
    const memory = 400;
    const [finishLoading, setFinishLoading] = useState(true);
    // const { buildEnvironment, addContainer } = useCnails();
    const { buildEnvironment, addEnvironment } = envAPI;
    const [containerID, setContainerID] = useState("");
    const [selectedEnv, setSelectedEnv] = useState<Option>(options[0]);
    // const { addTempContainer, removeTempContainer } = sandboxAPI;
    const { sub } = useCnails();
    const [step, setStep] = useState(1);
    const nextStep = () => {
      setStep(step + 1);
    };

    const buttonsClass = "sm:flex sm:flex-row-reverse mt-4 ";
    const okButtonClass =
      "text-sm  mx-2 w-fit rounded-md px-4 py-2 bg-green-500 hover:bg-green-600 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5";
    const cancelButtonClass =
      "text-sm mx-2 w-fit rounded-md px-4 py-2 bg-gray-400 hover:bg-gray-500 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5";
    const inputClass =
      "border dark:border-0 focus:outline-none dark:bg-gray-700 p-1 px-3 w-full text-gray-500 dark:text-gray-300 flex-row space-x-2  text-left rounded-md shadow-lg";

    return (
      <div ref={ref} className="course-dialog-modal">
        <Dialog.Title as="h3" className="course-dialog-title tiny-scrollbar">
          Create Environment
        </Dialog.Title>
        <div className="flex flex-row items-start space-x-2">
          <p>Is custom?</p>
          <Toggle
            text={"is custom?"}
            onChange={() => setIsCustom(!isCustom)}
            enabled={isCustom}
          ></Toggle>
        </div>
        {isCustom ? (
          <></>
        ) : (
          <>
            <div className="font-medium mt-4 dark:text-gray-300">
              Pick the Programming Language
            </div>
            <ListBox
              initSelected={selectedEnv}
              onChange={setSelectedEnv}
              environments={options}
            />
          </>
        )}

        <div className="font-medium mt-4 dark:text-gray-300">
          Environment name
        </div>

        <input
          className={inputClass}
          placeholder="e.g. Environment 1"
          value={environmentName}
          onChange={(e) => setEnvironmentName(e.target.value)}
        ></input>

        <div className=" font-medium mt-4 dark:text-gray-300">
          Description(Optional)
        </div>

        <textarea
          className="course-dialog-textarea"
          placeholder="e.g. Environment 1 is about ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className={buttonsClass}>
          <button
            onClick={async () => {
              nextStep();
              const response = await addTempContainer(
                memory,
                CPU,
                sub,
                rootImage,
                "root"
              );
              console.log(response);
              if (response.success) {
                setContainerID(response.containerID);
              } else {
                window.location.reload();
              }
            }}
            className={okButtonClass}
          >
            Next
          </button>
          <button className={cancelButtonClass} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    );

    switch (mode) {
      case "custom":
        switch (step) {
          case 2:
            if (containerID != "") {
              nextStep();
            }
            return (
              //@ts-ignore
              <div ref={ref} className="course-dialog-modal">
                <Dialog.Title as="h3" className="course-dialog-title">
                  Create Environment{" "}
                </Dialog.Title>
                <p className="text-gray-600 dark:text-gray-300">
                  Preparing the base IDE environment, please wait...
                </p>
                <Loader />
              </div>
            );
          case 3:
            return (
              //@ts-ignore
              <div ref={ref} className="course-dialog-modal">
                <Dialog.Title as="h3" className="course-dialog-title">
                  Create Environment
                </Dialog.Title>
                <div className="py-2 m-auto text-gray-600 dark:text-gray-300">
                  A new container is prepared, please click the following link
                  and set up the environment. After finished the setting, please
                  press the finish button to save the environment
                </div>
                <a
                  className="flex text-blue-500 underline justify-center"
                  href={
                    "https://codespace.ust.dev/user/container/" +
                    containerID +
                    "/"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Click Here
                </a>
                <div className={buttonsClass}>
                  <button
                    onClick={async () => {
                      setFinishLoading(false);
                      nextStep();
                      const response = await buildEnvironment(
                        environmentName,
                        description,
                        sectionUserID,
                        containerID
                      ); //expect description
                      console.log(response);
                      if (response.success) {
                        setFinishLoading(true);
                      }
                    }}
                    className={okButtonClass}
                  >
                    Finish
                  </button>
                  <button
                    onClick={async () => {
                      setFinishLoading(false);
                      nextStep();
                      const response = await removeTempContainer(
                        containerID,
                        sub
                      );
                      if (response.success) {
                        setFinishLoading(true);
                      }
                    }}
                    className={cancelButtonClass}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          case 4:
            if (finishLoading) {
              window.location.reload();
            }
            return (
              <div className="course-dialog-modal">
                <Dialog.Title as="h3" className="course-dialog-title">
                  Create Environment
                </Dialog.Title>
                <Loader />
              </div>
            );
          default:
            return (
              //@ts-ignore
              <div ref={ref} className="course-dialog-modal">
                <Dialog.Title as="h3" className="course-dialog-title">
                  {" "}
                  Add Environment{" "}
                </Dialog.Title>
              </div>
            );
        }
      case "preset":
        switch (step) {
          case 2:
            return (
              //@ts-ignore
              <div ref={ref} className="course-dialog-modal">
                <Dialog.Title as="h3" className="course-dialog-title">
                  Creating Environment, Please wait
                </Dialog.Title>
                <Loader></Loader>
              </div>
            );
          default:
            return (
              //@ts-ignore
              <div ref={ref} className="course-dialog-modal">
                <Dialog.Title as="h3" className="course-dialog-title">
                  Add Environment
                </Dialog.Title>

                <div className="font-medium mt-4 dark:text-gray-300">
                  Environment name
                </div>
                <input
                  className={inputClass}
                  placeholder="e.g. Environment 1"
                  value={environmentName}
                  onChange={(e) => setEnvironmentName(e.target.value)}
                ></input>

                <div className="font-medium mt-4 dark:text-gray-300">
                  Description(Optional)
                </div>

                <textarea
                  className={inputClass}
                  placeholder="e.g. Environment 1 is about ..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <div className={buttonsClass}>
                  <button
                    onClick={async () => {
                      const response = await addEnvironment(
                        [selectedEnv.value + ":" + selectedEnv.id],
                        environmentName,
                        description,
                        sectionUserID
                      ); //expecting description
                      if (response.success) {
                        //@ts-ignore
                        closeModal();
                        window.location.reload();
                      }
                      nextStep();
                    }}
                    className={okButtonClass}
                  >
                    Next
                  </button>
                  <button className={cancelButtonClass} onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
            );
        }
      default:
        return (
          //@ts-ignore
          <div ref={ref} className="course-dialog-modal">
            <Dialog.Title as="h3" className="course-dialog-title">
              Add Environment
            </Dialog.Title>

            <p className="text-gray-600 dark:text-gray-300 mb-5">
              Use predefined environment?
            </p>

            <div className="flex flex-row-reverse">
              <button
                className={okButtonClass}
                onClick={() => {
                  setMode("preset");
                }}
              >
                Yes
              </button>
              <button
                className={cancelButtonClass}
                onClick={() => {
                  setMode("custom");
                }}
              >
                Use Custom Environment
              </button>
              <button className={cancelButtonClass} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        );
    }
  }
);

export default EnvironmentCreate;
