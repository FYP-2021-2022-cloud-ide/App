import { FormStructure } from "../../components/ModalForm/types";

export type AnnouncementFormData = {
  course_announcement: {
    title: string;
    announcement: string;
    allow_reply: boolean;
  };
};

const getAnnouncementFormStructure = (): FormStructure => {
  return {
    course_announcement: {
      entries: {
        title: {
          type: "input",
          defaultValue: "",
          placeholder: ``,
          emptyValue: "",
          label: "Title",
        },
        announcement: {
          type: "markdown",
          defaultValue: "",
          label: "Content",
        },
        allow_reply: {
          type: "toggle",
          defaultValue: false,
          label: "Can people reply to this announcement? ",
          description: "Can people reply to this announcement?",
        },
      },
    },
  };
};

export default getAnnouncementFormStructure;
