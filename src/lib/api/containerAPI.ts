import {
  ContainerAddResponse,
  ContainerListResponse,
  SuccessStringResponse,
} from "./api";

const containerAPI = {
  listContainers: async (sub: string): Promise<ContainerListResponse> => {
    var res = await fetch("/api/container/listAllContainers?sub=" + sub, {
      method: "GET",
    });
    return res.json();
  },

  /**
   *
   * @param memLimit
   * @param numCPU
   * @param imageName
   * @param sub
   * @param accessRight
   * @param event
   * @param data
   * @returns
   */
  addTempContainer: async (
    memLimit: Number,
    numCPU: Number,
    imageId: string,
    sub: string,
    accessRight: string,
    event:
      | "ENV_CREATE"
      | "ENV_UPDATE"
      | "TEMPLATE_CREATE"
      | "TEMPLATE_UPDATE"
      | "SANDBOX_CREATE"
      | "SANDBOX_UPDATE",
    title: string
  ): Promise<ContainerAddResponse> => {
    var res = await fetch("/api/container/addTempContainer", {
      method: "POST",
      body: JSON.stringify({
        memLimit,
        numCPU,
        imageId,
        accessRight,
        event,
        title,
        sub,
      }),
    });
    return res.json();
  },
  removeTempContainer: async (
    containerId: string,
    sub: string
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/container/removeTempContainer", {
      method: "POST",
      body: JSON.stringify({
        containerId,
        sub,
      }),
    });
    return res.json();
  },
};

export { containerAPI };
