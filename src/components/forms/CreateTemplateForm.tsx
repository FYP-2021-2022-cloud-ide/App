import { Option } from "../ListBox"
import { useCnails } from "../../contexts/cnails"
import { useInstructor } from "../../contexts/instructor"
import ModalForm from "../ModalForm/ModalForm"
import myToast from "../CustomToast";
import { CPU, getEnvOptions, getValidName, memory } from "../../lib/formHelper"
import { containerAPI } from "../../lib/api/containerAPI";
import TempContainerToast from "../TempContainerToast"
import { templateAPI } from "../../lib/api/templateAPI";
import { FormStructure } from "../ModalForm/types";
import { AddTemplateRequest, TemplateAddResponse } from "../../lib/api/api";
import { Template } from "../../lib/cnails";
import { errorToToastDescription } from "../../lib/errorHelper";
import { CLICK_TO_REPORT } from "../../lib/constants";

export type CreateTemplateFormData = {
    create_template: {
        environment: Option;
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
}

const CreateTemplateForm = ({ isOpen, setOpen }: Props) => {

    const { sub, fetchContainers, setContainers } = useCnails()
    const { environments, templates, sectionUserInfo, fetch, fetchTemplates } = useInstructor()
    const { addTempContainer } = containerAPI;
    const { addTemplate } = templateAPI;
    const envOptions = getEnvOptions(environments)
    const validName = getValidName(
        templates.map((t) => t.name),
        "Assignment Template"
    )
    const addCreatingWorkspace = (req: AddTemplateRequest) => {
        setContainers(containers => {
            return [
                ...containers,
                {
                    title: req.templateName,
                    status: "CREATING",
                    subTitle: "",
                    startAt: "",
                    containerID: "",
                    type: "SANDBOX",
                    isTemporary: true,
                    redisPatch: {
                        tempId: "",
                        cause: "TEMPLATE_CREATE",
                        containerId: "",
                        sourceId: "",
                        title: req.templateName,
                    }
                }
            ]
        })
    }


    return <ModalForm
        clickOutsideToClose
        escToClose
        isOpen={isOpen}
        setOpen={setOpen}
        formStructure={{
            create_template: {
                entries: {
                    environment: {
                        label: "Environment",
                        type: "listbox",
                        options: envOptions,
                        defaultValue: envOptions[0],
                    },
                    name: {
                        type: "input",
                        defaultValue: "",
                        label: "Name (Optional)",
                        placeholder: `e.g. ${validName}`,
                        emptyValue: validName,
                        validate: (data) => {
                            if (
                                templates.map((t) => t.name).includes(data.create_template.name)
                            )
                                return { ok: false, message: "Name crash" };
                            else return { ok: true };
                        },
                    },
                    description: {
                        type: "textarea",
                        placeholder: `e.g. ${validName} is about ...`,
                        defaultValue: "",
                        label: "Description (Optional)",
                    },
                    // schedule_publish: {
                    //   label: "Schedule publishig period",
                    //   description: "choose a date time period",
                    //   tooltip: "do something",
                    //   type: "datetime",
                    //   defaultValue: moment().format("YYYY-MM-DDTHH:mm"),
                    // },
                    allow_notification: {
                        type: "toggle",
                        defaultValue: false,
                        label: "Can students send question to You? ",
                        description: "Can students send question to You?",
                        tooltip:
                            "Student can send comment to you by highlighting the code, useful for real-time interaction in tutorials and laboraries.",
                    },
                    is_exam: {
                        type: "toggle",
                        defaultValue: false,
                        label: "Exam mode",
                        tooltip:
                            "You can restrict the time span of the container if the template is for an exam.",
                    },
                    time_limit: {
                        type: "input",
                        defaultValue: "60",
                        label: "Time Limit(in minutes) ",
                        description: "Time Limit of the exam",
                        conditional: (data) => {
                            return data.create_template
                                .is_exam;
                        },
                    },
                },
            },
        } as FormStructure<CreateTemplateFormData>}
        title="Create Template"
        onEnter={async ({ create_template: data }) => {
            const toastId = myToast.loading("Creating a temporary workspace...");
            const templateRequest: AddTemplateRequest = {
                templateName: data.name,
                description: data.description,
                section_user_id: sectionUserInfo.sectionUserId,
                environment_id: data.environment.id,
                assignment_config_id: "",
                containerId: "",
                active: false,
                isExam: data.is_exam,
                timeLimit: Number(data.time_limit),
                allow_notification: data.allow_notification,
            }
            addCreatingWorkspace(templateRequest)
            const response = await addTempContainer(
                {
                    memLimit: memory,
                    numCPU: CPU,
                    imageId: data.environment.imageId,
                    sub: sub,
                    accessRight: "root",
                    event: "TEMPLATE_CREATE",
                    title: data.name,
                    sourceId: "",
                    formData: templateRequest
                }
            );
            myToast.dismiss(toastId);
            await fetchContainers();
            if (response.success) {
                const { containerID } = response;
                const customToastId = myToast.custom(
                    <TempContainerToast
                        getToastId={() => customToastId}
                        containerId={containerID}
                        onOK={
                            async () => {
                                const id = myToast.loading("Building your template...");
                                const response = await addTemplate(
                                    {
                                        templateName: data.name,
                                        description: data.description,
                                        section_user_id: sectionUserInfo.sectionUserId,
                                        environment_id: data.environment.id,
                                        assignment_config_id: "",
                                        containerId: containerID,
                                        active: false,
                                        isExam: data.is_exam,
                                        timeLimit: Number(data.time_limit),
                                        allow_notification: data.allow_notification,
                                    }
                                );
                                if (response.success) {
                                    myToast.success("Template is created successfully");
                                } else {
                                    myToast.error({
                                        title: "Fail to create template",
                                        description: errorToToastDescription(response.error),
                                        comment: CLICK_TO_REPORT
                                    })
                                }
                                await fetchContainers()
                                await fetchTemplates()
                                myToast.dismiss(id);
                            }
                        } />,
                    "toaster toaster-custom toaster-no-dismiss",
                    "🗂"
                );
            } else {
                myToast.error({
                    title: "Fail to create temporary workspace",
                    description: errorToToastDescription(response.error),
                    comment: CLICK_TO_REPORT
                })
            }
        }}
    ></ModalForm>
}

export default CreateTemplateForm 