import { SuccessStringResponse } from "./api";

const courseAPI = {
  sendNotificationAnnouncement: async (
    allowReply: boolean,
    body: string,
    title: string,
    senderId: string,
    sectionId: string
  ) => {
    return (await (
      await fetch("/api/notification/sendNotificationAnnouncement", {
        method: "POST",
        body: JSON.stringify({
          allowReply: allowReply,
          body: body,
          title: title,
          sender: senderId,
          sectionId,
        }),
      })
    ).json()) as SuccessStringResponse;
  },
};

export default courseAPI;
