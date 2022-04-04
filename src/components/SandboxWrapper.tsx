import React, { useEffect, useState } from "react";
import { useCnails } from "../contexts/cnails";
import { sandboxAPI } from "../lib/api/sandboxAPI";
import { SandboxImage } from "../lib/cnails";
import myToast from "./CustomToast";
import SandboxImageList from "./SandboxImageList";
import { errorToToastDescription } from "../lib/errorHelper";
import {
  CPU,
  memory
} from "../lib/formHelper";
import { CLICK_TO_DISMISS, CLICK_TO_REPORT } from "../lib/constants";
import { useSandbox } from "../contexts/sandbox";
import CreateSandboxForm from "./forms/CreateSandboxForm";
import UpdateSandboxForm from "./forms/UpdateSandboxForm";
import { containerAPI } from "../lib/api/containerAPI";
import TempContainerToast from "./TempContainerToast";
import { useWarning } from "../contexts/warning";





export const SandboxWrapper = () => {
  const { userId, containerQuota, containers, setContainers, sub, fetchContainers } =
    useCnails();
  const { sandboxImages, setSandboxImages, fetchSandboxImages, } = useSandbox();
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateTarget, setUpdateTarget] = useState<SandboxImage>();
  const { waitForConfirm } = useWarning()
  const {
    removeSandbox,
    removeSandboxImage,
    addSandbox,
    updateSandboxImage
  } = sandboxAPI;
  const { addTempContainer } = containerAPI

  const changeSandboxToRemoving = (sandboxImage: SandboxImage) => {
    setSandboxImages(sandboxImages.map(s => {
      if (s.id == sandboxImage.id) {
        return {
          id: sandboxImage.id,
          title: sandboxImage.title,
          description: sandboxImage.description,
          imageId: sandboxImage.imageId,
          sandboxesId: sandboxImage.sandboxesId,
          status: "REMOVING"
        }
      } else return s
    }))
  }
  const addCreatingWorkspace = (sandboxImage: SandboxImage, event: "SANDBOX_START_WORKSPACE" | "SANDBOX_UPDATE" | "SANDBOX_CREATE") => {
    setContainers(containers => {
      return [
        ...containers,
        {
          title: sandboxImage.title,
          status: "CREATING",
          subTitle: "",
          startAt: "",
          containerID: "",
          type: "SANDBOX",
          isTemporary: event != "SANDBOX_START_WORKSPACE",
          redisPatch: {
            tempId: "",
            cause: event,
            containerId: "",
            sourceId: sandboxImage.id,
            title: sandboxImage.title,
          }
        }
      ]
    })
  }
  const changeContainerToRemoving = (sandboxImage: SandboxImage) => {
    setContainers(containers => {
      return containers.map(container => {
        if (container.redisPatch.cause == "SANDBOX_START_WORKSPACE" && container.containerID == sandboxImage.sandboxesId) {
          return {
            ...container,
            status: "REMOVING"
          }
        } else return container
      })
    })
  }

  useEffect(() => {
    console.log(sandboxImages)
  })
  return (
    <>
      <SandboxImageList
        sandboxImages={sandboxImages}
        onCreateBtnClick={() => {
          setCreateOpen(true);
        }}
        menuItems={(sandboxImage) => {
          const menuItems = [
            {
              text: "Update Info",
              onClick: () => {
                setUpdateOpen(true);
                setUpdateTarget(sandboxImage);
              }
            }, {
              text: sandboxImage.sandboxesId ? "Stop workspace" : "Start workspace",
              onClick: async () => {
                if (!sandboxImage.sandboxesId) {
                  //start 
                  if (containers.length == containerQuota) {
                    myToast.error({
                      title: `You have met your simultaneous workspace quota. Fail to start workspace.`,
                      description: `You can have at most ${containerQuota}`,
                      comment: CLICK_TO_DISMISS,
                    });
                    return;
                  }
                  const id = myToast.loading(`Starting a workspace....`);
                  addCreatingWorkspace(sandboxImage, "SANDBOX_START_WORKSPACE")
                  const response = await addSandbox({
                    memLimit: memory,
                    numCPU: CPU,
                    sandboxImageId: sandboxImage.id,
                    title: sandboxImage.title,
                    sub: sub
                  });
                  myToast.dismiss(id);
                  if (response.success) {
                    myToast.success(
                      `Workspace ${sandboxImage.title} is successfully started.`
                    );
                  } else {
                    myToast.error({
                      title: "Fail to start workspace",
                      description: errorToToastDescription(response.error),
                      comment: CLICK_TO_REPORT,
                    });
                  }
                  await fetchContainers();
                } else {
                  // stop 
                  const toastId = myToast.loading(`Stopping a workspace...`);
                  changeContainerToRemoving(sandboxImage)
                  const response = await removeSandbox(
                    {
                      sandboxId: sandboxImage.sandboxesId,
                      userId: userId
                    }
                  );
                  myToast.dismiss(toastId);
                  if (response.success) {
                    myToast.success(
                      `Workspace ${sandboxImage.title} is successfully stopped.`
                    );
                  } else {
                    myToast.error({
                      title: "Fail to stop workspace",
                      description: errorToToastDescription(response.error),
                      comment: CLICK_TO_REPORT,
                    });
                  }
                  await fetchContainers()
                }
              }
            },
            {
              text: "Delete",
              onClick: async () => {
                if (sandboxImage.sandboxesId) {
                  myToast.error({
                    title: "The workspace is still active. Fail to removed.",
                    description:
                      "You can need to stop your workspace first before removing it.",
                    comment: "Click to dismiss",
                  });
                  return;
                }
                if (await waitForConfirm("Are you sure that you want to delete this personal workspace? The action cannot be undo. ") == false) return
                const id = myToast.loading(`Removing ${sandboxImage.title}...`);
                changeSandboxToRemoving(sandboxImage)
                const response = await removeSandboxImage({
                  sandboxImageId: sandboxImage.id,
                  userId: userId
                });
                myToast.dismiss(id);
                if (response.success) {
                  myToast.success(
                    `Workspace (${sandboxImage.title}) is successfully removed.`
                  );
                } else {
                  myToast.error({
                    title: `Fail to remove workspace (${sandboxImage.title})`,
                    description: errorToToastDescription(response.error),
                  });
                }
                await fetchSandboxImages();
              }
            },
          ]
          if (sandboxImage.status != "UPDATING_INTERNAL")
            menuItems.push({
              text: "Update Internal",
              onClick: async () => {
                const id = myToast.loading("Creating a temporary workspace...")
                addCreatingWorkspace(sandboxImage, "SANDBOX_UPDATE")
                const response = await addTempContainer({
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
                    userId: userId
                  }
                })
                myToast.dismiss(id)
                await fetchContainers()
                if (response.success) {
                  const containerId = response.containerID
                  const id = myToast.custom(
                    <TempContainerToast
                      containerId={containerId}
                      getToastId={() => id}
                      onCancel={async () => {
                        return await waitForConfirm("Are you sure that you want to cancel the commit. All your changes in the workspace will not be saved and personal workspace will not be updated.")
                      }}
                      onOK={async () => {
                        const response = await updateSandboxImage(
                          {
                            sandboxImageId: sandboxImage.id,
                            title: sandboxImage.title,
                            description: sandboxImage.description,
                            tempContainerId: containerId,
                            userId: userId
                          }
                        )
                        if (response.success)
                          myToast.success("workspace is successfully updated.");
                        else
                          myToast.error({
                            title: "Fail to update workspace",
                            description: errorToToastDescription(response.error),
                            comment: CLICK_TO_REPORT,
                          });
                        await fetchContainers()
                        await fetchSandboxImages()
                        myToast.dismiss(id);
                      }}
                    ></TempContainerToast>,
                    "toaster toaster-custom toaster-no-dismiss",
                    "🗂"
                  )
                } else {
                  myToast.error({
                    title: "Fail to create temporary workspace",
                    description: errorToToastDescription(response.error),
                    comment: CLICK_TO_REPORT
                  })
                }
              }
            })
          return menuItems
        }}
      ></SandboxImageList>
      {/* create form */}
      <CreateSandboxForm isOpen={createOpen} setOpen={setCreateOpen} />
      {/* update form */}
      <UpdateSandboxForm isOpen={updateOpen && sandboxImages.length != 0} setOpen={setUpdateOpen} target={updateTarget} />
    </>
  );
};
