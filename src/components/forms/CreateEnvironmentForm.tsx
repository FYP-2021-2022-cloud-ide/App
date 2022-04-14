import {
  CPU,
  envChoices,
  getValidName,
  memory,
  rootImage,
} from "../../lib/formHelper";
import { Option } from "../ListBox";
import ModalForm from "../ModalForm/ModalForm";
import { useInstructor } from "../../contexts/instructor";
import myToast from "../CustomToast";
import { useCnails } from "../../contexts/cnails";
import { FormStructure } from "../ModalForm/types";
import TempContainerToast from "../TempContainerToast";
import { useWarning } from "../../contexts/warning";
import { useContainers } from "../../contexts/containers";

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
};

const CreateEnvironmentForm = ({ isOpen, setOpen }: Props) => {
  const { sub } = useCnails();
  const { createContainer } = useContainers();
  const { environments, sectionUserInfo, createEnvironment } = useInstructor();
  const { waitForConfirm } = useWarning();
  const validName = getValidName(
    environments.map((env) => env.name),
    "Environment"
  );
  return (
    <ModalForm
      isOpen={isOpen}
      setOpen={setOpen}
      clickOutsideToClose
      escToClose
      title="Create Environment"
      formStructure={
        {
          create_environment: {
            entries: {
              is_predefined: {
                type: "toggle",
                defaultValue: true,
                label: "Use predefined environment? ",
                description:
                  "whether this environment is a predefined environment",
                tooltip:
                  "If you are not using a custom environment, you will be prompt to a temporary workspace where you can set up the environment.",
              },
              environment_choice: {
                type: "listbox",
                defaultValue: envChoices[0],
                label: "Pick the Programming Language",
                options: envChoices,
                conditional: (data) => {
                  return data.create_environment.is_predefined;
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
                      .includes(data.create_environment.name)
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
        } as FormStructure<CreateEnvironmentFormData>
      }
      onEnter={async ({ create_environment: data }) => {
        // console.log(data);
        const { environment_choice: environment, name, description } = data;
        if (data.is_predefined)
          await createEnvironment(name, description, [
            `${environment.value}:${environment.imageId}`,
          ]);
        if (!data.is_predefined) {
          await createContainer(
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
              },
            },
            "nothing"
            // (containerId) => {
            //   const toastId = myToast.custom(
            //     <TempContainerToast
            //       getToastId={() => toastId}
            //       containerId={containerId}
            //       onCancel={async () => {
            //         return await waitForConfirm(
            //           "Are you sure you want to cancel the commit? All your changes in the workspace will not be saved and no environment will be built."
            //         );
            //       }}
            //       onOK={async () => {
            //         await createEnvironment(name, description, containerId);
            //       }}
            //     ></TempContainerToast>,
            //     {
            //       className: "toaster toaster-temp-container",
            //       icon: "🗂",
            //       id: containerId,
            //       duration: 99999 * 86400,
            //     },
            //     undefined,
            //     false
            //   );
            // }
          );
        }
      }}
    ></ModalForm>
  );
};

export default CreateEnvironmentForm;
