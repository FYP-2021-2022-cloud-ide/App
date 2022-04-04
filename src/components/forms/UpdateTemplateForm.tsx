import { Template } from "../../lib/cnails";
import { useInstructor } from "../../contexts/instructor"
import ModalForm from "../ModalForm/ModalForm"
import { getValidName } from "../../lib/formHelper"
import { FormStructure } from "../ModalForm/types";

export type UpdateTemplateFormData = {
    update_template: {
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
    const { templates, updateTemplateInfo } = useInstructor();
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
                            return data.update_template.is_exam;
                        },
                        validate: (data) => {
                            return Number(data.update_template.time_limit) > 0 ? { ok: true } : { ok: false, message: "Time limit must be positive." }
                        }
                    },
                },
            },
        } as FormStructure<UpdateTemplateFormData> : {}}
        title="Update Template"
        onEnter={async ({ update_template: data }) => {

            const {
                name,
                description,
                allow_notification,
                time_limit,
                is_exam,
            } = data;
            await updateTemplateInfo(target.id, name, description, is_exam, Number(time_limit), allow_notification)
        }}
    ></ModalForm>
}
export default UpdateTemplateForm 
