import _ from "lodash";
import { Message } from "./cnails";

export type Course = {
  fullCode: string;
  id: string;
};

export const messageToCourse = (message: Message): Course => {
  return message.section_id
    ? {
        fullCode: `${message.courseCode} (${message.sectionCode})`,
        id: message.section_id,
      }
    : undefined;
};

export const getCourses = (messages: Message[]): Course[] => {
  if (messages.length == 0) return [];
  const courses = _.groupBy(messages, (message) => {
    return JSON.stringify(messageToCourse(message));
  });
  return Object.keys(courses).map((course) => JSON.parse(course));
};
