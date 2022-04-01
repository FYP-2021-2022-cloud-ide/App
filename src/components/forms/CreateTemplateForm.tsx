import { Option } from "../ListBox"
import { useCnails } from "../../contexts/cnails"
import { useInstructor } from "../../contexts/instructor"
import ModalForm from "../ModalForm/ModalForm"
import myToast from "../CustomToast";
import { CPU, getEnvOptions, getValidName, memory } from "../../lib/formHelper"
import { containerAPI } from "../../lib/api/containerAPI";
import TempContainerToast from "../TempContainerToast"
import { templateAPI } from "../../lib/api/templateAPI";

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
    const { environments, templates, sectionUserInfo, fetch } = useInstructor()
    const { sub } = useCnails()
    const { addTempContainer } = containerAPI;
    const { addTemplate } = templateAPI;
    const envOptions = getEnvOptions(environments)
    const validName = getValidName(
        templates.map((t) => t.name),
        "Assignment Template"
    )
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
                            return (data as CreateTemplateFormData).create_template
                                .is_exam as boolean;
                        },
                    },
                },
            },
        }}
        title="Create Template"
        onEnter={async ({ create_template: data }: CreateTemplateFormData) => {
            const toastId = myToast.loading("Creating a temporary workspace...");
            var selectedEnv = data.environment;
            const response = await addTempContainer(
                memory,
                CPU,
                selectedEnv.imageId,
                sub,
                "root",
                "TEMPLATE_CREATE",
                data.name
            );
            myToast.dismiss(toastId);
            console.log(response);
            if (response.success) {
                const { containerID } = response;
                const customToastId = myToast.custom(
                    <TempContainerToast getToastId={() => customToastId} containerId={containerID} onOK={
                        async () => {
                            const id = myToast.loading("Building your template...");
                            const response = await addTemplate(
                                data.name as string,
                                data.description as string,
                                sectionUserInfo.sectionUserId,
                                data.environment.id,
                                "",
                                containerID,
                                false,
                                data.is_exam as boolean,
                                Number(data.time_limit),
                                data.allow_notification as boolean,
                                sectionUserInfo.sectionId
                            );
                            if (response.success) {
                                fetch();
                                myToast.dismiss(id);
                            }
                        }
                    } />,
                    "toaster toaster-custom toaster-no-dismiss",
                    "🗂"
                );
            }
        }}
    ></ModalForm>
}

export default CreateTemplateForm 