import { FormStructure } from "../../components/ModalForm/types";

export type MessageReplyFormData = {
  reply_message: {
    target: string;
    message: string;
  };
};

const getMessageReplyFormStructure = (
  targets: { id: string; sub: string; name: string }[]
): FormStructure => {
  return {
    reply_message: {
      entries: {
        target: {
          label: "Reply to",
          type: "input",
          defaultValue: targets.map((t) => t.name).join(", "),
          disabled: true,
        },
        message: {
          label: "Message",
          type: "markdown",
          defaultValue: "",
        },
      },
    },
  };
};

export default getMessageReplyFormStructure;
