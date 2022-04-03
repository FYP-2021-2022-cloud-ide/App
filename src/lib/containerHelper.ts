import { Container } from "./api/api";

export const isTemporary = (container: Container) => {
  if (
    container.redisPatch.cause == "ENV_CREATE" ||
    container.redisPatch.cause == "ENV_UPDATE" ||
    container.redisPatch.cause == "TEMPLATE_CREATE" ||
    container.redisPatch.cause == "TEMPLATE_UPDATE" ||
    container.redisPatch.cause == "SANDBOX_CREATE" ||
    container.redisPatch.cause == "SANDBOX_UPDATE"
  )
    return true;
  else return false;
};

export const getType = (
  container: Container
): "SANDBOX" | "TEMPLATE" | "ENV" | "STUDENT_WORKSPACE" => {
  if (
    container.redisPatch.cause == "ENV_CREATE" ||
    container.redisPatch.cause == "ENV_UPDATE"
  )
    return "ENV";
  if (
    container.redisPatch.cause == "TEMPLATE_CREATE" ||
    container.redisPatch.cause == "TEMPLATE_UPDATE" ||
    container.redisPatch.cause == "TEMPLATE_START_WORKSPACE"
  )
    return "TEMPLATE";
  if (
    container.redisPatch.cause == "SANDBOX_CREATE" ||
    container.redisPatch.cause == "SANDBOX_UPDATE" ||
    container.redisPatch.cause == "SANDBOX_START_WORKSPACE"
  )
    return "SANDBOX";
  return "STUDENT_WORKSPACE";
};
