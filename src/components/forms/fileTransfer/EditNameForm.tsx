import { NodeModel } from "@minoru/react-dnd-treeview";
import _ from "lodash";
import React from "react";
import { useCallback, useMemo } from "react";
import { useFileTransfer } from "../../../contexts/fileTransfer";
import { CustomData } from "../../CustomTree/CustomNode";
import ModalForm from "../../ModalForm/ModalForm";
import { FormStructure } from "../../ModalForm/types";

export type EditNameFormData = {
  edit_name: {
    name: string;
  };
};

export type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  target: NodeModel<CustomData>;
};

const EditNameForm = ({ isOpen, setOpen, target }: Props) => {
  const { editName } = useFileTransfer();
  const formStructure = useMemo(() => {
    return target
      ? ({
          edit_name: {
            entries: {
              name: {
                type: "input",
                defaultValue: target.text,
              },
            },
          },
        } as FormStructure<EditNameFormData>)
      : {};
  }, [target]);

  const onEnter = useCallback(
    async (data: EditNameFormData) => {
      await editName(target, data.edit_name.name);
    },
    [target, editName]
  );

  return (
    <ModalForm
      isOpen={isOpen}
      setOpen={setOpen}
      title="Edit Name"
      clickOutsideToClose
      escToClose
      formStructure={formStructure}
      onEnter={onEnter}
    ></ModalForm>
  );
};

export default React.memo(EditNameForm, (p, n) => {
  return (
    p.isOpen == n.isOpen &&
    p.setOpen == n.setOpen &&
    _.isEqual(p.target, n.target)
  );
});
