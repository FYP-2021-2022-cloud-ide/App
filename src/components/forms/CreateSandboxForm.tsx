import { Option } from "../ListBox";
import { useCnails } from "../../contexts/cnails";
import ModalForm from "../ModalForm/ModalForm";
import myToast from "../CustomToast";
import { envChoices, getValidName } from "../../lib/formHelper";
import { CLICK_TO_REPORT } from "../../lib/constants";
import { errorToToastDescription } from "../../lib/errorHelper";
import React, { useCallback, useMemo } from "react";
import { useSandbox } from "../../contexts/sandbox";
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
};

const CreateSandboxForm = ({ isOpen, setOpen }: Props) => {
  const { sandboxImages, createSandboxImage } = useSandbox();
  const validName = getValidName(
    sandboxImages.map((s) => s.title),
    "Personal workspace"
  );

  const formStructure = useMemo(() => {
    return {
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
    } as FormStructure<CreateSandboxFormData>;
  }, [sandboxImages, validName]);

  const onEnter = useCallback(
    async ({ create_sandbox: data }) => {
      await createSandboxImage(
        data.name,
        data.description,
        data.environment_choice.imageId
      );
    },
    [createSandboxImage]
  );

  return (
    <ModalForm
      isOpen={isOpen}
      setOpen={setOpen}
      clickOutsideToClose
      escToClose
      title="Create Personal Workspace"
      formStructure={formStructure}
      onEnter={onEnter}
    ></ModalForm>
  );
};

export default React.memo(CreateSandboxForm, (p, n) => {
  return p.isOpen == n.isOpen && p.setOpen == n.setOpen;
});
