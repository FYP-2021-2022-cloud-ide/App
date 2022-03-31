import {
  SuccessStringResponse,
  EnvironmentAddResponse,
  EnvironmentListResponse,
} from "./api";

const envAPI = {
  listEnvironments: async (
    sectionId: string,
    sub: string
  ): Promise<EnvironmentListResponse> => {
    var res = await fetch(
      "/api/environment/listEnvironments?sectionid=" +
        sectionId +
        "&sub=" +
        sub,
      {
        method: "GET",
      }
    );
    return res.json();
  },
  /**
   *
   * @param libraries currently used as `<environment.value:environment.imageId>[]`
   * @param name
   * @param description
   * @param section_user_id
   * @returns
   */
  addEnvironment: async (
    libraries: string[],
    name: string,
    description: string,
    section_user_id: string,
    sectionId: string
  ): Promise<EnvironmentAddResponse> => {
    var res = await fetch("/api/environment/addEnvironment", {
      method: "POST",
      body: JSON.stringify({
        libraries: libraries,
        name: name,
        section_user_id: section_user_id,
        description: description,
        sectionId: sectionId,
      }),
    });
    return res.json();
  },
  updateEnvironment: async (
    envId: string,
    name: string,
    description: string,
    section_user_id: string,
    containerId: string,
    sectionId: string
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/environment/updateEnvironment", {
      method: "POST",
      body: JSON.stringify({
        envId: envId,
        name: name,
        section_user_id: section_user_id,
        containerId: containerId,
        description: description,
        sectionId: sectionId,
      }),
    });
    return res.json();
  },
  buildEnvironment: async (
    name: string,
    description: string,
    section_user_id: string,
    containerId: string,
    sectionId: string
  ): Promise<EnvironmentAddResponse> => {
    var res = await fetch("/api/environment/buildEnvironment", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        section_user_id: section_user_id,
        containerId: containerId,
        description: description,
        sectionId: sectionId,
      }),
    });
    return res.json();
  },
  removeEnvironment: async (
    envId: string,
    section_user_id: string,
    sectionId: string
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/environment/removeEnvironment", {
      method: "POST",
      body: JSON.stringify({
        envId: envId,
        section_user_id: section_user_id,
        sectopmOd: sectionId,
      }),
    });
    return res.json();
  },
};

export { envAPI };
