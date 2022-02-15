import React, { useEffect, useRef, useState } from "react";
import { useCnails } from "../contexts/cnails";
import { sandboxAPI } from "../lib//api/sandboxAPI";
import { SandboxImage } from "../lib/cnails";
import myToast from "../components/CustomToast";
import ModalForm, { Section } from "../components/ModalForm";
import SandboxImageList from "../components/SandboxImageList";
import { containerAPI } from "../lib/api/containerAPI";
import { useRouter } from "next/router";

import { Option } from "../components/ListBox";
import {
  getCreateSandboxFormStructure,
  getUpdateSandboxFormStructure,
  getValidName,
} from "../lib/forms";
const registry = "143.89.223.188:5000";
const rootImage = "143.89.223.188:5000/codeserver:latest";
const CPU = 0.5;
const memory = 400;
const envChoices = [
  { value: "C++/C", id: `${registry}/codeserver:latest` },
  { value: "Python3", id: `${registry}/codeserver:latest` },
  { value: "Java", id: `${registry}/codeserver:latest` },
];

async function fetchSandboxes(
  userId: string,
  onFailCallBack?: () => void,
  onSuccessCallBack?: (sandboxes: SandboxImage[]) => void
) {
  const { listSandboxImage } = sandboxAPI;
  const response = await listSandboxImage(userId);
  if (!response.success && onFailCallBack) {
    onFailCallBack();
  } else if (response.success && onSuccessCallBack) {
    onSuccessCallBack(response.sandboxImages);
  }
}

const SandboxWrapper = () => {
  const mount = useRef(false);
  const router = useRouter();
  const { sub, userId, fetchContainers } = useCnails();
  const [sandboxImages, setSandboxImages] = useState<SandboxImage[]>();
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [udpateTarget, setUpdateTarget] = useState<SandboxImage>();
  const {
    addSandboxImage,
    removeSandbox,
    removeSandboxImage,
    addSandbox,
    updateSandboxImage,
  } = sandboxAPI;
  const { addTempContainer } = containerAPI;
  const fetch = async (mount: boolean) => {
    await fetchSandboxes(
      userId,
      () => {
        myToast.error("sandboxes cannot be fetched for some reasons.");
      },
      (sandboxImages) => {
        if (mount) setSandboxImages(sandboxImages);
      }
    );
    await fetchContainers(sub);
  };
  useEffect(() => {
    mount.current = true;
    fetch(mount.current);
    return () => {
      mount.current = false;
    };
  }, []);

  // if environments or templates has not fetch, don't need to go down
  if (!sandboxImages) return <></>;

  const createFormStructure = getCreateSandboxFormStructure(sandboxImages);

  //one more button for just changing the  title / description, not calling tempContainer
  const updateFormStructure = getUpdateSandboxFormStructure(
    udpateTarget,
    sandboxImages
  );

  return (
    <>
      <SandboxImageList
        sandboxImages={sandboxImages}
        onCreateBtnClick={() => {
          setCreateOpen(true);
        }}
        onSandboxClick={(sandboxImage) => {
          if (sandboxImage.sandboxesId) {
            window.open(
              "https://codespace.ust.dev/user/container/" +
                sandboxImage.sandboxesId +
                "/"
            );
          }
        }}
        onSandboxDelete={async (sandboxImage) => {
          if (sandboxImage.sandboxesId) {
            myToast.error(`The sandbox is still active. Fail to removed.`);
            return;
          }
          const id = myToast.loading(`Removing a ${sandboxImage.title}...`);
          const response = await removeSandboxImage(sandboxImage.id, userId);
          myToast.dismiss(id);
          if (response.success) {
            myToast.success(
              `Sandbox (${sandboxImage.title}) is successfully removed.`
            );
            fetch(mount.current);
          } else {
            myToast.error(`Fail to remove Sandbox (${sandboxImage.title}).`);
          }
        }}
        onSandboxUpdate={(sandbox) => {
          setUpdateOpen(true);
          setUpdateTarget(sandbox);
        }}
        onSandboxStart={async (sandboxImage) => {
          const id = myToast.loading(`Starting a sandbox....`);
          const response = await addSandbox(memory, CPU, sandboxImage.id);
          myToast.dismiss(id);
          if (response.success) {
            myToast.success(
              `Sandbox ${sandboxImage.title} is successfully started.`
            );
            fetch(mount.current);
          } else {
            myToast.error(`Cannot started sandbox.`);
          }
        }}
        onSandboxStop={async (sandboxImage) => {
          const toastId = myToast.loading(`Stopping a sandbox...`);
          const response = await removeSandbox(
            sandboxImage.sandboxesId,
            userId
          );
          myToast.dismiss(toastId);
          if (response.success) {
            myToast.success(
              `Sandbox ${sandboxImage.title} is successfully stopped.`
            );
            fetch(mount.current);
          } else {
            myToast.error(`Cannot stop sandbox.`);
          }
        }}
      ></SandboxImageList>
      {/* create form */}
      <ModalForm
        isOpen={createOpen}
        setOpen={setCreateOpen}
        clickOutsideToClose
        title="Create Sandbox"
        formStructure={createFormStructure}
        onEnter={async (data) => {
          const environment = data.environment_choice as Option;
          // const toastId = myToast.loading("Creating the temporary contianer...");
          const response = await addSandboxImage(
            data.description as string,
            environment.id,
            data.name as string,
            userId
          );

          if (response.success) {
            const { sandboxImageId } = response;
            myToast.success(`Sandbox is successfully created.`);
            fetch(mount.current);
          } else {
            // myToast.dismiss(toastId);
            myToast.error("Sandbox cannot be created for some reason.");
          }
        }}
      ></ModalForm>
      {/* update form */}
      {udpateTarget && (
        <ModalForm
          isOpen={updateOpen}
          setOpen={setUpdateOpen}
          title={"Update Sandbox"}
          formStructure={updateFormStructure}
          onEnter={async (data) => {
            // call some API here
            const id = myToast.loading("Updating a sandbox...");
            const { name, description } = data;
            const response = await updateSandboxImage(
              udpateTarget.id,
              String(name) == ""
                ? getValidName(
                    sandboxImages.map((s) => s.title),
                    "Sandbox",
                    true
                  )
                : String(name),
              String(description),
              "",
              userId
            );
            myToast.dismiss(id);
            if (response.success) {
              myToast.success("Sandbox is successfully updated.");
              fetch(mount.current);
            } else myToast.error("Fail to update the sandbox.");
          }}
        ></ModalForm>
      )}
    </>
  );
};

const Sandbox = () => {
  return (
    <div className="flex flex-col font-bold px-8 w-full h-full space-y-5">
      <SandboxWrapper></SandboxWrapper>
    </div>
  );
};

export default Sandbox;
