import {
  SectionUserInfoResponse,
  GetUserDataResponse,
  CourseListResponse,
  SuccessStringResponse,
} from "./api";

const generalAPI = {
  updateUserData: async (
    sub: string,
    darkMode: boolean,
    bio: string
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/updateUserData?sub=" + sub, {
      method: "POST",
      body: JSON.stringify({
        darkMode: darkMode,
        bio: bio,
      }),
    });
    return res.json();
  },

  getUserData: async (sub: string): Promise<GetUserDataResponse> => {
    var res = await fetch("/api/getUserData?sub=" + sub, {
      method: "GET",
    });
    return res.json();
  },

  courseList: async (sub: string): Promise<CourseListResponse> => {
    var res = await fetch("/api/listCourses?sub=" + sub, {
      method: "GET",
    });
    return res.json();
  },

  getSectionUserInfo: async (
    sectionid: string,
    sub: string
  ): Promise<SectionUserInfoResponse> => {
    var res = await fetch(
      "/api/getSectionUserInfo?sectionid=" + sectionid + "&sub=" + sub,
      {
        method: "GET",
      }
    );
    return res.json();
  },
};

export { generalAPI };
