import { Container, Environment } from "./cnails";
import { Environment as ApiEnvironment } from "./api/api";

export const apiEnvironmentToUiEnvironment = (
  environments: ApiEnvironment[]
) => {
  return environments.map<Environment>((env) => ({
    ...env,
    name: env.environmentName,
    status: "DEFAULT",
  }));
};

export const patchEnvironments = (
  environments: Environment[],
  containers: Container[]
) => {
  return environments.map<Environment>((env) => {
    for (let container of containers) {
      if (
        container.redisPatch.data &&
        container.redisPatch.sourceId == env.id
      ) {
        // it is a temporary workspace to update this env
        if (container.containerID == "")
          return {
            ...env,
            status: "STARTING_UPDATE_WORKSPACE",
          };
        else {
          if (container.status == "REMOVING") {
            return {
              ...env,
              temporaryContainerId: container.containerID,
              status: "STOPPING_UPDATE_WORKSPACE",
            };
          } else
            return {
              ...env,
              temporaryContainerId: container.containerID,
              status: "DEFAULT",
            };
        }
      }
    }
    // no container is related this environment
    return {
      ...env,
      temporaryContainerId: "",
      status: "DEFAULT",
    };
  });
};
