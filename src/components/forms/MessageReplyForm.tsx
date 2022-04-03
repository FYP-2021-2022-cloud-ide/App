import { useCnails } from "../../contexts/cnails";
import { notificationAPI } from "../../lib/api/notificationAPI";

import ModalForm from "../ModalForm/ModalForm";
import { FormStructure } from "../ModalForm/types";
import { Notification } from "../../lib/cnails";

export type MessageReplyFormData = {
    reply_message: {
        target: string;
        message: string;
        allow_reply: boolean;
    };
};


type Props = {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    target: Notification
}

const MessageReplyForm = ({ isOpen, setOpen, target: notification }: Props) => {
    const { userId, fetchNotifications } = useCnails();
    const { sendNotification } = notificationAPI
    return <ModalForm
        isOpen={isOpen}
        setOpen={setOpen}
        title={"Reply Message"}
        size="lg"
        formStructure={notification ? {
            reply_message: {
                entries: {
                    target: {
                        label: "Reply to",
                        type: "input",
                        defaultValue: notification.sender.name,
                        disabled: true,
                    },
                    message: {
                        label: "Message",
                        type: "markdown",
                        defaultValue: "",
                    },
                    allow_reply: {
                        label: "Allow reply",
                        type: "toggle",
                        tooltip: "Whether the receiver and reply your message",
                        defaultValue: true,
                    }
                },
            },
        } as FormStructure<MessageReplyFormData> : {}}
        clickOutsideToClose
        escToClose
        onEnter={async ({ reply_message: data }: MessageReplyFormData) => {
            const response = await sendNotification(
                `RE: ${notification.title}`, //the title can change? or use "RE: <message title> // use "RE: <message title> thx
                data.message,
                userId,
                notification.sender.id, //should pass the userid of the people to reply to
                data.allow_reply,
                notification.section_id
            );
            if (response.success) {
                await fetchNotifications();
            }
        }}
    ></ModalForm>
}

export default MessageReplyForm