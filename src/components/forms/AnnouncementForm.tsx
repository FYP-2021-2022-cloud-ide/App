import { useInstructor } from "../../contexts/instructor";
import ModalForm from "../ModalForm/ModalForm";
import { FormStructure } from "../ModalForm/types";

export type AnnouncementFormData = {
  course_announcement: {
    title: string;
    content: string;
    allow_reply: boolean;
  };
};

export type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AnnouncementForm = ({ isOpen, setOpen }: Props) => {
  const { broadcastAnnouncement } = useInstructor();
  return (
    <ModalForm
      isOpen={isOpen}
      setOpen={setOpen}
      title={"Course Annoucement"}
      size="lg"
      formStructure={
        {
          course_announcement: {
            entries: {
              title: {
                type: "input",
                defaultValue: "",
                placeholder: ``,
                emptyValue: "",
                label: "Title",
                validate: (data) => {
                  if (data.course_announcement.title == "")
                    return { ok: false, message: "Title cannot be empty" };
                  else return { ok: true, message: "" };
                },
              },
              content: {
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
        } as FormStructure<AnnouncementFormData>
      }
      clickOutsideToClose
      escToClose
      onEnter={async ({ course_announcement: data }) => {
        await broadcastAnnouncement(data.title, data.content, data.allow_reply);
      }}
    ></ModalForm>
  );
};

export default AnnouncementForm;
