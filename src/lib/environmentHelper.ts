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
    const container = containers.find(
      (container) => container.redisPatch.sourceId == env.id
    );
    return {
      ...env,
      temporaryContainerId: container ? container.id : "",
      status: "DEFAULT",
    };
  });
};
