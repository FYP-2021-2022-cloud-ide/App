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
    const container = containers.find(
      (container) => container.redisPatch.sourceId == si.id
    );

    // no sandbox is related to this environment
    return {
      ...si,
      containerId: container ? container.id : "",
      status: "DEFAULT",
    };
  }); // otherwise the returned array will have status : string which is not compatible with SandboxImage
};
