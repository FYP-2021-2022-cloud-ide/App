import { useCnails } from "../../contexts/cnails";
import { useInstructor } from "../../contexts/instructor";
import courseAPI from "../../lib/api/courses";
import { CLICK_TO_REPORT } from "../../lib/constants";
import { errorToToastDescription } from "../../lib/errorHelper";
import myToast from "../CustomToast";
import ModalForm from "../ModalForm/ModalForm";
import { FormStructure } from "../ModalForm/types";

export type AnnouncementFormData = {
    course_announcement: {
        title: string;
        announcement: string;
        allow_reply: boolean;
    }
}

export type Props = {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnnouncementForm = ({ isOpen, setOpen }: Props) => {
    const { userId } = useCnails();
    const { sectionUserInfo } = useInstructor()
    return <ModalForm
        isOpen={isOpen}
        setOpen={setOpen}
        title={"Course Annoucement"}
        size="lg"
        formStructure={{
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
        } as FormStructure<AnnouncementFormData>}
        clickOutsideToClose
        escToClose
        onEnter={async ({ course_announcement: data }) => {
            console.log(data);
            const response = await courseAPI.sendNotificationAnnouncement(
                {
                    allowReply: data.allow_reply,
                    body: data.announcement,
                    title: data.title,
                    senderId: userId,
                    sectionId: sectionUserInfo.sectionId
                }
            );
            if (response.success)
                myToast.success("The course announcement is sent.");
            else
                myToast.error({
                    title: "Fail to send course announcement",
                    description: errorToToastDescription(response.error),
                    comment: CLICK_TO_REPORT,
                });
        }}
    ></ModalForm>
}

export default AnnouncementForm 