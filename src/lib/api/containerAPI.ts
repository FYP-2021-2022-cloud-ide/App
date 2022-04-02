import {
  ContainerAddRequest,
  ContainerAddResponse,
  ContainerListResponse,
  ContainerRemoveRequest,
  SuccessStringResponse,
} from "./api";

const containerAPI = {
  listContainers: async (sub: string): Promise<ContainerListResponse> => {
    var res = await fetch("/api/container/listAllContainers?sub=" + sub, {
      method: "GET",
    });
    return res.json();
  },

  addTempContainer: async (
    containerAddRequest: ContainerAddRequest
  ): Promise<ContainerAddResponse> => {
    var res = await fetch("/api/container/addTempContainer", {
      method: "POST",
      body: JSON.stringify(containerAddRequest),
    });
    console.log(await res.json());
    return res.json();
  },
  removeTempContainer: async (
    req: ContainerRemoveRequest
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/container/removeTempContainer", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res.json();
  },
};

export { containerAPI };
