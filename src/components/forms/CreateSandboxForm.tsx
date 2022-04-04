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


export type CreateSandboxFormData = {
    create_sandbox: {
        environment_choice: Option;
        name: string;
        description: string;
    };
};


export type Props = {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSandboxForm = ({ isOpen, setOpen }: Props) => {
    const { userId } = useCnails();
    const { sandboxImages, setSandboxImages, fetchSandboxImages } = useSandbox();
    const { addSandboxImage } = sandboxAPI;
    const validName = getValidName(
        sandboxImages.map((s) => s.title),
        "Personal workspace"
    );
    return <ModalForm
        isOpen={isOpen}
        setOpen={setOpen}
        clickOutsideToClose
        escToClose
        title="Create Personal Workspace"
        formStructure={{
            create_sandbox: {
                entries: {
                    environment_choice: {
                        type: "listbox",
                        defaultValue: envChoices[0],
                        label: "Pick the Programming Language",
                        options: envChoices,
                    },
                    name: {
                        type: "input",
                        defaultValue: "",
                        placeholder: `e.g. ${validName}`,
                        emptyValue: validName,
                        label: "Name (Optional)",
                        validate: (data) => {
                            if (
                                sandboxImages
                                    .map((s) => s.title)
                                    .includes(data.create_sandbox.name)
                            )
                                return { ok: false, message: "Name crash" };
                            return { ok: true };
                        },
                    },
                    description: {
                        type: "textarea",
                        defaultValue: "",
                        placeholder: "e.g. This workspace is about ...",
                        label: "Description (Optional)",
                    },
                },
            },
        } as FormStructure<CreateSandboxFormData>}
        onEnter={async ({ create_sandbox: data }) => {
            const environment = data.environment_choice;
            const toastId = myToast.loading("Creating a personal workspace...");
            // set status in UI 
            setSandboxImages([...sandboxImages, {
                id: "",
                title: data.name,
                description: data.description,
                imageId: environment.imageId,
                containerId: "",
                status: "CREATING"
            }])
            const response = await addSandboxImage(
                {
                    description: data.description,
                    imageId: environment.imageId,
                    title: data.name,
                    userId: userId
                }
            )
            if (response.success) {
                myToast.success(`Workspace is successfully created.`);
            } else {
                // myToast.dismiss(toastId);
                myToast.error({
                    title: "Fail to create workspace",
                    description: errorToToastDescription(response.error),
                    comment: CLICK_TO_REPORT,
                });
            }
            await fetchSandboxImages()
            myToast.dismiss(toastId);
        }}
    ></ModalForm>
}

export default CreateSandboxForm