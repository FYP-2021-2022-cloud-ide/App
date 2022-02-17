import { TerminalIcon } from "@heroicons/react/solid";

/**
 *
 * to add a new role, just need to change the Props role type, don't need to change other things.
 */

interface Props {
  courseCode: string;
  sectionCode: string;
  courseTitle: string;
  role: "INSTRUCTOR" | "STUDENT";
}

const CourseBar = ({ courseCode, sectionCode, courseTitle, role }: Props) => {
  return (
    <div className="flex flex-row justify-start gap-x-4 items-center text-gray-700 dark:text-gray-300">
      <TerminalIcon className="w-7 h-7"> </TerminalIcon>
      <p className="text-lg font-bold">
        {courseCode} ({sectionCode})
      </p>
      <p className="text-base font-normal">{courseTitle}</p>
      <div className={`${role.toLowerCase()}-badge`}> {role}</div>
    </div>
  );
};

export default CourseBar;
