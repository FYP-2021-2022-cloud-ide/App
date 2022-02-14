import React, { MouseEventHandler, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import Loader from "../Loader";
import { useCnails } from "../../contexts/cnails";
import { sandboxAPI } from "../../lib/api/sandboxAPI";
import { containerAPI } from "../../lib/api/containerAPI";
interface SandboxCreateProps {
  memLimit: Number;
  numCPU: Number;
  closeModal: MouseEventHandler<HTMLButtonElement> | undefined;
}

const registry = "143.89.223.188:5000";

const SandboxCreate = React.forwardRef(
  ({ memLimit, numCPU, closeModal }: SandboxCreateProps, ref) => {
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
    const [sandboxName, setSandboxName] = useState("");
    const { sub, userId } = useCnails();
    const [containerID, setContainerID] = useState("");
    const { addSandboxImage } = sandboxAPI;
    const { addTempContainer, removeTempContainer } = containerAPI;
    const rootImage = `${registry}/codeserver:latest`;

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
              Create Sandbox Image
            </Dialog.Title>
            <div className="py-2 text-gray-600 dark:text-gray-300">
              Preparing the base IDE Sanbox with base environment, please
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
              Create Sandbox Image
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
                  const response = await addSandboxImage(
                    description,
                    containerID,
                    sandboxName,
                    userId
                  );
                  if (response.success) {
                    setFinishLoading(true);
                  } else {
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
              Create Sandbox Image
            </Dialog.Title>
            <Loader></Loader>
          </div>
        );
      default:
        return (
          //@ts-ignore
          <div ref={ref} className={dialogClass}>
            <Dialog.Title as="h3" className={titleClass}>
              Create Sandbox Image
            </Dialog.Title>

            <div className="font-medium mt-4 dark:text-gray-300">
              Sandbox Image name
            </div>

            <input
              className={inputClass}
              placeholder="e.g. Sandbox with C++"
              value={sandboxName}
              onChange={(e) => setSandboxName(e.target.value)}
            ></input>

            <div className="font-medium mt-4 dark:text-gray-300">
              Description(Optional)
            </div>

            <textarea
              className={inputClass}
              placeholder="e.g. This sandbox is about ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className={buttonsClass}>
              <button
                onClick={async () => {
                  nextStep();
                  const response = await addTempContainer(
                    memLimit,
                    numCPU,
                    rootImage,
                    sub,
                    "root"
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
SandboxCreate.displayName = "TemplateCreate";
export default SandboxCreate;
