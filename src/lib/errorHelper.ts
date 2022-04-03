import { Error } from "./api/api";

export const errorToToastDescription = (error: Error) => {
  return `Error [${error.status}]: ${error.error}`;
};
