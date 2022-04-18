import { useCnails } from "../../contexts/cnails";
import { Environment } from "../../lib/cnails";
import { useInstructor } from "../../contexts/instructor";
import ModalForm from "../ModalForm/ModalForm";
import { CLICK_TO_REPORT } from "../../lib/constants";
import { errorToToastDescription } from "../../lib/errorHelper";
import myToast from "../CustomToast";
import { envAPI } from "../../lib/api/envAPI";
import { getValidName } from "../../lib/formHelper";
import { FormStructure } from "../ModalForm/types";
import { useMemo } from "react";
import { useCallback } from "react";
import React from "react";
import _ from "lodash";

export type UpdateEnvironmentFormData = {
  update_environment: {
    name: string;
    description: string;
  };
};

type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  target: Environment;
};

const UpdateEnvironmentForm = ({ isOpen, setOpen, target }: Props) => {
  const { environments, updateEnvironmentInfo: updateEnvironment } =
    useInstructor();
  const validName = getValidName(
    environments.map((env) => env.name),
    "Environment",
    0
  );

  const formStructure = useMemo(() => {
    return target
      ? ({
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
        } as FormStructure<UpdateEnvironmentFormData>)
      : {};
  }, [validName, environments, target]);

  const onEnter = useCallback(
    async ({ update_environment: data }) => {
      const { name, description } = data;
      await updateEnvironment(target.id, name, description);
    },
    [target]
  );

  return (
    <ModalForm
      isOpen={isOpen}
      setOpen={setOpen}
      clickOutsideToClose
      escToClose
      formStructure={formStructure}
      onEnter={onEnter}
      title="Update Environment"
    ></ModalForm>
  );
};

export default React.memo(UpdateEnvironmentForm, (p, n) => {
  return (
    p.isOpen == n.isOpen &&
    p.setOpen == n.setOpen &&
    _.isEqual(p.target, n.target)
  );
});
