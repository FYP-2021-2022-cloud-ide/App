import { SandboxImage } from "../../lib/cnails";
import { Option } from "../ListBox"
import { useCnails } from "../../contexts/cnails"
import ModalForm from "../ModalForm/ModalForm"
import myToast from "../CustomToast";
import { envChoices, getValidName } from "../../lib/formHelper"
import { CLICK_TO_REPORT } from "../../lib/constants";
import { errorToToastDescription } from "../../lib/errorHelper";
import React from "react";
import { useSandbox } from "../../contexts/sandbox";
import { sandboxAPI } from "../../lib/api/sandboxAPI";
import { FormStructure } from "../ModalForm/types";


export type UpdateSandboxFormData = {
    update_sandbox: {
        // update_environment: string;
        name: string;
        description: string;
    };
};

export type Props = {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    target: SandboxImage
}


const UpdateSandboxForm = ({ isOpen, setOpen, target }: Props) => {
    const { sandboxImages, setSandboxImages, fetchSandboxImages } = useSandbox();
    const { userId } = useCnails();
    const { updateSandboxImage } = sandboxAPI;
    const validName = getValidName(
        sandboxImages.map((s) => s.title),
        "Personal workspace",
        0
    );
    return <ModalForm
        isOpen={isOpen}
        setOpen={setOpen}
        title={"Update Workspace"}
        clickOutsideToClose
        escToClose
        formStructure={target ? {
            update_sandbox: {
                entries: {
                    // update_environment: {
                    //   type: "custom",
                    //   label: "Update Environment",
                    //   defaultValue: "",
                    //   tooltip:
                    //     "If you need to update the environment of your workspace, click the button below. You will be prompt to a temporary environment to set up your workspace.",
                    //   node: (onChange, currentValue, formData) => {
                    //     const { addTempContainer } = containerAPI;
                    //     return (
                    //       <div>
                    //         {currentValue != "" ? (
                    //           <a
                    //             className="text-xs text-blue-500 underline justify-center"
                    //             href={
                    //               "https://codespace.ust.dev/user/container/" +
                    //               currentValue +
                    //               "/"
                    //             }
                    //             target="_blank"
                    //             rel="noreferrer"
                    //           >
                    //             Go to temp workspace
                    //           </a>
                    //         ) : (
                    //           <button
                    //             className="btn btn-wide btn-sm dark:btn-primary"
                    //             onClick={async (e) => {
                    //               const btn = e.currentTarget;
                    //               btn.classList.add("loading");
                    //               btn.textContent = "Loading";
                    //               const {
                    //                 update_sandbox: { name },
                    //               } = formData as UpdateSandboxFormData;
                    //               const response = await addTempContainer(
                    //                 memory,
                    //                 CPU,
                    //                 target.imageId,
                    //                 sub,
                    //                 "root",
                    //                 "SANDBOX_UPDATE",
                    //                 name
                    //               );
                    //               btn.classList.remove("loading");
                    //               btn.textContent = "Click me";
                    //               if (response.success) {
                    //                 const link =
                    //                   "https://codespace.ust.dev/user/container/" +
                    //                   response.containerID +
                    //                   "/";

                    //                 window.open(link);
                    //                 onChange(response.containerID);
                    //               } else
                    //                 myToast.error({
                    //                   title:
                    //                     "Fail to start temporary workspace for this environment.",
                    //                   description: errorToToastDescription(response.error),
                    //                   comment: CLICK_TO_REPORT,
                    //                 });
                    //             }}
                    //           >
                    //             Click me
                    //           </button>
                    //         )}
                    //       </div>
                    //     );
                    //   },
                    // },
                    name: {
                        type: "input",
                        defaultValue: target?.title,
                        placeholder: `e.g. ${validName}`,
                        emptyValue: validName,
                        label: "Name (Optional)",
                        validate: (data) => {
                            if (
                                sandboxImages
                                    .map((s) => s.title)
                                    .filter((n) => n != target.title)
                                    .includes(data.update_sandbox.name)
                            )
                                return { ok: false, message: "Name crash" };
                            return { ok: true };
                        },
                    },
                    description: {
                        type: "textarea",
                        defaultValue: target?.description,
                        placeholder: "e.g. This workspace is about ...",
                        label: "Description (Optional)",
                    },
                },
            },
        } as FormStructure<UpdateSandboxFormData> : {}}
        // onClose={async ({ update_sandbox: data }: UpdateSandboxFormData, isEnter) => {
        //   if (data.update_environment != "" && !isEnter) {
        //     const containerId = data.update_environment;
        //     if (containerId == "") return
        //     // change the temp container to REMOVING
        //     // setContainers(containers => [
        //     //   ...containers,
        //     //   {
        //     //     title: data.name,
        //     //     subTitle: "",
        //     //     type: "SANDBOX",
        //     //     isTemporary: true,
        //     //     status: "REMOVING"
        //     //   }
        //     // ])
        //     // remove set the request to remove

        //     // fetch containers 
        //     const response = await removeTempContainer(containerId, sub);
        //     if (response.success) {
        //       console.log(
        //         "temp container is removed successfully.",
        //         containerId
        //       );
        //     } else {
        //       console.error("Fail to remove temp container.", containerId);
        //     }
        //   }
        // }}
        onEnter={async ({ update_sandbox: data }) => {
            // call some API here
            const id = myToast.loading("Updating a workspace...");
            const { name, description } = data;


            // set status in UI
            setSandboxImages(sandboxImages.map(sandboxImage => {
                if (target.id == sandboxImage.id) {
                    return {
                        id: target.id,
                        title: name,
                        description: description,
                        imageId: "",
                        sandboxesId: "",
                        status: "UPDATING"
                    }
                } else return sandboxImage
            }))

            const response = await updateSandboxImage(
                {
                    sandboxImageId: target.id,
                    title: data.name,
                    description: data.description,
                    tempContainerId: "",
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
            await fetchSandboxImages()
            myToast.dismiss(id);
        }}
    ></ModalForm>
}

export default UpdateSandboxForm