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
    const { environments, updateEnvironmentInfo: updateEnvironment } = useInstructor();
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
        onEnter={async ({ update_environment: data }) => {
            const { name, description } = data
            await updateEnvironment(target.id, name, description)
        }}
        title="Update Environment"
    ></ModalForm>

}

export default UpdateEnvironmentForm