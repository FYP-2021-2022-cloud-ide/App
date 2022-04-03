import { Container, SandboxImage } from "./cnails";

export const patchSandboxes = (
  sandboxImages: SandboxImage[],
  containers: Container[]
) => {
  const temp = sandboxImages.map((si) => {
    for (let container of containers) {
      if (!container.data.data && container.data.sourceId == si.id) {
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
      if (container.data.sourceId == si.id) {
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
    // the container not found
    return {
      ...si,
      sandboxesId: "",
      status: "DEFAULT",
    };
  }) as SandboxImage[]; // otherwise the returned array will have status : string which is not compatible with SandboxImage
  return temp;
};
