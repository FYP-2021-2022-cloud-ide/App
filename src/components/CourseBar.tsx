import { TerminalIcon } from "@heroicons/react/solid";
import { SpeakerphoneIcon } from "@heroicons/react/outline";

interface Props {
  /**
   * e.g. COMP2012
   */
  courseCode: string;
  /**
   * e.g. L01, LA01, T01
   */
  sectionCode: string;
  /**
   * e.g. Introduction to computer science
   */
  courseTitle: string;
  /**
   * The user role in this course
   */
  role: "INSTRUCTOR" | "STUDENT";
}

const CourseBar = ({ courseCode, sectionCode, courseTitle, role }: Props) => {
  return (
    <div
      id="course-bar"
      className="flex flex-row justify-start space-x-1 sm:space-x-2 items-center text-gray-700 dark:text-gray-300"
    >
      <TerminalIcon className="w-7 h-7"> </TerminalIcon>
      <p className="text-base sm:text-lg font-bold whitespace-nowrap">
        {courseCode} ({sectionCode})
      </p>
      <p className="text-base font-normal">{courseTitle}</p>
      <div className={`${role.toLowerCase()}-badge`}> {role}</div>
    </div>
  );
};

export default CourseBar;
