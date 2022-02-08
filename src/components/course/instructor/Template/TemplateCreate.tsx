import React, { MouseEventHandler, useRef, useState } from "react";
import { Dialog, Transition, Switch } from "@headlessui/react";
import ListBox, { Option } from "../ListBox";
import Loader from "../../../../components/Loader";
import { useCnails } from "../../../../contexts/cnails";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Toggle from "../../../Toggle";
import { templateAPI } from "../../../../lib/templateAPI";
import { containerAPI } from "../../../../lib/containerAPI";
interface TemplateCreateProps {
  sectionUserID: string;
  memLimit: number;
  numCPU: number;
  environments: Option[];
  closeModal: MouseEventHandler<HTMLButtonElement> | undefined;
}

const TemplateCreate = React.forwardRef(
  (
    {
      memLimit,
      numCPU,
      sectionUserID,
      environments,
      closeModal,
    }: TemplateCreateProps,
    ref
  ) => {
    const [step, setStep] = useState(1);
    const [active, setActive] = useState(false);

    const prevStep = () => {
      setStep(step - 1);
    };
    const nextStep = () => {
      setStep(step + 1);
    };
    const [finishLoading, setFinishLoading] = useState(true);
    const [description, setDescription] = useState("");
    const [selectedEnv, setSelectedEnv] = useState(environments[0]);
    const [templateName, setTemplateName] = useState("");
    const [isExam, setIsExam] = useState(false);
    const [canNotify, setCanNotify] = useState(true);
    const [timeLimit, setTimeLimit] = useState(60);
    const { sub } = useCnails();
    const { addTemplate } = templateAPI;
    const { addTempContainer, removeTempContainer } = containerAPI;
    const [containerID, setContainerID] = useState("");
    // console.log(selectedEnv)

    const dialogClass =
      "inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl text-[#415A6E]";
    const titleClass = "text-xl font-medium leading-6 dark:text-gray-300 mb-5";
    const buttonsClass = "sm:flex sm:flex-row-reverse mt-4 ";
    const okButtonClass =
      "text-sm  mx-2 w-fit rounded-md px-4 py-2 bg-green-500 hover:bg-green-600 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5";
    const cancelButtonClass =
      "text-sm mx-2 w-fit rounded-md px-4 py-2 bg-gray-400 hover:bg-gray-500 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5";
    const inputClass =
      "border dark:border-0 focus:outline-none dark:bg-gray-700 p-1 px-3 w-full text-gray-500 dark:text-gray-300 flex-row space-x-2  text-left rounded-md shadow-lg";

    switch (step) {
      case 2:
        if (containerID != "") {
          nextStep();
        }
        return (
          //@ts-ignore
          <div ref={ref} className={dialogClass}>
            <Dialog.Title as="h3" className={titleClass}>
              Create Template
            </Dialog.Title>
            <div className="py-2 text-gray-600 dark:text-gray-300">
              Preparing the base IDE Template with base environment, please
              wait...
            </div>
            <Loader></Loader>
          </div>
        );
      case 3:
        return (
          //@ts-ignore
          <div ref={ref} className={dialogClass}>
            <Dialog.Title as="h3" className={titleClass}>
              Create Assignment Template
            </Dialog.Title>
            <div className="py-2 text-gray-600 dark:text-gray-300">
              A new container is prepared, please click the following link and
              set up the template. After finished the setting, please press the
              finish button to save the template
            </div>
            <a
              rel="noreferrer"
              className="flex text-blue-500 underline justify-center"
              href={
                "https://codespace.ust.dev/user/container/" + containerID + "/"
              }
              target="_blank"
            >
              Click Here
            </a>
            <div className={buttonsClass}>
              <button
                onClick={async () => {
                  setFinishLoading(false);
                  nextStep();
                  const response = await addTemplate(
                    templateName,
                    description,
                    sectionUserID,
                    "Dummy string",
                    containerID,
                    false,
                    isExam,
                    timeLimit,
                    canNotify
                  );
                  if (response.success) {
                    setFinishLoading(true);
                  } else {
                    setFinishLoading(true);
                    alert(response.message);
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
                  const response = await removeTempContainer(containerID, sub);
                  if (response.success) {
                    setFinishLoading(true);
                  }
                }}
                type="button"
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
          <div className={dialogClass}>
            <Dialog.Title as="h3" className={titleClass}>
              Create Template
            </Dialog.Title>
            <Loader></Loader>
          </div>
        );
      default:
        if (environments.length == 0)
          return (
            //@ts-ignore
            <div ref={ref} className={dialogClass}>
              <p className="text-gray-600 dark:text-gray-300">
                You need to have at least one environment before creating a
                template.
              </p>
              <div className={buttonsClass}>
                <button className={okButtonClass} onClick={closeModal}>
                  OK
                </button>
              </div>
            </div>
          );
        return (
          //@ts-ignore
          <div ref={ref} className={dialogClass}>
            <Dialog.Title as="h3" className={titleClass}>
              Create Assignment Template
            </Dialog.Title>
            <div className="font-medium mt-4 dark:text-gray-300">
              Environment
            </div>
            <ListBox
              initSelected={selectedEnv}
              onChange={setSelectedEnv}
              environments={environments}
            />

            <div className="font-medium mt-4 dark:text-gray-300">
              Template name
            </div>

            <input
              className={inputClass}
              placeholder="e.g. Assignment 1"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            ></input>

            <div className="font-medium mt-4 dark:text-gray-300">
              Description(Optional)
            </div>

            <textarea
              className={inputClass}
              placeholder="e.g. Assignment 1 is about ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex flex-row font-medium mt-4 dark:text-gray-300">
              <span>Is it an Exam?</span>
              <span>
                <InformationCircleIcon
                  data-for="messageTip"
                  data-tip
                  className="w-6 h-6"
                ></InformationCircleIcon>
              </span>
            </div>
            {/* <input className="focus:outline-none dark:bg-gray-600 dark:text-gray-600" type="checkbox"
                        checked={isExam}
                        onChange={(e) => setIsExam(!isExam)}></input> */}
            <Toggle
              enabled={isExam}
              onChange={() => setIsExam(!isExam)}
              text={"is exam?"}
            />

            {isExam ? (
              <div>
                <div className="font-medium mt-4 dark:text-gray-300">
                  Time Limit(in minutes)
                </div>
                <input
                  className={inputClass}
                  placeholder="e.g. 120"
                  value={timeLimit.toString()}
                  onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                ></input>
              </div>
            ) : (
              <div></div>
            )}
            <div className="flex flex-row font-medium mt-4 dark:text-gray-300 space-x-3">
              <span>Can students send question to You?</span>
              <span>
                <InformationCircleIcon
                  data-for="messageTip"
                  data-tip
                  className="w-6 h-6"
                ></InformationCircleIcon>
              </span>
            </div>
            {/* <input className="focus:outline-none dark:bg-gray-600 dark:text-gray-600" type="checkbox"
                        checked={canNotify}
                        onChange={(e) => setCanNotify(!canNotify)}></input> */}
            <Toggle
              enabled={canNotify}
              onChange={() => setCanNotify(!canNotify)}
              text={"can notify?"}
            />
            <div className={buttonsClass}>
              <button
                onClick={async () => {
                  nextStep();
                  const response = await addTempContainer(
                    memLimit,
                    numCPU,
                    selectedEnv.id,
                    sub,
                    "student"
                  ); //non-existent template id
                  if (response.success) {
                    setContainerID(response.containerID);
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
    }
  }
);
TemplateCreate.displayName = "TemplateCreate";
export default TemplateCreate;
