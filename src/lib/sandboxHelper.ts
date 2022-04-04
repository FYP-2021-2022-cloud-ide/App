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
        if (container.containerId == "")
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
              containerId: container.containerId,
              status: "DEFAULT",
            };
        }
      }
      if (container.redisPatch.sourceId == si.id) {
        // it is a temporary workspace
        if (container.containerId == "")
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
              containerId: container.containerId,
              status: "UPDATING_INTERNAL",
            };
        }
      }
    }
    // no sandbox is related to this environment
    return {
      ...si,
      containerId: "",
      status: "DEFAULT",
    };
  }); // otherwise the returned array will have status : string which is not compatible with SandboxImage
};
