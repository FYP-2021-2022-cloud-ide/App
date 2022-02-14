import { Dialog } from "@headlessui/react";
import React, { MouseEventHandler } from "react";
import { useState } from "react";
import { useCnails } from "../../contexts/cnails";
import { sandboxAPI } from "../../lib/api/sandboxAPI";
import { containerAPI } from "../../lib/api/containerAPI";
import Loader from "../Loader";
import { SandboxImage } from "../../lib/cnails";

interface SandboxUpdateProps {
  memLimit: Number;
  numCPU: Number;
  sandboxImage: SandboxImage;
  closeModal: MouseEventHandler<HTMLButtonElement> | undefined;
}

const SandboxUpdate = React.forwardRef(
  ({ memLimit, numCPU, sandboxImage, closeModal }: SandboxUpdateProps, ref) => {
    const [sandboxName, setSandboxName] = useState(sandboxImage.title);
    const [description, setDescription] = useState(sandboxImage.description);
    const [finishLoading, setFinishLoading] = useState(true);
    const [containerID, setContainerID] = useState("");
    const { sub, userId } = useCnails();
    const { updateSandboxImage } = sandboxAPI;
    const { addTempContainer, removeTempContainer } = containerAPI;
    const [step, setStep] = useState(1);
    const nextStep = () => {
      setStep(step + 1);
    };

    // styles
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
              Update Sandbox
            </Dialog.Title>
            <div className="dark:text-gray-300">
              Preparing the IDE environment, please wait
            </div>
            <Loader></Loader>
          </div>
        );
      case 3:
        return (
          //@ts-ignore
          <div ref={ref} className={dialogClass}>
            <Dialog.Title as="h3" className={titleClass}>
              Update SandBox Image
            </Dialog.Title>
            <div className="py-2 m-auto ">
              A new container is prepared, please click the following link and
              set up the sandbox. After finished the setting, please press the
              finish button to save the sandbox image
            </div>
            <a
              className="flex text-blue-500 underline justify-center"
              href={
                "https://codespace.ust.dev/user/container/" + containerID + "/"
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
                  const response = await updateSandboxImage(
                    sandboxImage.id,
                    sandboxName,
                    description,
                    containerID,
                    userId
                  ); //non-existent template id
                  console.log(response);
                  if (response.success == true || response.success == false) {
                    window.location.reload();
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
                  if (response.success == true || response.success == false) {
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
          <div className={dialogClass}>
            <Dialog.Title as="h3" className={titleClass}>
              Update SandBox Image
            </Dialog.Title>
            <Loader></Loader>
          </div>
        );
      default:
        return (
          //@ts-ignore
          <div ref={ref} className={dialogClass}>
            <Dialog.Title as="h3" className={titleClass}>
              Update SandBox Image
            </Dialog.Title>

            <div className="font-medium mt-4">SandBox Image name</div>

            <input
              className={inputClass}
              placeholder="e.g. Environment 1"
              value={sandboxName}
              onChange={(e) => setSandboxName(e.target.value)}
            ></input>

            <div className="font-medium mt-4">Description</div>

            <textarea
              className={inputClass}
              placeholder="e.g. Environment 1 is about ..."
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
                    sandboxImage.imageId,
                    sub,
                    "root"
                  ); //non-existent template id
                  console.log(response);
                  if (response.success) {
                    setContainerID(response.containerID);
                  }
                }}
                className={okButtonClass}
              >
                Edit the IDE
              </button>

              <button
                onClick={async () => {
                  const response = await updateSandboxImage(
                    sandboxImage.id,
                    sandboxName,
                    description,
                    "",
                    userId
                  ); //non-existent template id
                  console.log(response);
                  if (response.success == true || response.success == false) {
                    window.location.reload();
                  }
                }}
                className={okButtonClass}
              >
                Finish
              </button>
            </div>
          </div>
        );
    }
  }
);
SandboxUpdate.displayName = "EnvironmentUpdate";
export default SandboxUpdate;
