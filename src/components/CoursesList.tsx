import CourseCard from "./CourseCard";
import { Course } from "../lib/cnails";
import { useEffect, useState } from "react";
import moment from "moment";
import { generalAPI } from "../lib/api/generalAPI";
import { useCnails } from "../contexts/cnails";
import myToast from "./CustomToast";
import { errorToToastDescription } from "../lib/errorHelper";
import { CLICK_TO_REPORT } from "../lib/constants";
import { useCourses } from "../contexts/courses";

export interface props {
  courses: Course[];
}

const CoursesList = () => {
  const { courses, sortOrder } = useCourses();
  return (
    <div
      id="course-grid"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 "
    >
      {courses
        .sort((a, b) => {
          if (sortOrder === "title")
            return a.courseCode.localeCompare(b.courseCode);
          if (sortOrder === "time")
            return moment(a.lastUpdateTime) > moment(b.lastUpdateTime) ? -1 : 1;
          else return 0;
        })
        .map((course, index) => {
          var link = `/course/${
            course.sectionID
          }/${course.sectionRole.toLowerCase()}`;
          return (
            <CourseCard
              key={course.sectionID}
              link={link}
              course={course}
              zIndex={courses.length - index}
            ></CourseCard>
          );
        })}
    </div>
  );
};

export default CoursesList;
