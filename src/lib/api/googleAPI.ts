import localforage from "localforage";
import { GoogleDriveListResponse, SuccessStringResponse } from "./api";

const googleAPI = {
  getLocalToken: function () {
    return localforage.getItem("google_token");
  },
  setLocalToken: function (token: string) {
    try {
      localforage.setItem("google_token", token);
    } catch (e) {
      return e;
    }
  },
  auth: async () => {
    // console.log(credentials.web)
    const response = await fetch("/api/google/auth", {
      method: "POST",
    });
    const responseJSON = await response.json();
    // console.log("message", message)
    console.log(responseJSON);
    if (responseJSON.success) {
      location.replace(responseJSON.authURL);
      return {
        status: "-1",
        error: "",
      };
    } else {
      return responseJSON.error;
    }
  },
  getAccessToken: async (code: string, sub: string) => {
    const response = await fetch("/api/google/getAccessToken", {
      method: "POST",
      body: JSON.stringify({
        code,
        sub,
      }),
    });
    const { success, message } = await response.json();
    if (!success) console.log(message);
  },
  /**
   * given the folder id, fetch the items inside this folder. Note that only items inside is returned, this api tells nothing about the data of the folder given
   * @param folderId the folder ID of google drive
   * @param sub
   * @returns
   */
  expandFolder: async (folderId, sub): Promise<GoogleDriveListResponse> => {
    const response = await fetch("/api/google/listFiles", {
      method: "POST",
      body: JSON.stringify({
        folderId,
        sub,
      }),
    });
    return response.json();
  },
  downloadFiles: async (
    sub: string,
    fileId: string,
    fileName: string,
    filePath: string,
    fileType: string
  ): Promise<SuccessStringResponse> => {
    const response = await fetch("/api/google/downloadFiles", {
      method: "POST",
      body: JSON.stringify({
        sub,
        fileId,
        fileName,
        filePath,
        fileType,
      }),
    });
    return response.json();
  },

  uploadFiles: async (
    sub: string,
    filePath: string,
    parentId: string,
    fileType: "file" | "directory"
  ): Promise<SuccessStringResponse> => {
    // const token = await this.getLocalToken()
    const response = await fetch("/api/google/uploadFiles", {
      method: "POST",
      body: JSON.stringify({
        sub,
        filePath,
        parentId,
        fileType,
      }),
    });
    return response.json();
  },
};

export { googleAPI };
