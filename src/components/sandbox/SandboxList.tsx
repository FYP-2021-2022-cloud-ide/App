import { CubeTransparentIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import Sandbox from "./Sandbox";
import EmptyDiv from "../EmptyDiv";
import { useState } from "react";
import Modal from "../Modal";
import SandboxCreate from "./SandboxCreate";
import { SandboxImage } from "../../lib/cnails";

type props = {
  sandboxImages: SandboxImage[];
};

const SandboxList = ({ sandboxImages }: props) => {
  let [isOpen, setIsOpen] = useState(false);
  const [memLimit, setmemLimit] = useState(300);
  const [numCPU, setnumCPU] = useState(1);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="flex flex-col justify-start w-full">
      <div className="text-gray-600 flex flex-row justify-start gap-x-4 pb-4 dark:text-gray-300">
        {/* <img src="/coursePage/workspacesLogo.svg"  className="" /> */}
        <CubeTransparentIcon className="w-7 h-7"></CubeTransparentIcon>
        <div className="text-lg ">Sandbox</div>
        <button onClick={openModal}>
          <PlusCircleIcon className="w-7 h-7 hover:scale-110 transition ease-in-out duration-300"></PlusCircleIcon>
        </button>
      </div>
      {sandboxImages?.length == 0 ? (
        <EmptyDiv message="There is no sandboxes yet."></EmptyDiv>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {sandboxImages.map((sandboxImage) => {
            return (
              // <></>
                <Sandbox memLimit={memLimit} numCPU={numCPU} sandboxImage={sandboxImage} />
            );
          })}
        </div>
      )}
      <Modal isOpen={isOpen} setOpen={setIsOpen}>
        <SandboxCreate
          memLimit={memLimit}
          numCPU={numCPU}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
};

export default SandboxList;
