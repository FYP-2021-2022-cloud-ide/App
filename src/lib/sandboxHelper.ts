import { Container, SandboxImage } from "./cnails";
import { SandboxImage as ApiSandboxImage } from "./api/api";

/**
 *
 * @param sandboxImages
 * @returns
 */
export const apiSandboxesToUiSandboxes = (sandboxImages: ApiSandboxImage[]) => {
  return sandboxImages.map<SandboxImage>((sandboxImage) => ({
    ...sandboxImage,
    status: "DEFAULT",
  }));
};

export const patchSandboxes = (
  sandboxImages: SandboxImage[],
  containers: Container[]
) => {
  return sandboxImages.map<SandboxImage>((si) => {
    for (let container of containers) {
      if (
        !container.redisPatch.data &&
        container.redisPatch.sourceId == si.id
      ) {
        // it is a normal workspace
        if (container.containerID == "")
          return {
            ...si,
            status: "STARTING_WORKSPACE",
          };
        else {
          if (container.status == "REMOVING")
            return {
              ...si,
              status: "STOPPING_WORKSPACE",
            };
          else
            return {
              ...si,
              sandboxesId: container.containerID,
              status: "DEFAULT",
            };
        }
      }
      if (container.redisPatch.sourceId == si.id) {
        // it is a temporary workspace
        if (container.containerID == "")
          return {
            ...si,
            status: "STARTING_WORKSPACE",
          };
        else {
          if (container.status == "REMOVING") {
            return {
              ...si,
              status: "STOPPING_WORKSPACE",
            };
          } else
            return {
              ...si,
              sandboxesId: container.containerID,
              status: "UPDATING_INTERNAL",
            };
        }
      }
    }
    // no sandbox is related to this environment
    return {
      ...si,
      sandboxesId: "",
      status: "DEFAULT",
    };
  }); // otherwise the returned array will have status : string which is not compatible with SandboxImage
};
