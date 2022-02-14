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
  const { sub, userId } = useCnails();
  const [sandboxImages, setSandboxImages] = useState<SandboxImage[]>();
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [udpateTarget, setUpdateTarget] = useState<SandboxImage>();
  const { addSandboxImage, removeSandbox, removeSandboxImage,addSandbox } = sandboxAPI;
  const { addTempContainer } = containerAPI;
  let fetch = (mount: boolean) =>
    fetchSandboxes(
      userId,
      () => {
        myToast.error("sandboxes cannot be fetched for some reasons.");
      },
      (sandboxImages) => {
        setSandboxImages(sandboxImages);
      }
    );
  useEffect(() => {
    mount.current = true;
    fetch(mount.current);
    return () => {
      mount.current = false;
    };
  }, []);

  // if environments or templates has not fetch, don't need to go down
  if (!sandboxImages) return <></>;
  const createFormStructure: { [title: string]: Section } = {
    create_sandbox: {
      displayTitle: false,
      entries: {
        environment_choice: {
          type: "listbox",
          defaultValue: envChoices[0],
          text: "Pick the Programming Language",
          description: "Pick the Programming Language",
          tooltip: "Pick the Programming Language",
          options: envChoices,
        },
        name: {
          type: "input",
          defaultValue: "",
          placeholder: "e.g. Sandbox with C++",
          text: "Name (Optional)",
        },
        description: {
          type: "textarea",
          defaultValue: "",
          placeholder: "e.g. This sandbox is about ...",
          text: "Description (Optional)",
        },
      },
    },
  };

  //one more button for just changing the  title / description, not calling tempContainer
  const updateFormStructure: { [title: string]: Section } = {
    update_section: {
      displayTitle: false,
      entries: {
        name: {
          type: "input",
          defaultValue: udpateTarget?.title,
          placeholder: "e.g. Sandbox with C++",
          text: "Name (Optional)",
        },
        description: {
          type: "textarea",
          defaultValue: udpateTarget?.description,
          placeholder: "e.g. This sandbox is about ...",
          text: "Description (Optional)",
        },
      },
    },
  };

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
                "https://codespace.ust.dev/user/container/" + sandboxImage.sandboxesId + "/"
              );
            }
          
        }}
        onSandboxDelete={async (sandboxImage) => {
          console.log("delete sandbox image");
          const response = await removeSandboxImage(sandboxImage.id, userId);
          console.log(response);
          if (response.success) {
            myToast.success(
              `Sandbox ${sandboxImage.title} is successfully removed.`
            );
          }
          fetch(mount.current);
        }}
        onSandboxUpdate={(sandbox) => {
          setUpdateOpen(true);
          setUpdateTarget(sandbox);
        }}
        onSandboxOpen={ async(sandboxImage) => {
          const id = myToast.loading(
            `Opening a sandbox....`
          )
          const response = await addSandbox(memory, CPU, sandboxImage.id);
          
            if (response.success) {
              myToast.dismiss(id);
              myToast.success(
                `Sandbox ${sandboxImage.title} is successfully opened.`
              );
              fetch(mount.current);
            } else {
              myToast.error(
                `Cannot open sandbox.`
              )
            }
        }}
        onSandboxClose={async (sandboxImage) => {
          const response = await removeSandbox(sandboxImage.sandboxesId, userId);
            if (response.success) {
              myToast.success(
                `Sandbox ${sandboxImage.title} is successfully closed.`
              );
              fetch(mount.current);
            } else {
              myToast.error(
                `Cannot close sandbox.`
              );
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
            myToast.success(
              `Sandbox is successfully created.`
            );
            fetch(true);              
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
          onEnter={() => {
            // call some API here
          }}
        ></ModalForm>
      )}
    </>
  );
};

const Sandbox = () => {
  return (
    <div className="flex flex-col font-bold px-8 w-full pt-10 h-full space-y-5">
      <SandboxWrapper></SandboxWrapper>
    </div>
  );
};

export default Sandbox;
