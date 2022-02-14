import {
  SandboxAddResponse,
  SandboxImageAddResponse,
  SandboxImageListResponse,
  SuccessStringResponse,
} from "./api";

const sandboxAPI = {
  addSandbox: async (
    memLimit: Number,
    numCPU: Number,
    sandboxImageId: string
  ): Promise<SandboxAddResponse> => {
    var res = await fetch("/api/sandbox/addSandbox", {
      method: "POST",
      body: JSON.stringify({
        memLimit,
        numCPU,
        sandboxImageId,
      }),
    });
    return res.json();
  },
  // add predefined image
  addSandboxImage: async (
    description: string,
    imageId: string,
    title: string,
    userId: string
  ): Promise<SandboxImageAddResponse> => {
    var res = await fetch("/api/sandbox/addSandboxImage", {
      method: "POST",
      body: JSON.stringify({
        description,
        imageId,
        title,
        userId,
      }),
    });
    return res.json();
  },


  listSandboxImage: async (
    userId: string
  ): Promise<SandboxImageListResponse> => {
    var res = await fetch(`/api/sandbox/listSandboxImage?userId=${userId}`, {
      method: "GET",
    });
    return res.json();
  },
  removeSandbox: async (
    sandboxId: string,
    userId: string
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/sandbox/removeSandbox", {
      method: "POST",
      body: JSON.stringify({
        sandboxId,
        userId,
      }),
    });
    return res.json();
  },
  removeSandboxImage: async (
    sandboxImageId: string,
    userId: string
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/sandbox/removeSandboxImage", {
      method: "POST",
      body: JSON.stringify({
        sandboxImageId,
        userId,
      }),
    });
    return res.json();
  },
  updateSandboxImage: async (
    sandboxImageId: string,
    title: string,
    description: string,
    tempContainerId: string,
    userId: string
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/sandbox/updateSandboxImage", {
      method: "POST",
      body: JSON.stringify({
        sandboxImageId,
        description,
        tempContainerId,
        title,
        userId,
      }),
    });
    return res.json();
  },
};

export { sandboxAPI };