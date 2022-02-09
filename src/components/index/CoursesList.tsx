import CourseCard from "./CourseCard";
import { Course } from "../../lib/cnails";

export interface props {
  courses: Course[];
}

const CoursesList = ({ courses }: props) => {
  return (
    <div className="flex flex-col my-4">
      <div className="my-4 text-gray-600 dark:text-gray-300 font-bold text-xl ">
        Courses
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {courses.map((course: Course) => {
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
            ></CourseCard>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesList;
