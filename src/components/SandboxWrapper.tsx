import React, { useEffect, useRef, useState } from "react";
import { useCnails } from "../contexts/cnails";
import { sandboxAPI } from "../lib/api/sandboxAPI";
import { SandboxImage } from "../lib/cnails";
import myToast from "./CustomToast";
import ModalForm from "./ModalForm/ModalForm";
import SandboxImageList from "./SandboxImageList";
import { containerAPI } from "../lib/api/containerAPI";
import { Option } from "./ListBox";
import { Error, SuccessStringResponse } from "../lib/api/api";
import { errorToToastDescription } from "../lib/errorHelper";
import {
  getCreateSandboxFormStructure,
  CreateSandboxFormData,
  UpdateSandboxFormData,
  getUpdateSandboxFormStructure,
  CPU,
  memory
} from "../lib/forms";
import { CLICK_TO_DISMISS, CLICK_TO_REPORT } from "../lib/constants";
import { useCancelablePromise } from "./useCancelablePromise";




export const SandboxWrapper = () => {
  const { sub, userId, fetchContainers, containerQuota, containers, setContainers } =
    useCnails();
  const [sandboxImages, setSandboxImages] = useState<SandboxImage[]>();
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateTarget, setUpdateTarget] = useState<SandboxImage>();
  const { cancelablePromise } = useCancelablePromise()
  const {
    addSandboxImage,
    removeSandbox,
    removeSandboxImage,
    addSandbox,
    updateSandboxImage,
    listSandboxImage
  } = sandboxAPI;
  const { removeTempContainer } = containerAPI;

  async function fetchSandboxes() {
    const response = await listSandboxImage(userId);
    if (response.success) {
      setSandboxImages(response.sandboxImages);
    } else {
      myToast.error({
        title: "Personal workspaces cannot be fetched",
        description: errorToToastDescription(response.error),
      });
    }
  }

  useEffect(() => {
    fetchSandboxes()
  }, [containers])

  // if environments or templates has not fetch, don't need to go down
  if (!sandboxImages) return <></>;

  const createFormStructure = getCreateSandboxFormStructure(sandboxImages);

  //one more button for just changing the  title / description, not calling tempContainer
  const updateFormStructure = getUpdateSandboxFormStructure(
    sub,
    updateTarget,
    sandboxImages
  );

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

          const response = await removeSandboxImage(sandboxImage.id, userId);
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
          fetchSandboxes();
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
                sourceId: sandboxImage.id,
                isTemporary: false,
              }
            ]
          })
          const response = await addSandbox(memory, CPU, sandboxImage.id, sandboxImage.title);
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
          await fetchSandboxes();
        }}
        onSandboxStop={async (sandboxImage) => {
          const toastId = myToast.loading(`Stopping a workspace...`);
          const response = await removeSandbox(
            sandboxImage.sandboxesId,
            userId
          );
          myToast.dismiss(toastId);
          if (response.success) {
            myToast.success(
              `Workspace ${sandboxImage.title} is successfully stopped.`
            );
            fetchSandboxes();
          } else {
            myToast.error({
              title: "Fail to stop workspace",
              description: errorToToastDescription(response.error),
              comment: CLICK_TO_REPORT,
            });
          }
        }}
      ></SandboxImageList>
      {/* create form */}
      <ModalForm
        isOpen={createOpen}
        setOpen={setCreateOpen}
        clickOutsideToClose
        escToClose
        title="Create Personal Workspace"
        formStructure={createFormStructure}
        onEnter={async ({ create_sandbox: data }: CreateSandboxFormData) => {
          const environment = data.environment_choice as Option;
          const toastId = myToast.loading("Creating a personal workspace...");
          // set status in UI 
          setSandboxImages([...sandboxImages, {
            id: "",
            title: data.name,
            description: data.description,
            imageId: environment.imageId,
            sandboxesId: "",
            status: "CREATING"
          }])
          try {
            const response = await cancelablePromise(addSandboxImage(
              data.description as string,
              environment.imageId,
              data.name as string,
              userId
            ))
            if (response.success) {
              const { sandboxImageId } = response;
              myToast.success(`Workspace is successfully created.`);
            } else {
              // myToast.dismiss(toastId);
              myToast.error({
                title: "Fail to create workspace",
                description: errorToToastDescription(response.error),
                comment: CLICK_TO_REPORT,
              });
            }
            await fetchSandboxes()

          } catch (error) {
            if (!error.isCanceled)
              console.error(error)
          }
          myToast.dismiss(toastId);
        }}
      ></ModalForm>
      {/* update form */}
      {
        updateTarget && (
          <ModalForm
            isOpen={updateOpen}
            setOpen={setUpdateOpen}
            title={"Update Workspace"}
            clickOutsideToClose
            escToClose
            formStructure={updateFormStructure}
            onClose={async ({ update_sandbox: data }: UpdateSandboxFormData, isEnter) => {
              if (data.update_environment != "" && !isEnter) {
                const containerId = data.update_environment;
                if (containerId == "") return
                // change the temp container to REMOVING
                // setContainers(containers => [
                //   ...containers,
                //   {
                //     title: data.name,
                //     subTitle: "",
                //     type: "SANDBOX",
                //     isTemporary: true,
                //     status: "REMOVING"
                //   }
                // ])
                // remove set the request to remove

                // fetch containers 
                const response = await removeTempContainer(containerId, sub);
                if (response.success) {
                  console.log(
                    "temp container is removed successfully.",
                    containerId
                  );
                } else {
                  console.error("Fail to remove temp container.", containerId);
                }
              }
            }}
            onEnter={async ({ update_sandbox: data }: UpdateSandboxFormData) => {
              // call some API here
              const id = myToast.loading("Updating a workspace...");
              const { name, description, update_environment: containerId } = data;


              // set status in UI
              setSandboxImages(sandboxImages.map(sandboxImage => {
                if (updateTarget.id == sandboxImage.id) {
                  return {
                    id: updateTarget.id,
                    title: name,
                    description: description,
                    imageId: "",
                    sandboxesId: "",
                    status: "UPDATING"
                  }
                } else return sandboxImage
              }))

              const showToast = (response: SuccessStringResponse) => {
                if (response.success)
                  myToast.success("workspace is successfully updated.");
                else
                  myToast.error({
                    title: "Fail to update workspace",
                    description: errorToToastDescription(response.error),
                    comment: CLICK_TO_REPORT,
                  });
              }
              try {
                let response = await cancelablePromise<SuccessStringResponse>(new Promise(async resolve => {
                  const wait = () => new Promise(resolve => {
                    setTimeout(resolve, 10000)
                  })
                  await wait()
                  resolve(await updateSandboxImage(
                    updateTarget.id,
                    name,
                    description,
                    containerId,
                    userId
                  ))
                }))
                showToast(response)
                await fetchSandboxes()
              } catch (error) {
                if (!error.isCanceled) {
                  console.error(error)
                } else {
                  showToast(error.value)
                }
              }
              myToast.dismiss(id);
            }}
          ></ModalForm>
        )
      }
    </>
  );
};
