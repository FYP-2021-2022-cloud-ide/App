import { AnnouncementRequest, SuccessStringResponse } from "./api";

const courseAPI = {
  sendNotificationAnnouncement: async (req: AnnouncementRequest) => {
    return (await (
      await fetch("/api/notification/sendNotificationAnnouncement", {
        method: "POST",
        body: JSON.stringify(req),
      })
    ).json()) as SuccessStringResponse;
  },
};

export default courseAPI;
