/**
 * 
 * store all the cnails object type
 */

export type Environment = {
    id: string;
    imageId: string;
    libraries: string;
    environmentName: string;
    description: string;
};

export type Course = {
    sectionID: string;
    courseCode: string;
    section: string;
    name: string;
    sectionRole: "INSTRUCTOR" | "STUDENT";
    lastUpdateTime: string;
}