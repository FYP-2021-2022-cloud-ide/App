import { CPU, envChoices, getValidName, memory, rootImage } from "../../lib/formHelper"
import { Option } from "../ListBox";
import ModalForm from "../ModalForm/ModalForm"
import { useInstructor } from "../../contexts/instructor"
import myToast from "../CustomToast";
import { containerAPI } from "../../lib/api/containerAPI";
import { envAPI } from "../../lib/api/envAPI";
import { CLICK_TO_REPORT } from "../../lib/constants";
import { errorToToastDescription } from "../../lib/errorHelper";
import { useCnails } from "../../contexts/cnails";
import { FormStructure } from "../ModalForm/types";
import { env } from "process";
import { EnvironmentBuildRequest } from "../../lib/api/api";
import TempContainerToast from "../TempContainerToast";
import { useWarning } from "../../contexts/warning";

export type CreateEnvironmentFormData = {
    create_environment: {
        is_predefined: boolean;
        environment_choice: Option;
        name: string;
        description: string;
    };
};

export type Props = {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateEnvironmentForm = ({ isOpen, setOpen }: Props) => {
    const { sub, fetchContainers } = useCnails()
    const { environments, sectionUserInfo, fetch, fetchEnvironments } = useInstructor()
    const { waitForConfirm } = useWarning()
    const { addTempContainer, removeTempContainer } = containerAPI
    const { addEnvironment, buildEnvironment } = envAPI
    const validName = getValidName(
        environments.map((env) => env.name),
        "Environment",
    );
    return <ModalForm
        isOpen={isOpen}
        setOpen={setOpen}
        clickOutsideToClose
        escToClose
        title="Create Environment"
        formStructure={{
            create_environment: {
                entries: {
                    is_predefined: {
                        type: "toggle",
                        defaultValue: true,
                        label: "Use predefined environment? ",
                        description: "whether this environment is a predefined environment",
                        tooltip:
                            "If you are not using a custom environment, you will be prompt to a temporary workspace where you can set up the environment.",
                    },
                    environment_choice: {
                        type: "listbox",
                        defaultValue: envChoices[0],
                        label: "Pick the Programming Language",
                        options: envChoices,
                        conditional: (data) => {
                            return data.create_environment
                                .is_predefined;
                        },
                    },
                    name: {
                        type: "input",
                        defaultValue: "",
                        label: "Name",
                        placeholder: `e.g. ${validName}`,
                        emptyValue: validName,
                        validate: (data) => {
                            if (
                                environments
                                    .map((e) => e.name)
                                    .includes(
                                        data.create_environment.name
                                    )
                            )
                                return { ok: false, message: "Name crash" };
                            else return { ok: true };
                        },
                    },
                    description: {
                        type: "textarea",
                        defaultValue: "",
                        label: "Description",
                    },
                },
            },
        } as FormStructure<CreateEnvironmentFormData>}
        onEnter={async ({ create_environment: data }) => {
            // console.log(data);
            const { environment_choice: environment, name, description } = data;
            const id = myToast.loading("Creating the environment...");
            if (data.is_predefined) {
                const response = await addEnvironment(
                    {
                        libraries: [environment.value + ":" + environment.imageId],
                        name: name,
                        description: description,
                        section_user_id: sectionUserInfo.sectionUserId,
                    }
                );

                myToast.dismiss(id);
                if (response.success) {
                    const { environmentID } = response;
                    myToast.success(
                        `Environment (${environmentID}) is successfully created.`
                    );
                    fetch();
                } else {
                    myToast.error({
                        title: `Fail to create environment`,
                        description: errorToToastDescription(response.error),
                        comment: CLICK_TO_REPORT,
                    });
                }
            }
            if (!data.is_predefined) {
                try {
                    const response = await addTempContainer(
                        {
                            memLimit: memory,
                            numCPU: CPU,
                            imageId: rootImage,
                            sub: sub,
                            accessRight: "root",
                            event: "ENV_CREATE",
                            sourceId: "",
                            title: data.name,
                            formData: {
                                name: data.name,
                                description: data.description,
                                section_user_id: sectionUserInfo.sectionUserId,
                                containerId: "",
                            }
                        }
                    );
                    myToast.dismiss(id);
                    await fetchContainers()
                    if (response.success) {
                        const { containerID } = response;
                        const customToastId = myToast.custom(
                            <TempContainerToast
                                getToastId={() => customToastId}
                                containerId={containerID}
                                onCancel={async () => {
                                    return await waitForConfirm("Are you sure you want to cancel the commit? All your changes in the workspace will not be saved and no environment will be built.")
                                }}
                                onOK={async () => {
                                    // build succeed
                                    myToast.dismiss(customToastId);
                                    const id = myToast.loading(
                                        "Building your custom environment..."
                                    );
                                    const response = await buildEnvironment(
                                        {
                                            name: name,
                                            description: description,
                                            section_user_id: sectionUserInfo.sectionUserId,
                                            containerId: containerID,
                                        }
                                    );
                                    if (response.success) {
                                        myToast.success("Environment is created successfully.")
                                    } else {
                                        myToast.error({
                                            title: "Fail to build environment",
                                            description: errorToToastDescription(response.error),
                                            comment: CLICK_TO_REPORT
                                        })
                                    }
                                    await fetchContainers()
                                    await fetchEnvironments()
                                    myToast.dismiss(id);
                                }}
                            ></TempContainerToast>,
                            "toaster toaster-custom toaster-no-dismiss",
                            "🗂"
                        );
                    } else {
                        myToast.error({
                            title: "Fail to create temporary workspace",
                            description: errorToToastDescription(response.error),
                            comment: CLICK_TO_REPORT,
                        })
                    }
                } catch (error) {
                    myToast.error(error.message);
                } finally {
                    myToast.dismiss(id);
                }
            }
        }}
    ></ModalForm>
}

export default CreateEnvironmentForm

