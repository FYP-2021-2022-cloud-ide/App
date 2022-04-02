import { useCnails } from "../../contexts/cnails"
import { Environment } from "../../lib/cnails";
import { useInstructor } from "../../contexts/instructor"
import ModalForm from "../ModalForm/ModalForm"
import { CLICK_TO_REPORT } from "../../lib/constants";
import { errorToToastDescription } from "../../lib/errorHelper";
import myToast from "../CustomToast";
import { envAPI } from "../../lib/api/envAPI";
import { getValidName } from "../../lib/formHelper"
import { FormStructure } from "../ModalForm/types";



export type UpdateEnvironmentFormData = {
    update_environment: {
        // update_internal: string;
        name: string;
        description: string;
    };
};


type Props = {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    target: Environment
}

const UpdateEnvironmentForm = ({ isOpen, setOpen, target }: Props) => {
    const { sub } = useCnails();
    const { environments, sectionUserInfo, fetch } = useInstructor();
    const { updateEnvironment } = envAPI;
    const validName = getValidName(
        environments.map((env) => env.name),
        "Environment",
        0
    );
    return <ModalForm
        isOpen={isOpen}
        setOpen={setOpen}
        clickOutsideToClose
        escToClose
        formStructure={target ? {
            update_environment: {
                entries: {
                    // update_internal: {
                    //   type: "custom",
                    //   defaultValue: "",
                    //   label: "Update internal",
                    //   tooltip: "Open a temp workspace for you to update the environment.",
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
                    //                 update_environment: { name },
                    //               } = formData as UpdateEnvironmentFormData;
                    //               const response = await addTempContainer(
                    //                 memory,
                    //                 CPU,
                    //                 targetEnvironment.imageId,
                    //                 sub,
                    //                 "root",
                    //                 "ENV_UPDATE",
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
                        defaultValue: target.name,
                        label: "Name",
                        placeholder: `e.g. ${validName}`,
                        emptyValue: validName,
                        validate: (data) => {
                            if (
                                environments
                                    .map((e) => e.name)
                                    .filter((n) => n != target.name)
                                    .includes(data.update_environment.name)
                            )
                                return { ok: false, message: "Name crash" };
                            else return { ok: true };
                        },
                    },
                    description: {
                        type: "textarea",
                        defaultValue: target.description,
                        label: "Description",
                    },
                },
            },
        } as FormStructure<UpdateEnvironmentFormData> : {}}
        // onClose={async ({ update_environment: data }: UpdateEnvironmentFormData, isEnter) => {
        //     const { update_internal: containerId } = data;
        //     if (containerId != "" && !isEnter) {
        //         // remove the temp container
        //         const response = await removeTempContainer(containerId, sub);
        //         if (response.success)
        //             console.log("temp container is successfully removed.");
        //         else
        //             console.error("fail to remove temp container", containerId, sub);
        //         fetch();
        //     }
        // }}
        onEnter={async ({ update_environment: data }) => {
            const id = myToast.loading("Updating an environment...");
            const response = await updateEnvironment(
                {
                    envId: target.id,
                    name: data.name,
                    description: data.description,
                    section_user_id: sectionUserInfo.sectionUserId,
                    containerId: ""
                }
            );
            myToast.dismiss(id);
            if (response.success) {
                myToast.success("Environment is updated.");
            } else {
                myToast.error({
                    title: "Fail to update environment",
                    description: errorToToastDescription(response.error),
                    comment: CLICK_TO_REPORT,
                });
            }
            fetch();
        }}
        title="Update Environment"
    ></ModalForm>

}

export default UpdateEnvironmentForm