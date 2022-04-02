import {
  SuccessStringResponse,
  EnvironmentAddResponse,
  EnvironmentListResponse,
  EnvironmentListRequest,
  EnvironmentAddRequest,
  EnvironmentUpdateRequest,
  EnvironmentBuildRequest,
  EnvironmentRemoveRequest,
} from "./api";

const envAPI = {
  listEnvironments: async (
    req: EnvironmentListRequest
  ): Promise<EnvironmentListResponse> => {
    var res = await fetch(
      "/api/environment/listEnvironments?sectionid=" +
        req.sectionId +
        "&sub=" +
        req.sub,
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
    req: EnvironmentAddRequest
  ): Promise<EnvironmentAddResponse> => {
    var res = await fetch("/api/environment/addEnvironment", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res.json();
  },
  updateEnvironment: async (
    req: EnvironmentUpdateRequest
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/environment/updateEnvironment", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res.json();
  },
  buildEnvironment: async (
    req: EnvironmentBuildRequest
  ): Promise<EnvironmentAddResponse> => {
    var res = await fetch("/api/environment/buildEnvironment", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res.json();
  },
  removeEnvironment: async (
    req: EnvironmentRemoveRequest
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/environment/removeEnvironment", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res.json();
  },
};

export { envAPI };
