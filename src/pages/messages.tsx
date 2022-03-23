import { useState, useEffect, useCallback, memo } from "react";
import { ReplyIcon } from "@heroicons/react/outline";
import { useCnails } from "../contexts/cnails";
import EmptyDiv from "../components/EmptyDiv";
import { notificationAPI } from "../lib/api/notificationAPI";
import { TrashIcon } from "@heroicons/react/solid";
import DataTable, {
  TableColumn,
  createTheme,
} from "react-data-table-component";
import { Notification } from "../lib/cnails";
import moment from "moment";
import Loader from "../components/Loader";
import myToast from "../components/CustomToast";
import ModalForm from "../components/ModalForm/ModalForm";
import { getMessageReplyFormStructure } from "../lib/forms";
import React from "react";
import { useRouter } from "next/router";
import _ from "lodash";
import { MyMarkDown } from "../components/MyMarkdown";
import PaginationComponent from "../components/table/PaginationComponent";

const ExpandedComponent = memo(
  ({ data }: { data: Notification }) => {
    return (
      <div className=" bg-gray-50 dark:bg-black/10 p-2 dark:text-gray-300 border-b border-[#D5D6D8] dark:border-[#2F3947]">
        <MyMarkDown text={data.body} />
        {/* <p>{data.body}</p> */}
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
  const [replyTarget, setReplyTarget] = useState<
    { id: string; name: string; sub: string }[]
  >([]);
  const { removeNotification, sendNotification } = notificationAPI;
  useEffect(() => {
    async function temp() {
      await fetchNotifications(userId);
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
      selector: (row) => row.course ?? "N/A",
      maxWidth: "100px",
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
      selector: (row) => moment(row.updatedAt).format("YYYY-MM-DD HH:mm"),
      sortable: true,
      sortFunction: (a, b) => {
        if (moment(a.updatedAt) > moment(b.updatedAt)) return -1;
        else if (moment(a.updatedAt) < moment(b.updatedAt)) return 1;
        else return 0;
      },
      maxWidth: "150px",
    },
    {
      id: "Actions",
      name: "Actions",
      cell: (row) => {
        const actions: {
          text: string;
          icon: JSX.Element;
          onClick: () => void;
          shown?: boolean; // default is shown
        }[] = [
          {
            text: "Mark as read",
            icon: (
              <div className="w-5 h-5 flex items-center justify-center">
                {row.read ? (
                  <div className="rounded-full w-3 h-3 border-2  border-white "></div>
                ) : (
                  <div className="rounded-full w-3 h-3 border-2 bg-white border-white "></div>
                )}
              </div>
            ),
            onClick: () => {
              //
            },
          },
          {
            text: "Reply",
            icon: <ReplyIcon className="w-5 h-5 text-white" />,
            onClick: () => {
              setReplyTarget([row.sender]);
              setReplyFormOpen(true);
            },
            shown: row.allow_reply,
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
              await fetchNotifications(userId);
            },
          },
        ];
        return (
          <div className="flex flex-row space-x-2">
            {actions.map((action) => {
              return Boolean(action.shown) ? (
                <></>
              ) : (
                <button
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
        <DataTable
          columns={columns}
          data={notifications}
          selectableRows
          onSelectedRowsChange={handleChange}
          defaultSortAsc
          defaultSortFieldId={"Time"}
          expandableRows
          pagination
          expandableRowExpanded={(row) => {
            return target != null && row.id == target;
          }}
          paginationComponent={(props) => (
            <PaginationComponent
              options={[15, 20, 30, 50]}
              actions={[
                {
                  text: "Delete messages",
                  icon: <TrashIcon className="w-5 h-5 text-white"></TrashIcon>,
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
                    await fetchNotifications(userId);
                  },
                },
              ]}
              {...props}
              selectedRows={selectedRows}
            />
          )}
          expandOnRowClicked
          expandableRowsHideExpander
          onRowExpandToggled={() => {}}
          theme="cnails-dark"
          selectableRowSelected={(row) => {
            return selectedRows.map((n) => n.id).includes(row.id);
          }}
          expandableRowsComponent={ExpandedComponent}
        />
      )}
      <ModalForm
        isOpen={replyFormOpen}
        setOpen={setReplyFormOpen}
        title={"Reply Message"}
        size="lg"
        formStructure={getMessageReplyFormStructure(replyTarget)}
        clickOutsideToClose
        escToClose
        onEnter={async ({ reply_message: data }) => {
          const response = await sendNotification(
            "Replytest", //the title can change? or use "RE: <message title>
            data.message,
            userId,
            userId, //should pass the userid of the people to reply to
            true
          );
          if (response.success) {
            fetchNotifications(userId);
          }
          setReplyFormOpen(false);
        }}
        onClose={() => {
          setReplyTarget([]);
        }}
      ></ModalForm>
    </>
  );
};

export default function Messages() {
  return (
    <div className="px-10 mb-10">
      <p className="text-3xl  font-bold mb-2 text-gray-600 dark:text-gray-300">
        {" 📬 "} Messages
      </p>

      <MessageTable></MessageTable>
    </div>
  );
}
