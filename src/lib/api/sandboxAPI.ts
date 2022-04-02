import {
  SandboxAddRequest,
  SandboxAddResponse,
  AddSandboxImageRequest,
  SandboxImageAddResponse,
  SandboxImageListResponse,
  RemoveSandboxRequest,
  SuccessStringResponse,
  UpdateSandboxImageRequest,
} from "./api";

const sandboxAPI = {
  listSandboxImages: async (
    userId: string
  ): Promise<SandboxImageListResponse> => {
    var res = await fetch(`/api/sandbox/listSandboxImage?userId=${userId}`, {
      method: "GET",
    });
    return res.json();
  },
  addSandbox: async (req: SandboxAddRequest): Promise<SandboxAddResponse> => {
    // start a workspace
    var res = await fetch("/api/sandbox/addSandbox", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res.json();
  },
  // add predefined image
  addSandboxImage: async (
    req: AddSandboxImageRequest
  ): Promise<SandboxImageAddResponse> => {
    var res = await fetch("/api/sandbox/addSandboxImage", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res.json();
  },
  removeSandbox: async (
    req: RemoveSandboxRequest
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/sandbox/removeSandbox", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res.json();
  },
  removeSandboxImage: async (
    req: RemoveSandboxRequest
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/sandbox/removeSandboxImage", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res.json();
  },

  /**
   * if the `tempContainerId` is an empty string, only db data will be updated
   */
  updateSandboxImage: async (
    req: UpdateSandboxImageRequest
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/sandbox/updateSandboxImage", {
      method: "POST",
      body: JSON.stringify({
        req,
      }),
    });
    return res.json();
  },
};

export { sandboxAPI };
