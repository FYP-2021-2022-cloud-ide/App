import {
  useState,
  useEffect,
  useCallback,
  memo,
  Fragment,
  forwardRef,
} from "react";
import { ReplyIcon } from "@heroicons/react/outline";
import { useCnails } from "../contexts/cnails";
import EmptyDiv from "../components/EmptyDiv";
import { notificationAPI } from "../lib/api/notificationAPI";
import { RefreshIcon, TrashIcon } from "@heroicons/react/solid";
import DataTable, {
  TableColumn,
  createTheme,
} from "react-data-table-component";
import { Notification } from "../lib/cnails";
import moment from "moment";
import Loader from "../components/Loader";
import myToast from "../components/CustomToast";


import React from "react";
import { useRouter } from "next/router";
import _ from "lodash";
import { MyMarkDown } from "../components/MyMarkdown";
import PaginationComponent from "../components/table/PaginationComponent";
import { ExpandRowToggled } from "react-data-table-component/dist/src/DataTable/types";
import { errorToToastDescription } from "../lib/errorHelper";
import { CLICK_TO_REPORT } from "../lib/constants";
import MessageReplyForm from "../components/forms/MessageReplyForm";

type Course = {
  fullCode: string;
  id: string;
};

const notificationToCourse = (notification: Notification): Course => {
  return notification.section_id
    ? {
      fullCode: `${notification.courseCode} (${notification.sectionCode})`,
      id: notification.section_id,
    }
    : undefined;
};

const ExpandedComponent = memo(
  ({ data }: { data: Notification }) => {
    return (
      <div className=" bg-gray-50 dark:bg-black/20 p-2 dark:text-gray-300 border-b border-[#D5D6D8] dark:border-[#2F3947] ">
        <MyMarkDown text={data.body} />
      </div>
    );
  },
  (prevProps, nextProps) => {
    return _.isEqual(prevProps.data, nextProps.data);
  }
);

const MessageTable = () => {
  const router = useRouter();
  const target = router.query.id;
  const [selectedRows, setSelectedRows] = useState<Notification[]>([]);
  const { userId, notifications, fetchNotifications } = useCnails();
  const [pending, setPending] = useState(true);
  const [replyFormOpen, setReplyFormOpen] = useState<boolean>(false);
  const [replyTarget, setReplyTarget] = useState<Notification>();
  const [readDuringUnreadFiltering, setReadDuringUnreadFiltering] = useState<
    Notification[]
  >([]);
  const [onlyUnread, setOnlyUnread] = useState<boolean>(false);
  const [onlyCourses, setOnlyCourses] = useState<string[]>([]);
  let filterNotifications = notifications
    .filter((notification) => {
      return (
        readDuringUnreadFiltering.some((j) => j.id == notification.id) ||
        !onlyUnread ||
        (onlyUnread && !notification.read)
      );
    })
    .filter((notification) => {
      return (
        onlyCourses.length == 0 ||
        onlyCourses
          .map((course) => JSON.parse(course) as Course)
          .some((course) => course.id == notification.section_id)
      );
    });

  const { removeNotification, sendNotification, changeNotificationRead } =
    notificationAPI;
  useEffect(() => {
    async function temp() {
      await fetchNotifications();
      setPending(false);
    }
    temp();
  }, []);
  useEffect(() => {
    const cell = document.querySelector(
      "div[data-column-id='Read']"
    ) as HTMLElement;
    if (cell) cell.style.padding = "0px";
  });
  const columns: TableColumn<Notification>[] = [
    {
      id: "Read",
      name: <></>,
      cell: (row) =>
        row.read ? (
          <></>
        ) : (
          <div
            className="rounded-full w-3 h-3 bg-blue-500"
            title="Not Read"
          ></div>
        ),
      maxWidth: "16px",
      minWidth: "0px",
      style: {
        paddingLeft: "0px",
        paddingRight: "0px",
        width: "16px",
      },
    },
    {
      id: "Title",
      name: "Title",
      selector: (row) => row.title,
    },
    {
      id: "Course",
      name: "Course",
      selector: (row) =>
        row.section_id ? `${row.courseCode} (${row.sectionCode})` : "N/A",
      maxWidth: "200px",
    },
    {
      id: "People",
      name: "People",
      cell: (row) => (
        <div className="flex flex-col items-start">
          <p>{row.sender.name}</p>
          <p className="text-2xs text-emerald-600 dark:text-emerald-400">
            @{row.sender.sub}
          </p>
        </div>
      ),
    },
    {
      id: "Time",
      name: "Time",
      selector: (row) => moment(row.sentAt).format("YYYY-MM-DD HH:mm"),
      sortable: true,
      sortFunction: (a, b) => {
        if (moment(a.sentAt) > moment(b.sentAt)) return -1;
        else if (moment(a.sentAt) < moment(b.sentAt)) return 1;
        else return 0;
      },
      maxWidth: "150px",
    },
    {
      id: "Actions",
      name: "Actions",
      maxWidth: "200px",
      cell: (row) => {
        const actions: {
          text: string;
          icon: JSX.Element;
          onClick: () => void;
          shown?: boolean; // default is shown
        }[] = [
            {
              text: row.read ? "Mark as unread" : "Mark as read",
              icon: (
                <div className="w-5 h-5 flex items-center justify-center">
                  {row.read ? (
                    <div className="rounded-full w-3 h-3 border-2 bg-white  border-white "></div>
                  ) : (
                    <div className="rounded-full w-3 h-3 border-2  border-white "></div>
                  )}
                </div>
              ),
              onClick: async () => {
                if (!row.read) {
                  const response = await changeNotificationRead(
                    userId,
                    [row.id],
                    true
                  );
                  if (!response.success) {
                    console.error("fail to read messages");
                  }
                  await fetchNotifications();
                } else {
                  const response = await changeNotificationRead(
                    userId,
                    [row.id],
                    false
                  );
                  if (!response.success) {
                    console.error("fail to unread messages");
                  }
                  await fetchNotifications();
                }
              },
            },
            {
              text: "Reply",
              icon: <ReplyIcon className="w-5 h-5 text-white" />,
              onClick: () => {
                setReplyFormOpen(true);
                setReplyTarget(row)
              },
              shown: !row.allow_reply, //bug:this does not show when allow reply is true
            },
            {
              text: "Delete message",
              icon: <TrashIcon className="w-5 h-5 text-white"></TrashIcon>,
              onClick: async () => {
                const response = await removeNotification(userId, [row.id]);
                if (response.success) {
                  setSelectedRows(selectedRows.filter((r) => r.id != row.id));
                  myToast.success(`A message has been removed.`);
                }
                await fetchNotifications();
              },
            },
          ];
        return (
          <div className="flex flex-row space-x-2">
            {actions.map((action, index) => {
              return Boolean(action.shown) ? (
                <Fragment key={index}></Fragment>
              ) : (
                <button
                  key={index}
                  className="btn bg-gray-500/50  rounded p-1 border-none min-h-0 h-auto w-auto dark:hover:bg-white/30"
                  onClick={action.onClick}
                  title={action.text}
                >
                  {action.icon}
                </button>
              );
            })}
          </div>
        );
      },
    },
  ];

  const handleChange = useCallback(
    ({ selectedRows: newSelectedRows }) => {
      if (newSelectedRows) {
        let set1 = new Set(selectedRows);
        let set2 = new Set(newSelectedRows);
        if (
          set1.size != set2.size ||
          !selectedRows.every((value) => set2.has(value))
        ) {
          setSelectedRows(newSelectedRows);
        }
      }
    },
    [selectedRows]
  );

  const getCourses = (): Course[] => {
    if (notifications.length == 0) return [];
    const courses = _.groupBy(notifications, (notification) => {
      return JSON.stringify(notificationToCourse(notification));
    });
    return Object.keys(courses).map((course) => JSON.parse(course));
  };

  const onRowExpandToggled: ExpandRowToggled<Notification> = async (
    expand,
    notification
  ) => {
    // read notification
    if (expand && onlyUnread)
      setReadDuringUnreadFiltering([
        ...readDuringUnreadFiltering,
        notification,
      ]);
    if (expand && !notification.read) {
      const response = await changeNotificationRead(
        userId,
        [notification.id],
        true
      );
      if (!response.success) console.error("fail to read messages");
      // should not fetch notification here because it will refresh the table and make row disappear
      await fetchNotifications();
    }
  };

  createTheme(
    "cnails-dark",
    {
      background: {
        default: "transparent",
      },
    },
    "light"
  );

  if (pending) {
    return (
      <div className="bg-gray-300 dark:bg-gray-700 rounded-lg w-full h-96 flex items-center justify-center overflow-hidden">
        <Loader />
      </div>
    );
  }
  return (
    <>
      {notifications.length == 0 ? (
        <EmptyDiv message="You have no notifications."></EmptyDiv>
      ) : (
        // only if user have notifications
        <div className="flex flex-row space-x-2">
          <div className="min-w-[12rem] h-min  flex flex-col space-y-2 p-3 border rounded-md text-xs bg-gray-100 dark:bg-black/50   border-[#D5D6D8] dark:border-[#2F3947] ">
            <p className="text-lg font-bold">Facet</p>
            <label htmlFor="only not read" className="whitespace-nowrap">
              <span>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setOnlyUnread(e.target.checked);
                    setReadDuringUnreadFiltering([]);
                  }}
                />
              </span>
              <span className="whitespace-nowrap ml-2">Unread</span>
            </label>
            <div className="flex flex-col w-max">
              <p className="text-base font-semibold">Filter Course</p>
              {getCourses().map((course) => {
                return (
                  <label
                    htmlFor="only not read"
                    className="whitespace-nowrap"
                    key={course.id}
                  >
                    <span>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setOnlyCourses([
                              ...onlyCourses,
                              JSON.stringify(course),
                            ]);
                          } else {
                            setOnlyCourses([
                              ...onlyCourses.filter(
                                (c) => JSON.parse(c).id != course.id
                              ),
                            ]);
                          }
                        }}
                      />
                    </span>
                    <span className="whitespace-nowrap ml-2">
                      {course.fullCode}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="w-full ">
            <DataTable
              columns={columns}
              data={filterNotifications}
              selectableRows
              persistTableHead
              noDataComponent={<></>}
              onSelectedRowsChange={handleChange}
              defaultSortAsc
              defaultSortFieldId={"Time"}
              expandableRows
              pagination
              // To pre-select rows based on your data
              expandableRowExpanded={(row) => {
                return target != null && row.id == target;
              }}
              paginationComponent={(props) => (
                <PaginationComponent
                  options={[15, 20, 30, 50]}
                  actions={[
                    {
                      text: "Refresh",
                      icon: (
                        <RefreshIcon className="w-5 h-5 text-white"></RefreshIcon>
                      ),
                      onClick: async () => {
                        await fetchNotifications();
                      },
                    },
                    {
                      text: "Delete messages",
                      icon: (
                        <TrashIcon className="w-5 h-5 text-white"></TrashIcon>
                      ),
                      onClick: async () => {
                        const response = await removeNotification(
                          userId,
                          selectedRows.map((r) => r.id)
                        );
                        if (response.success) {
                          setSelectedRows([]);
                          myToast.success(
                            `${selectedRows.length} messages has been removed.`
                          );
                        }
                        await fetchNotifications();
                      },
                      shown: selectedRows.length != 0,
                    },
                    {
                      text: "Mark as read",
                      icon: (
                        <div className="w-5 h-5 flex items-center justify-center">
                          <div className="rounded-full w-3 h-3 border-2  border-white "></div>
                        </div>
                      ),
                      onClick: async () => {
                        const response = await changeNotificationRead(
                          userId,
                          selectedRows.map((row) => row.id),
                          true
                        );
                        if (!response.success) {
                          console.error("fail to read messages");
                        }
                        await fetchNotifications();
                      },
                      shown: selectedRows.length != 0,
                    },
                    {
                      text: "Mark as unread",
                      icon: (
                        <div className="w-5 h-5 flex items-center justify-center">
                          <div className="rounded-full w-3 h-3 border-2 bg-white  border-white "></div>
                        </div>
                      ),
                      onClick: async () => {
                        const response = await changeNotificationRead(
                          userId,
                          selectedRows.map((row) => row.id),
                          false
                        );
                        if (!response.success) {
                          console.error("fail to unread messages");
                        }
                        await fetchNotifications();
                      },
                      shown: selectedRows.length != 0,
                    },
                  ]}
                  {...props}
                  selectedRows={selectedRows}
                />
              )}
              expandOnRowClicked
              expandableRowsHideExpander
              onRowExpandToggled={onRowExpandToggled}
              theme="cnails-dark"
              selectableRowSelected={(row) => {
                return selectedRows.map((n) => n.id).includes(row.id);
              }}
              expandableRowsComponent={ExpandedComponent}
            />
            {filterNotifications.length == 0 ? (
              <div className="flex flex-row bg-gray-100 dark:bg-black/50 rounded-b-md p-2 justify-center items-center rdt_pagination h-56 text-gray-400">
                No messages after faceting
              </div>
            ) : (
              <></>
            )}
          </div>
          <MessageReplyForm isOpen={replyFormOpen} setOpen={setReplyFormOpen} target={replyTarget} />
        </div>
      )}
      <button
        className="bg-green-500 text-white px-2 rounded h-min"
        onClick={async () => {
          const response = await sendNotification(
            "test",
            "this is a test message. This button should be hidden. ".repeat(
              Math.ceil(Math.random() * 10)
            ),
            userId,
            userId,
            Math.random() > 0.5,
            "e2de12fe-ba9c-4ded-8496-8428446b96d4"
          );
          if (response.success) {
            fetchNotifications();
          } else {
            myToast.error({
              title: "Fail to send message",
              description: errorToToastDescription(response.error),
              comment: CLICK_TO_REPORT,
            });
          }
        }}
      >
        Send test message
      </button>
    </>
  );
};

export default function Home() {
  return (
    <div className="px-10 mb-10">
      <p className="text-3xl  font-bold mb-2 text-gray-600 dark:text-gray-300">
        {" 📬 "} Messages
      </p>

      <MessageTable />
    </div>
  );
}
