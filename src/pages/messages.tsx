import { useState, useEffect, useCallback } from "react";
import { ReplyIcon } from "@heroicons/react/outline";
import { useCnails } from "../contexts/cnails";
import EmptyDiv from "../components/EmptyDiv";
import { notificationAPI } from "../lib/api/notificationAPI";
import { TrashIcon } from "@heroicons/react/solid";
import DataTable, {
  PaginationComponentProps,
  TableColumn,
  createTheme,
} from "react-data-table-component";
import { Notification } from "../lib/cnails";
import moment from "moment";
import Loader from "../components/Loader";
import myToast from "../components/CustomToast";
import ModalForm from "../components/ModalForm";
import { getMessageReplyFormStructure } from "../lib/forms";
import React from "react";
import { useRouter } from "next/router";

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
  const columns: TableColumn<Notification>[] = [
    {
      id: "Title",
      name: "Title",
      selector: (row) => row.title,
    },
    {
      id: "People",
      name: "People",
      selector: (row) => row.sender.name,
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
    },
    {
      id: "Actions",
      name: "Actions",
      cell: (row) => (
        <div className="flex flex-row space-x-2">
          <button
            className="bg-gray-500 rounded p-1"
            onClick={async () => {
              const response = await removeNotification(userId, [row.id]);
              if (response.success) {
                setSelectedRows(selectedRows.filter((r) => r.id != row.id));
                myToast.success(`A message has been removed.`);
              }
              await fetchNotifications(userId);
            }}
          >
            <TrashIcon className="w-5 h-5 text-white"></TrashIcon>
          </button>
          {row.allow_reply && (
            <button
              className="bg-gray-500 rounded p-1"
              onClick={() => {
                setReplyTarget([row.sender]);
                setReplyFormOpen(true);
              }}
            >
              <ReplyIcon className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      ),
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

  const options = [15, 20, 30, 50];

  const PaginationComponent = (
    props: PaginationComponentProps & {
      selectedRows: Notification[];
      userId: string;
      removeNotification: any;
      setSelectedRows: any;
      fetchNotifications: any;
      options: number[];
    }
  ) => {
    const {
      onChangeRowsPerPage,
      rowCount,
      rowsPerPage,
      currentPage,
      onChangePage,
    } = props;
    const top = rowsPerPage * (currentPage - 1) + 1;
    const bottom = Math.min(rowsPerPage + top - 1, rowCount);
    useEffect(() => {
      onChangeRowsPerPage(15, currentPage);
    }, []);
    return (
      <div className="flex flex-row bg-gray-100 dark:bg-black/50 rounded-b-md p-2 justify-between items-center rdt_pagination">
        <div className="flex flex-row items-center space-x-2">
          {selectedRows.length != 0 && (
            <div>
              <p className="text-gray-700 dark:text-gray-300 text-xs">
                Selecting {selectedRows.length} of {rowCount}
              </p>
              <div className="flex flex-row items-center space-x-2">
                <button
                  className="bg-gray-500 rounded p-1"
                  onClick={async () => {
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
                  }}
                >
                  <TrashIcon className="w-5 h-5 text-white"></TrashIcon>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-row items-center space-x-2 text-sm">
          <p>Rows per page : </p>
          <select
            className=" bg-gray-200 dark:bg-gray-600"
            value={rowsPerPage}
            onChange={(e) => {
              onChangeRowsPerPage(Number(e.target.value), currentPage);
            }}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <p>
            {top}-{bottom} of {rowCount}
          </p>
          <div className="btn-group border-0 outline-none border-none ">
            <button
              disabled={currentPage == 1}
              onClick={() => {
                onChangePage(1, rowCount);
              }}
              className="btn btn-xs bg-gray-400 dark:bg-gray-800 dark:hover:bg-white/20 border-0 outline-none "
            >
              {"|<"}
            </button>
            <button
              disabled={currentPage == 1}
              onClick={() => {
                onChangePage(currentPage - 1, rowCount);
              }}
              className="btn btn-xs bg-gray-400 dark:bg-gray-800 dark:hover:bg-white/20 border-0 outline-none"
            >
              {"<"}
            </button>
            <button
              disabled={currentPage == Math.ceil(rowCount / rowsPerPage)}
              onClick={() => {
                onChangePage(currentPage + 1, rowCount);
              }}
              className="btn btn-xs bg-gray-400 dark:bg-gray-800 dark:hover:bg-white/20 border-0 outline-none"
            >
              {">"}
            </button>
            <button
              disabled={currentPage == Math.ceil(rowCount / rowsPerPage)}
              onClick={() => {
                onChangePage(Math.ceil(rowCount / rowsPerPage), rowCount);
              }}
              className="btn btn-xs bg-gray-400 dark:bg-gray-800 dark:hover:bg-white/20 border-0 outline-none"
            >
              {">|"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ExpandedComponent = ({ data }: { data: Notification }) => (
    <div className=" bg-gray-50 dark:bg-black/10 p-2 dark:text-gray-300">
      <p className="">{data.body}</p>
    </div>
  );

  createTheme(
    "good",
    {
      background: {
        default: "transparent",
      },
    },
    "light"
  );

  if (pending) {
    return (
      <div className="bg-gray-300 dark:bg-gray-700 rounded-lg w-full h-64 flex items-center justify-center overflow-hidden">
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
          paginationComponent={PaginationComponent}
          expandOnRowClicked
          expandableRowsHideExpander
          onRowExpandToggled={() => {}}
          theme="good"
          selectableRowSelected={(row) => {
            return selectedRows.map((n) => n.id).includes(row.id);
          }}
          expandableRowsComponent={ExpandedComponent}
        />
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
            Math.random() > 0.5
          );
          if (response.success) {
            fetchNotifications(userId);
          }
        }}
      >
        Send test message
      </button>
      <ModalForm
        isOpen={replyFormOpen}
        setOpen={setReplyFormOpen}
        title={"Reply Message"}
        clickOutsideToClose
        size="sm"
        formStructure={getMessageReplyFormStructure(replyTarget)}
        onEnter={(data) => {
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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage, setNotificationsPerPage] = useState(6);
  const { userId } = useCnails();
  const { sendNotification } = notificationAPI;
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentPosts = notifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  return (
    <div className="px-10 mb-10">
      <p className="text-3xl  font-bold mb-2 text-gray-600 dark:text-gray-300">
        {" 📬 "} Messages
      </p>

      <MessageTable></MessageTable>
    </div>
  );
}
