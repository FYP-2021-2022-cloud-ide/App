import { SandboxImage } from "../../lib/cnails";
import { Option } from "../ListBox";
import { useCnails } from "../../contexts/cnails";
import ModalForm from "../ModalForm/ModalForm";
import myToast from "../CustomToast";
import { envChoices, getValidName } from "../../lib/formHelper";
import { CLICK_TO_REPORT } from "../../lib/constants";
import { errorToToastDescription } from "../../lib/errorHelper";
import React, { useMemo } from "react";
import { useSandbox } from "../../contexts/sandbox";
import { sandboxAPI } from "../../lib/api/sandboxAPI";
import { FormStructure } from "../ModalForm/types";
import { useCallback } from "react";
import _ from "lodash";

export type UpdateSandboxFormData = {
  update_sandbox: {
    // update_environment: string;
    name: string;
    description: string;
  };
};

export type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  target: SandboxImage;
};

const UpdateSandboxForm = ({ isOpen, setOpen, target }: Props) => {
  const { sandboxImages, updateSandboxImageInfo } = useSandbox();
  const validName = getValidName(
    sandboxImages.map((s) => s.title),
    "Personal workspace",
    0
  );

  const formStructure = useMemo(() => {
    return target
      ? ({
          update_sandbox: {
            entries: {
              name: {
                type: "input",
                defaultValue: target?.title,
                placeholder: `e.g. ${validName}`,
                emptyValue: validName,
                label: "Name (Optional)",
                validate: (data) => {
                  if (
                    sandboxImages
                      .map((s) => s.title)
                      .filter((n) => n != target.title)
                      .includes(data.update_sandbox.name)
                  )
                    return { ok: false, message: "Name crash" };
                  return { ok: true };
                },
              },
              description: {
                type: "textarea",
                defaultValue: target?.description,
                placeholder: "e.g. This workspace is about ...",
                tooltip:
                  "A short description of the programming environment of this sandbox.",
                label: "Description (Optional)",
              },
            },
          },
        } as FormStructure<UpdateSandboxFormData>)
      : {};
  }, [sandboxImages, target, validName]);

  const onEnter = useCallback(
    async ({ update_sandbox: data }) => {
      const { name, description } = data;
      await updateSandboxImageInfo(target.id, name, description);
    },
    [target]
  );

  return (
    <ModalForm
      isOpen={isOpen}
      setOpen={setOpen}
      title={"Update Workspace"}
      clickOutsideToClose
      escToClose
      formStructure={formStructure}
      onEnter={onEnter}
    ></ModalForm>
  );
};

export default React.memo(UpdateSandboxForm, (p, n) => {
  return (
    p.isOpen == n.isOpen &&
    p.setOpen == n.setOpen &&
    _.isEqual(p.target, n.target)
  );
});
