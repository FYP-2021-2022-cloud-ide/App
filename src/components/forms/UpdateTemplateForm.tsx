import { Template } from "../../lib/cnails";
import { Option } from "../ListBox"
import { useCnails } from "../../contexts/cnails"
import { useInstructor } from "../../contexts/instructor"
import ModalForm from "../ModalForm/ModalForm"
import myToast from "../CustomToast";
import { CPU, getEnvOptions, getValidName, memory } from "../../lib/formHelper"
import { containerAPI } from "../../lib/api/containerAPI";
import TempContainerToast from "../TempContainerToast"
import { templateAPI } from "../../lib/api/templateAPI";
import { errorToToastDescription } from "../../lib/errorHelper";
import { CLICK_TO_REPORT } from "../../lib/constants";
import { FormStructure } from "../ModalForm/types";

export type UpdateTemplateFormData = {
    update_template: {
        // update_internal: string;
        name: string;
        description: string;
        allow_notification: boolean;
        is_exam: boolean;
        time_limit: string;
    };
};


export type Props = {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    target: Template;
}

const UpdateTemplateForm = ({ isOpen, setOpen, target }: Props) => {
    const { sub } = useCnails()
    const { templates, fetch, sectionUserInfo } = useInstructor();
    const { updateTemplate } = templateAPI
    const validName = getValidName(
        templates.map((t) => t.name),
        "Assignment Template",
        0
    );
    return <ModalForm
        isOpen={isOpen}
        clickOutsideToClose
        escToClose
        setOpen={setOpen}
        // if the target is empty , the form is empty 
        formStructure={target ? {
            update_template: {
                entries: {
                    // update_internal: {
                    //   type: "custom",
                    //   defaultValue: "",
                    //   label: "Update internal",
                    //   tooltip: "Open a temp workspace for you to update the template.",
                    //   validate: (data) => {
                    //     if (
                    //       (data as UpdateTemplateFormData).update_template
                    //         .update_internal == "loading"
                    //     ) {
                    //       return {
                    //         ok: false,
                    //         message: "temporary workspace is creating...",
                    //       };
                    //     } else {
                    //       return { ok: true };
                    //     }
                    //   },
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
                    //               onChange("loading");
                    //               const {
                    //                 update_template: { name },
                    //               } = formData as UpdateTemplateFormData;
                    //               const response = await addTempContainer(
                    //                 memory,
                    //                 CPU,
                    //                 target.imageId,
                    //                 sub,
                    //                 "root",
                    //                 "TEMPLATE_UPDATE",
                    //                 name
                    //               );
                    //               console.log(response);
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
                    //                     "Fail to remove temporary workspace for this template",
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
                        label: "Name (Optional)",
                        placeholder: `e.g. ${validName}`,
                        emptyValue: validName,
                        validate: (data) => {
                            if (
                                templates
                                    .map((t) => t.name)
                                    .filter((n) => n != target.name)
                                    .includes(data.update_template.name)
                            )
                                return { ok: false, message: "Name crash" };
                            else return { ok: true };
                        },
                    },
                    description: {
                        type: "textarea",
                        placeholder: "e.g. The assignment is about ...",
                        defaultValue: target.description,
                        label: "Description (Optional)",
                    },
                    allow_notification: {
                        type: "toggle",
                        defaultValue: target.allow_notification,
                        label: "Can students send question to You? ",
                        description: "Can students send question to You?",
                        tooltip:
                            "Student can send comment to you by highlighting the code, useful for real-time interaction in tutorials.",
                    },
                    is_exam: {
                        type: "toggle",
                        defaultValue: target.isExam,
                        label: "Exam mode",
                        description: "whether this assignment is an exam",
                        tooltip:
                            "Whether this assignment is an exam. The environment would be restricted to simple editors without compliers.",
                    },
                    time_limit: {
                        type: "input",
                        defaultValue: String(target.timeLimit),
                        label: "Time Limit(in minutes) ",
                        description: "Time Limit of the exam",
                        conditional: (data) => {
                            return (data as UpdateTemplateFormData).update_template.is_exam;
                        },
                    },
                },
            },
        } as FormStructure<UpdateTemplateFormData> : {}}
        title="Update Template"
        // onClose={async ({ update_template: data }: UpdateTemplateFormData, isEnter) => {
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
        onEnter={async ({ update_template: data }) => {
            const id = myToast.loading("Updating the template...");
            const {
                name,
                description,
                allow_notification,
                time_limit,
                is_exam,
            } = data;

            const response = await updateTemplate(
                target.id,
                name,
                description,
                sectionUserInfo.sectionUserId,
                "",
                is_exam,
                Number(time_limit),
                allow_notification,
                sectionUserInfo.sectionId
            );
            myToast.dismiss(id);
            if (response.success) {
                myToast.success("Template is updated.");
            } else {
                myToast.error({
                    title: "Fail to update template",
                    description: errorToToastDescription(response.error),
                    comment: CLICK_TO_REPORT,
                });
            }
            fetch();
        }}
    ></ModalForm>
}
export default UpdateTemplateForm 
