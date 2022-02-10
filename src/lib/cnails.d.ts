/**
 *
 * store all the cnails object type
 */

export type { SectionRole, Environment, Template, Course, SectionUserInfo };

type SectionRole = "INSTRUCTOR" | "STUDENT";

type Environment = {
  id: string;
  imageId: string;
  libraries: string;
  environmentName: string;
  description: string;
};

type Template = {
  id: string;
  name: string;
  description: string;
  imageId: string;
  assignment_config_id: string;
  storage: string;
  containerID: string;
  active: boolean;
  isExam: boolean;
  timeLimit: number;
  allow_notification: boolean;
};

type Course = {
  sectionID: string;
  courseCode: string;
  section: string;
  name: string;
  sectionRole: SectionRole;
  lastUpdateTime: string;
};

type SectionUserInfo = {
  courseCode: string;
  courseTitle?: string;
  sectionCode: string;
  sectionId: string;
  sectionUserId: string;
  role: SectionRole;
  sub: string;
};
