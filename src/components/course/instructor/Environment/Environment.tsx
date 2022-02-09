import React, { useState, useRef } from "react";
import Menu from "../../CardMenu";
import { EnvironmentContent } from "./EnvironmentList";
import { useCnails } from "../../../../contexts/cnails";
import Modal from "../../../Modal";
import EnvironmentUpdate from "./EnvironmentUpdate";
import { envAPI } from "../../../../lib/envAPI";

interface EnvironmentProps {
  sectionUserID: string;
  environment: EnvironmentContent;
  onDelete?: (environment: EnvironmentContent) => void;
  onUpdate?: (environment: EnvironmentContent) => void;
}

function Environment({
  environment,
  sectionUserID,
  onDelete,
  onUpdate,
}: EnvironmentProps) {
  // const { removeEnvironment} = useCnails();
  const { removeEnvironment } = envAPI;
  let [updateOpen, setUpdateOpen] = useState(false);
  let ref = useRef();

  return (
    <div className="border broder-gray-200 dark:border-gray-700 shadow-sm rounded-lg bg-white dark:bg-gray-600 px-4 py-4 min-h-36 h-36 flex flex-row items-start justify-between">
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="font-semibold text-sm text-gray-600 dark:text-gray-300 text-left">
            {environment.environmentName}
          </div>
          <div className="font-medium text-xs text-gray-600 dark:text-gray-300 text-left">
            {environment.libraries}
          </div>
          <div className="font-medium text-xs text-gray-400">
            {environment.imageId}
          </div>
        </div>
        <div className="font-medium text-xs text-gray-400">
          {environment.description}
        </div>
      </div>
      <Menu
        items={[
          {
            text: "delete",
            //   onClick: async () => {
            //     const response = await removeEnvironment(
            //       environment.id,
            //       sectionUserID
            //     );
            //     console.log(response);
            //     window.location.reload();
            //   },
            onClick: () => {
              if (onDelete) {
                onDelete(environment);
              }
            },
          },
          {
            text: "update",
            onClick: () => {
              if (onUpdate) {
                onUpdate(environment);
              }
            },
          },
        ]}
      ></Menu>
      {/* <Modal isOpen={updateOpen} setOpen={setUpdateOpen}>
        <EnvironmentUpdate
          closeModal={() => setUpdateOpen(false)}
          environment={environment}
          ref={ref}
          sectionUserID={sectionUserID}
        />
      </Modal> */}
    </div>
  );
}

export default Environment;
