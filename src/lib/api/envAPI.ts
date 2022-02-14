import { 
  SuccessStringResponse ,
  EnvironmentAddResponse,
  EnvironmentListResponse
} from "./api";

const envAPI = {
  environmentList: async (
    sectionid: string,
    sub: string
  ): Promise<EnvironmentListResponse> => {
    var res = await fetch(
      "/api/environment/listEnvironments?sectionid=" +
        sectionid +
        "&sub=" +
        sub,
      {
        method: "GET",
      }
    );
    return res.json();
  },
  addEnvironment: async (
    libraries: string[],
    name: string,
    description: string,
    section_user_id: string
  ) : Promise<EnvironmentAddResponse>=> {
    var res = await fetch("/api/environment/addEnvironment", {
      method: "POST",
      body: JSON.stringify({
        libraries: libraries,
        name: name,
        section_user_id: section_user_id,
        description: description,
      }),
    });
    return res.json();
  },
  updateEnvironment: async (
    envId: string,
    name: string,
    description: string,
    section_user_id: string,
    containerId: string
  ) : Promise<SuccessStringResponse>=> {
    var res = await fetch("/api/environment/updateEnvironment", {
      method: "POST",
      body: JSON.stringify({
        envId: envId,
        name: name,
        section_user_id: section_user_id,
        containerId: containerId,
        description: description,
      }),
    });
    return res.json();
  },
  buildEnvironment: async (
    name: string,
    description: string,
    section_user_id: string,
    containerId: string
  ) : Promise<EnvironmentAddResponse>=> {
    var res = await fetch("/api/environment/buildEnvironment", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        section_user_id: section_user_id,
        containerId: containerId,
        description: description,
      }),
    });
    return res.json();
  },
  removeEnvironment: async (
    envId: string,
     section_user_id: string) : Promise<SuccessStringResponse>=> {
    var res = await fetch("/api/environment/removeEnvironment", {
      method: "POST",
      body: JSON.stringify({
        envId: envId,
        section_user_id: section_user_id,
      }),
    });
    return res.json();
  },
};

export { envAPI };
