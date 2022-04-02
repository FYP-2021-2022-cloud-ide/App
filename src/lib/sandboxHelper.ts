import { Container, SandboxImage } from "./cnails";

export const patchSandboxes = (
  sandboxImages: SandboxImage[],
  containers: Container[]
) => {
  const temp = sandboxImages.map((si) => {
    if (
      containers.some(
        (container) =>
          container.data.cause == "SANDBOX_START_WORKSPACE" &&
          container.data.data == si.id
      )
    ) {
      return {
        ...si,
        status: "STARTING_WORKSPACE",
      };
    } else if (
      containers.some(
        (container) =>
          container.status == "REMOVING" && container.data.data == si.id
      )
    ) {
      return {
        ...si,
        status: "REMOVING_WORKSPACE",
      };
    } else
      return {
        ...si,
        status: "DEFAULT",
      };
  }) as SandboxImage[];
  return temp;
};
