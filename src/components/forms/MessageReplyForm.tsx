import ModalForm from "../ModalForm/ModalForm";
import { FormStructure } from "../ModalForm/types";
import { Message } from "../../lib/cnails";
import { useMessaging } from "../../contexts/messaging";

export type MessageReplyFormData = {
    reply_message: {
        target: string;
        content: string;
        allow_reply: boolean;
    };
};


type Props = {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    /**
     * the message to reply 
     */
    target: Message
}

const MessageReplyForm = ({ isOpen, setOpen, target }: Props) => {
    const { sendMessage } = useMessaging()
    return <ModalForm
        isOpen={isOpen}
        setOpen={setOpen}
        title={"Reply Message"}
        size="lg"
        formStructure={target ? {
            reply_message: {
                entries: {
                    target: {
                        label: "Reply to",
                        type: "input",
                        defaultValue: target.sender.name,
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
            await sendMessage(
                `RE: ${target.title}`, //the title can change? or use "RE: <message title> // use "RE: <message title> thx
                data.content,
                target.sender.id, //should pass the userid of the people to reply to
                target.section_id,
                data.allow_reply,
            );
        }}
    ></ModalForm>
}

export default MessageReplyForm