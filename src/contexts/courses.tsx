import React, { createContext, useContext, useEffect, useState } from "react";
import myToast from "../components/CustomToast";
import { generalAPI } from "../lib/api/generalAPI";
import { Course } from "../lib/cnails";
import { errorToToastDescription } from "../lib/errorHelper";
import { useCnails } from "./cnails";

type CourseContextState = {
  courses: Course[];
  sortOrder: SortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
};

const CourseContext = createContext({} as CourseContextState);

export const useCourses = () => useContext(CourseContext);

type SortOrder = "time" | "title";

export const CourseProvider = ({ children }: { children: JSX.Element }) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("title");
  const [courses, setCourses] = useState<Course[]>();
  const { courseList } = generalAPI;
  const { sub } = useCnails();
  const fetchCourses = async () => {
    const response = await courseList(sub);
    if (response.success) {
      const courses = response.courses.map((course) => {
        return {
          ...course,
          sectionRole: course.sectionRole.toUpperCase() as
            | "INSTRUCTOR"
            | "STUDENT",
        };
      });
      setCourses(courses);
    } else {
      console.error("Fail to fetch courses", response.error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  // don't need to go down
  if (!courses) return <></>;
  return (
    <CourseContext.Provider
      value={{
        sortOrder,
        setSortOrder,
        courses,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
