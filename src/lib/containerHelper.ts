import { Container } from "./api/api";

export const isTemporary = (event: string) => {
  if (
    event == "ENV_CREATE" ||
    event == "ENV_UPDATE" ||
    event == "TEMPLATE_CREATE" ||
    event == "TEMPLATE_UPDATE" ||
    event == "SANDBOX_CREATE" ||
    event == "SANDBOX_UPDATE"
  )
    return true;
  else return false;
};

export const getType = (
  event: string
): "SANDBOX" | "TEMPLATE" | "ENV" | "STUDENT_WORKSPACE" => {
  if (event == "ENV_CREATE" || event == "ENV_UPDATE") return "ENV";
  if (
    event == "TEMPLATE_CREATE" ||
    event == "TEMPLATE_UPDATE" ||
    event == "TEMPLATE_START_WORKSPACE"
  )
    return "TEMPLATE";
  if (
    event == "SANDBOX_CREATE" ||
    event == "SANDBOX_UPDATE" ||
    event == "SANDBOX_START_WORKSPACE"
  )
    return "SANDBOX";
  return "STUDENT_WORKSPACE";
};
