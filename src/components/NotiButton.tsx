import { Popover, Transition } from "@headlessui/react";
import { BellIcon, MailIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Message } from "../lib/cnails";
import { useCnails } from "../contexts/cnails";
import { useRouter } from "next/router";
import moment from "moment";
import { useMessaging } from "../contexts/messaging";

export const maxShow = 5;

const MoreButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="text-sm flex  justify-center items-center cursor-pointer py-3 rounded-lg  text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500 ring-opacity-5"
    >
      <div className="flex flex-row space-x-2 items-center">
        <p>more messages</p>
        <MailIcon className="w-4 h-4"></MailIcon>
      </div>
    </div>
  );
};

const NotificationBtn = ({ num }: { num: number }) => {
  return (
    <div className=" flex item-center select-none" id="message_alarm_btn ">
      <Popover.Button title="Notification" className="indicator">
        {num == 0 || (
          <div className="indicator-item badge badge-info">{num}</div>
        )}
        <BellIcon className="top-bar-icon"></BellIcon>
      </Popover.Button>
    </div>
  );
};

export default function NotiButton() {
  const { messages } = useMessaging();
  let filterNotifications = messages.filter((message) => !message.read);
  const router = useRouter();
  return (
    <Popover className="sm:relative z-[1] ">
      {({ open, close }) => (
        <>
          <NotificationBtn num={filterNotifications?.length} />
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="notification-popover absolute z-1 min-w-fit  mt-3 right-10 sm:right-0 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-700 p-2 w-64 sm:w-96">
                {filterNotifications && filterNotifications?.length == 0 ? (
                  <div className="text-gray-400 bg-white dark:text-gray-300 dark:bg-gray-700  flex flex-col items-center p-5 select-none">
                    You have no unread notifications
                  </div>
                ) : (
                  // the notification
                  <div className="flex  flex-col space-y-1 select-none ">
                    <p className="text-2xs dark:text-gray-300">
                      Showing {Math.min(filterNotifications.length, maxShow)} of{" "}
                      {filterNotifications.length} unread message
                      {filterNotifications.length == 1 ? "" : "s"}
                    </p>
                    {filterNotifications!
                      .sort((a, b) =>
                        moment(a.sentAt) > moment(b.sentAt) ? -1 : 1
                      )
                      .slice(0, maxShow)
                      .map((item: Message) => (
                        <Fragment key={item.id}>
                          <div
                            onClick={() => {
                              router.push(`/messages?id=${item.id}`);
                              close();
                            }}
                            className="w-full cursor-pointer flex flex-col  items-start p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                          >
                            {/* <div className="flex flex-row space-x-2"> */}
                            <p
                              id="title"
                              className=" whitespace-nowrap line-clamp-1 text-sm font-medium text-gray-900 dark:text-gray-200 "
                            >
                              {item.title}
                            </p>
                            {/* </div> */}
                            <p
                              id="body"
                              className="max-w-full text-xs text-gray-500 dark:text-gray-300  line-clamp-4"
                            >
                              {item.body}
                            </p>
                            <p
                              id="sender-sub"
                              className="text-emerald-600 dark:text-emerald-300 text-2xs"
                            >
                              {item.courseCode} ({item.sectionCode}) @
                              {item.sender.sub}
                            </p>
                            <p
                              id="time"
                              className="text-2xs text-gray-400 dark:text-gray-400"
                            >
                              {moment(item.sentAt).format("YYYY-MM-DD HH:mm")}
                            </p>
                          </div>
                          <div className="h-0.5 rounded-full w-full bg-gray-100 dark:bg-gray-500"></div>
                        </Fragment>
                      ))}
                    <MoreButton
                      onClick={() => {
                        router.push("/messages");
                        close();
                      }}
                    />
                  </div>
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
