import React from "react";
import { useCallback, useMemo } from "react";
import { useFileTransfer } from "../../../contexts/fileTransfer";
import ModalForm from "../../ModalForm/ModalForm";
import { FormStructure } from "../../ModalForm/types";

export type CreateFolderFormData = {
  create_folder: {
    name: string;
  };
};

export type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateFolderForm = ({ isOpen, setOpen }: Props) => {
  const { createFolder, lastActiveNodeRef } = useFileTransfer();
  const formStructure = useMemo(() => {
    return {
      create_folder: {
        entries: {
          name: {
            type: "input",
            label: "folder name",
            defaultValue: "",
          },
        },
      },
    } as FormStructure<CreateFolderFormData>;
  }, []);

  const onEnter = useCallback(
    async (data) => {
      await createFolder(
        lastActiveNodeRef.current.node,
        data.create_folder.name
      );
    },
    [lastActiveNodeRef, createFolder]
  );

  return (
    <ModalForm
      isOpen={isOpen}
      setOpen={setOpen}
      title="create folder"
      clickOutsideToClose
      escToClose
      formStructure={formStructure}
      onEnter={onEnter}
    ></ModalForm>
  );
};

export default React.memo(CreateFolderForm, (p, n) => {
  return p.isOpen == n.isOpen && p.setOpen == n.setOpen;
});
