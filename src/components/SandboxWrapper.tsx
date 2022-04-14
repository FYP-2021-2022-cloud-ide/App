import React, { useEffect, useState } from "react";
import { useCnails } from "../contexts/cnails";
import { sandboxAPI } from "../lib/api/sandboxAPI";
import { SandboxImage } from "../lib/cnails";
import myToast from "./CustomToast";
import SandboxImageList from "./SandboxImageList";
import { errorToToastDescription } from "../lib/errorHelper";
import { CPU, memory } from "../lib/formHelper";
import { CLICK_TO_DISMISS, CLICK_TO_REPORT } from "../lib/constants";
import { useSandbox } from "../contexts/sandbox";
import CreateSandboxForm from "./forms/CreateSandboxForm";
import UpdateSandboxForm from "./forms/UpdateSandboxForm";
import { containerAPI } from "../lib/api/containerAPI";
import TempContainerToast from "./TempContainerToast";
import { useWarning } from "../contexts/warning";
import { useContainers } from "../contexts/containers";

export const SandboxWrapper = () => {
  const { userId, sub } = useCnails();
  const { createContainer, removeContainer } = useContainers();
  const { sandboxImages, updateSandboxImageInternal, removeSandboxImage } =
    useSandbox();

  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateTarget, setUpdateTarget] = useState<SandboxImage>();
  const { waitForConfirm } = useWarning();

  return (
    <>
      <SandboxImageList
        sandboxImages={sandboxImages}
        onCreateBtnClick={() => {
          setCreateOpen(true);
        }}
        menuItems={(sandboxImage) => [
          {
            text: "Update Info",
            onClick: () => {
              setUpdateOpen(true);
              setUpdateTarget(sandboxImage);
            },
            show: !Boolean(sandboxImage.containerId),
          },
          {
            text: sandboxImage.containerId
              ? "Stop workspace"
              : "Start workspace",
            onClick: async () => {
              if (!sandboxImage.containerId)
                await createContainer({
                  event: "SANDBOX_START_WORKSPACE",
                  memLimit: memory,
                  numCPU: CPU,
                  sandboxImageId: sandboxImage.id,
                  title: sandboxImage.title,
                  sub: sub,
                });
              else await removeContainer(sandboxImage.containerId);
            },
          },
          {
            text: "Delete",
            onClick: async () => {
              await removeSandboxImage(sandboxImage.id);
            },
            show: !Boolean(sandboxImage.containerId),
          },
          {
            text: "Update Internal",
            show: !Boolean(sandboxImage.containerId),
            onClick: async () => {
              await createContainer(
                {
                  memLimit: 0,
                  numCPU: 0,
                  imageId: sandboxImage.imageId,
                  sub: sub,
                  accessRight: "root",
                  title: sandboxImage.title,
                  event: "SANDBOX_UPDATE",
                  sourceId: sandboxImage.id,
                  formData: {
                    sandboxImageId: sandboxImage.id,
                    title: sandboxImage.title,
                    description: sandboxImage.description,
                    tempContainerId: "",
                    userId: userId,
                  },
                },
                "nothing"
                // (containerId) => {
                //   const id = myToast.custom(
                //     <TempContainerToast
                //       containerId={containerId}
                //       getToastId={() => id}
                //       onCancel={async () => {
                //         return await waitForConfirm(
                //           "Are you sure that you want to cancel the commit. All your changes in the workspace will not be saved and personal workspace will not be updated."
                //         );
                //       }}
                //       onOK={async () => {
                //         await updateSandboxImageInternal(
                //           sandboxImage.id,
                //           containerId
                //         );
                //       }}
                //     ></TempContainerToast>,
                //     {
                //       className: "toaster toaster-temp-container ",
                //       icon: "🗂",
                //       id: containerId,
                //       duration: 99999 * 86400,
                //     },
                //     undefined,
                //     false
                //   );
                // }
              );
            },
          },
        ]}
      ></SandboxImageList>
      {/* create form */}
      <CreateSandboxForm isOpen={createOpen} setOpen={setCreateOpen} />
      {/* update form */}
      <UpdateSandboxForm
        isOpen={updateOpen && sandboxImages.length != 0}
        setOpen={setUpdateOpen}
        target={updateTarget}
      />
    </>
  );
};
