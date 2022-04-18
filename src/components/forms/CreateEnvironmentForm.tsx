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
import { useMemo } from "react";
import { useCallback } from "react";
import React from "react";

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
  const validName = getValidName(
    environments.map((env) => env.name),
    "Environment"
  );

  const formStructure = useMemo(() => {
    return {
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
    } as FormStructure<CreateEnvironmentFormData>;
  }, [environments, validName]);

  const onEnter = useCallback(
    async ({ create_environment: data }) => {
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
            title: name,
            formData: {
              name: name,
              description: description,
              section_user_id: sectionUserInfo.sectionUserId,
              containerId: "",
            },
          },
          "nothing"
        );
      }
    },
    [createContainer, sub, sectionUserInfo]
  );

  return (
    <ModalForm
      isOpen={isOpen}
      setOpen={setOpen}
      clickOutsideToClose
      escToClose
      title="Create Environment"
      formStructure={formStructure}
      onEnter={onEnter}
    ></ModalForm>
  );
};

export default React.memo(CreateEnvironmentForm, (p, n) => {
  return p.isOpen == n.isOpen && p.setOpen == n.setOpen;
});
