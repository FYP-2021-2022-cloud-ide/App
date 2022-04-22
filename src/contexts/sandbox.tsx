import _ from "lodash";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import myToast from "../components/CustomToast";
import CreateSandboxForm from "../components/forms/CreateSandboxForm";
import UpdateSandboxForm from "../components/forms/UpdateSandboxForm";
import { useCancelablePromise } from "../hooks/useCancelablePromise";
import useInterval from "../hooks/useInterval";
import { SandboxImageListResponse } from "../lib/api/api";
import { sandboxAPI } from "../lib/api/sandboxAPI";
import { SandboxImage } from "../lib/cnails";
import { CLICK_TO_DISMISS, CLICK_TO_REPORT } from "../lib/constants";
import { errorToToastDescription } from "../lib/errorHelper";
import {
  apiSandboxesToUiSandboxes,
  patchSandboxes,
} from "../lib/sandboxHelper";
import { useCnails } from "./cnails";
import { useContainers } from "./containers";
import { useWarning } from "./warning";

type SandboxContextState = {
  sandboxImages: SandboxImage[];
  getSandboxImage: (id: string) => SandboxImage;
  setSandboxImages: React.Dispatch<React.SetStateAction<SandboxImage[]>>;
  /**
   * a function to fetch the new sandboxImages list.
   * It will update the context and hence update all affected UI.
   * Therefore, even if this function will return an array of sandboxImages,
   * using the returned value is not suggested. You should use the `sandboxImages`
   * from the context instead.
   */
  fetchSandboxImages: () => Promise<SandboxImage[]>;

  createSandboxImage: (
    name: string,
    description: string,
    imageId: string
  ) => Promise<void>;
  updateSandboxImageInfo: (
    sandboxImageId: string,
    name: string,
    description: string
  ) => Promise<void>;
  updateSandboxImageInternal: (
    sandboxImageId: string,
    containerId: string
  ) => Promise<void>;
  removeSandboxImage: (sandboxImageId: string) => Promise<void>;
  createOpen: boolean;
  setCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateOpen: boolean;
  setUpdateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateTarget: SandboxImage;
  setUpdateTarget: React.Dispatch<React.SetStateAction<SandboxImage>>;
};

const SandboxContext = createContext({} as SandboxContextState);
export const useSandbox = () => useContext(SandboxContext);

export const SandboxProvider = ({ children }: { children: JSX.Element }) => {
  const { userId } = useCnails();
  const { containers, fetchContainers, onCommitRef } = useContainers();
  const { waitForConfirm } = useWarning();
  const [sandboxImages, setSandboxImages] = useState<SandboxImage[]>();
  const { cancelablePromise } = useCancelablePromise();
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateTarget, setUpdateTarget] = useState<SandboxImage>();

  const getSandboxImage = (id: string) =>
    sandboxImages.find((si) => si.id == id);

  async function fetchSandboxImages() {
    const afterResponse = (
      response: SandboxImageListResponse,
      mount: boolean = true
    ) => {
      if (response.success) {
        const newSandboxImages = patchSandboxes(
          apiSandboxesToUiSandboxes(response.sandboxImages),
          containers
        );
        if (mount && !_.isEqual(newSandboxImages, sandboxImages))
          setSandboxImages(newSandboxImages);
        return newSandboxImages;
      } else {
        myToast.error({
          title: "Personal workspaces cannot be fetched",
          description: errorToToastDescription(response.error),
        });
      }
    };
    let response: SandboxImageListResponse;
    try {
      response = await cancelablePromise(sandboxAPI.listSandboxImages(userId));
      return afterResponse(response);
    } catch (error) {
      if (error.isCanceled)
        return afterResponse(error.value as SandboxImageListResponse, false);
      else console.error(error);
    }
  }

  async function createSandboxImage(
    name: string,
    description: string,
    imageId: string
  ) {
    const response = await myToast.promise(
      "Creating a personal workspace...",
      sandboxAPI.addSandboxImage({
        title: name,
        description,
        imageId,
        userId,
      })
    );

    if (response.success) {
      myToast.success(`Personal workspace is successfully created.`);
    } else {
      myToast.error({
        title: "Fail to create personal workspace",
        description: errorToToastDescription(response.error),
      });
    }
    await fetchSandboxImages();
  }

  async function updateSandboxImageInfo(
    sandboxImageId: string,
    name: string,
    description: string
  ) {
    const response = await myToast.promise(
      "Updating the info of the personal workspace...",
      sandboxAPI.updateSandboxImage({
        sandboxImageId,
        title: name,
        description: description,
        tempContainerId: "",
        userId: userId,
      })
    );
    if (response.success)
      myToast.success("Personal workspace is successfully updated.");
    else
      myToast.error({
        title: "Fail to update personal workspace",
        description: errorToToastDescription(response.error),
      });
    await fetchSandboxImages();
  }

  async function updateSandboxImageInternal(
    sandboxImageId: string,
    containerId: string
  ) {
    const sandboxImage = getSandboxImage(sandboxImageId);
    const response = await myToast.promise(
      "Updating the environment setup of the personal workspace...",
      sandboxAPI.updateSandboxImage({
        sandboxImageId: sandboxImage.id,
        title: sandboxImage.title,
        description: sandboxImage.description,
        tempContainerId: containerId,
        userId: userId,
      })
    );

    if (response.success) myToast.success("workspace is successfully updated.");
    else
      myToast.error({
        title: "Fail to update workspace",
        description: errorToToastDescription(response.error),
      });
    await fetchContainers();
    await fetchSandboxImages();
  }

  async function removeSandboxImage(sandboxImageId: string) {
    const sandboxImage = getSandboxImage(sandboxImageId);
    if (sandboxImage.containerId) {
      myToast.error({
        title: "The workspace is still active. Fail to removed.",
        description:
          "You can need to stop your workspace first before removing it.",
      });
      return;
    }
    if (
      (await waitForConfirm(
        "Are you sure that you want to delete this personal workspace? The action cannot be undo. "
      )) == false
    )
      return;
    const response = await myToast.promise(
      `Removing ${sandboxImage.title}...`,
      sandboxAPI.removeSandboxImage({
        sandboxImageId: sandboxImage.id,
        userId: userId,
      })
    );
    if (response.success) {
      myToast.success(
        `Workspace (${sandboxImage.title}) is successfully removed.`
      );
    } else {
      myToast.error({
        title: `Fail to remove workspace (${sandboxImage.title})`,
        description: errorToToastDescription(response.error),
      });
    }
    await fetchSandboxImages();
  }

  /**
   * this hook will change the status of the sandboxes base on the change in containers
   */
  useEffect(() => {
    if (sandboxImages && containers) {
      setSandboxImages((sandboxImages) =>
        patchSandboxes(sandboxImages, containers)
      );
    }
  }, [containers]);

  useInterval(async () => {
    await fetchSandboxImages();
  }, 10000);

  /**
   * this hook will fetch the sandboxes on render
   */
  useEffect(() => {
    onCommitRef.current.push(fetchSandboxImages);
    fetchSandboxImages();
    return () => {
      onCommitRef.current = onCommitRef.current.filter(
        (callback) => callback != fetchSandboxImages
      );
    };
  }, []);

  if (!sandboxImages) return <></>;
  return (
    <SandboxContext.Provider
      value={{
        sandboxImages,
        getSandboxImage,
        setSandboxImages,
        fetchSandboxImages,
        createSandboxImage,
        updateSandboxImageInfo,
        removeSandboxImage,
        updateSandboxImageInternal,
        createOpen,
        setCreateOpen,
        updateOpen,
        setUpdateOpen,
        updateTarget,
        setUpdateTarget,
      }}
    >
      {children}
      {/* create form */}
      <CreateSandboxForm isOpen={createOpen} setOpen={setCreateOpen} />
      {/* update form */}
      <UpdateSandboxForm
        isOpen={updateOpen && sandboxImages.length != 0}
        setOpen={setUpdateOpen}
        target={updateTarget}
      />
    </SandboxContext.Provider>
  );
};
