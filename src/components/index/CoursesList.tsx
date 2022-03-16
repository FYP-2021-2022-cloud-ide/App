import CourseCard from "./CourseCard";
import { Course } from "../../lib/cnails";
import { useEffect, useState } from "react";
import moment from "moment";
import { generalAPI } from "../../lib/api/generalAPI";
import { useCnails } from "../../contexts/cnails";

export interface props {
  courses: Course[];
}

type SortOrder = "time" | "title";

const CoursesList = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("title");
  const [courses, setCourses] = useState<Course[]>();
  const { courseList } = generalAPI;
  const { sub } = useCnails();
  const fetchCourses = async () => {
    const response = await courseList(sub);
    if (response.success) {
      const courses = response.courses.map((course) =>
        Object.assign(
          {},
          {
            ...course,
            sectionRole: course.sectionRole.toUpperCase() as
              | "INSTRUCTOR"
              | "STUDENT",
          }
        )
      );
      setCourses(courses);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  // don't need to go down
  if (!courses) return <></>;

  return (
    <div
      id="course-grid"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 "
    >
      {courses
        .sort((a, b) => {
          if (sortOrder === "time")
            return a.courseCode.localeCompare(b.courseCode);
          if (sortOrder === "title")
            return moment(a.lastUpdateTime) > moment(b.lastUpdateTime) ? -1 : 1;
          else return 0;
        })
        .map((course, index) => {
          var link =
            "/course/" +
            course.sectionID +
            "/" +
            course.sectionRole.toLowerCase();
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
