import React, { useState } from "react";
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




export const SandboxWrapper = () => {
  const { userId, containerQuota, containers, setContainers, sub, fetchContainers } =
    useCnails();
  const { sandboxImages, setSandboxImages, fetchSandboxImages, } = useSandbox();
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateTarget, setUpdateTarget] = useState<SandboxImage>();
  const {
    removeSandbox,
    removeSandboxImage,
    addSandbox
  } = sandboxAPI;
  const { addTempContainer } = containerAPI

  return (
    <>
      <SandboxImageList
        sandboxImages={sandboxImages}
        onCreateBtnClick={() => {
          setCreateOpen(true);
        }}
        onSandboxClick={(sandboxImage) => {
          if (sandboxImage.sandboxesId) {
            window.open(
              "https://codespace.ust.dev/user/container/" +
              sandboxImage.sandboxesId +
              "/"
            );
          }
        }}
        onSandboxDelete={async (sandboxImage) => {
          if (sandboxImage.sandboxesId) {
            myToast.error({
              title: "The workspace is still active. Fail to removed.",
              description:
                "You can need to stop your workspace first before removing it.",
              comment: "Click to dismiss",
            });
            return;
          }
          const id = myToast.loading(`Removing ${sandboxImage.title}...`);
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

          const response = await removeSandboxImage({
            sandboxId: sandboxImage.id,
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
          fetchSandboxImages();
        }}
        onSandboxUpdate={(sandbox) => {
          setUpdateOpen(true);
          setUpdateTarget(sandbox);
        }}
        onSandboxStart={async (sandboxImage) => {
          if (containers.length == containerQuota) {
            myToast.error({
              title: `You have met your simultaneous workspace quota. Fail to start workspace.`,
              description: `You can have at most ${containerQuota}`,
              comment: CLICK_TO_DISMISS,
            });
            return;
          }
          const id = myToast.loading(`Starting a workspace....`);
          // create a loading 
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
                isTemporary: false,
                data: {}
              }
            ]
          })
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
          await fetchSandboxImages();
          await fetchContainers();
        }}
        onSandboxStop={async (sandboxImage) => {
          const toastId = myToast.loading(`Stopping a workspace...`);
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
            fetchSandboxImages();
          } else {
            myToast.error({
              title: "Fail to stop workspace",
              description: errorToToastDescription(response.error),
              comment: CLICK_TO_REPORT,
            });
          }

        }}
        onSandboxUpdateInternal={async (sandboxImage) => {
          // give a toast 
          // const response = await addTempContainer(
          //   memory,
          //   CPU,
          //   sandboxImage.imageId,
          //   sub,
          //   "root",
          //   "SANDBOX_UPDATE"
          // );
        }}
      ></SandboxImageList>
      {/* create form */}
      <CreateSandboxForm isOpen={createOpen} setOpen={setCreateOpen} />
      {/* update form */}
      <UpdateSandboxForm isOpen={updateOpen && sandboxImages.length != 0} setOpen={setUpdateOpen} target={updateTarget} />
    </>
  );
};
