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
    const { sub } = useCnails()
    const { environments, sectionUserInfo, fetch } = useInstructor()
    const { addTempContainer, removeTempContainer } = containerAPI
    const { addEnvironment, buildEnvironment } = envAPI
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
                            return (data as CreateEnvironmentFormData).create_environment
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
                                        (data as CreateEnvironmentFormData).create_environment.name
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
        }}
        onEnter={async ({ create_environment: data }: CreateEnvironmentFormData) => {
            // console.log(data);
            const { environment_choice: environment, name, description } = data;
            const id = myToast.loading("Creating the environment...");
            if (data.is_predefined) {
                const response = await addEnvironment(
                    [environment.value + ":" + environment.imageId],
                    name,
                    description,
                    sectionUserInfo.sectionUserId,
                    sectionUserInfo.sectionId
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
                        memory,
                        CPU,
                        rootImage,
                        sub,
                        "root",
                        "ENV_CREATE",
                        data.name
                    );
                    myToast.dismiss(id);
                    if (response.success) {
                        const { containerID } = response;
                        const customToastId = myToast.custom(
                            <div className="flex flex-col space-y-2">
                                <p>
                                    A temporary workspace is created. Click the link to open a
                                    new window where set up your workspace. After finish
                                    setup, click <span className="font-bold">Finish</span>.
                                </p>
                                <a
                                    className="btn btn-xs"
                                    href={
                                        "https://codespace.ust.dev/user/container/" +
                                        containerID +
                                        "/"
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Set up workspace
                                </a>
                                <div className="flex flex-row space-x-2">
                                    <button
                                        className="btn btn-primary btn-xs"
                                        onClick={async () => {
                                            // cancel the build
                                            myToast.dismiss(customToastId);
                                            const response = await removeTempContainer(
                                                containerID,
                                                sub
                                            );
                                            if (response.success)
                                                console.log("remove temp container", containerID);
                                            else
                                                console.log(
                                                    "fail to remove temp container",
                                                    response.error.status,
                                                    containerID,
                                                    sub
                                                );
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-primary btn-xs"
                                        onClick={async () => {
                                            // build succeed
                                            myToast.dismiss(customToastId);
                                            const id = myToast.loading(
                                                "Building your custom environment..."
                                            );
                                            const response = await buildEnvironment(
                                                name,
                                                description,
                                                sectionUserInfo.sectionUserId,
                                                containerID,
                                                sectionUserInfo.sectionId ,
                                            );
                                            if (response.success) {
                                                fetch();
                                                myToast.dismiss(id);
                                            }
                                        }}
                                    >
                                        Finish
                                    </button>
                                </div>
                            </div>,
                            "toaster toaster-custom toaster-no-dismiss",
                            "🗂"
                        );
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