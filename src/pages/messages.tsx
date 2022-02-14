import { Disclosure, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect, useCallback } from "react";
import { ReplyIcon } from "@heroicons/react/outline";
import Modal from "../components/Modal";
import NotificationSend from "../components/NotificationSend";
import { useCnails } from "../contexts/cnails";
import EmptyDiv from "../components/EmptyDiv";
import { notificationAPI } from "../lib/api/notificationAPI";
import { TrashIcon } from "@heroicons/react/solid";
import DataTable, {
  PaginationComponentProps,
  TableColumn,
  createTheme,
} from "react-data-table-component";
import { ActionType, Notification } from "../lib/cnails";
import moment from "moment";
import Loader from "../components/Loader";
import myToast from "../components/CustomToast";

const MessageTable = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const { userId, notifications, fetchNotifications } = useCnails();
  const [pending, setPending] = useState(true);
  const { removeNotification } = notificationAPI;
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
        <button
          onClick={async () => {
            const response = await removeNotification(userId, [row.id]);
            if (response.success) {
              // setNotifications(await fetchNotifications());
              await fetchNotifications(userId);
            }
          }}
        >
          delete
        </button>
      ),
    },
  ];

  const handleChange = useCallback(({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    setSelectedRows(selectedRows);
  }, []);

  const options = [10, 15, 20, 30];

  const PaginationComponent = (props: PaginationComponentProps) => {
    const {
      onChangeRowsPerPage,
      rowCount,
      rowsPerPage,
      currentPage,
      onChangePage,
    } = props;
    const top = rowsPerPage * (currentPage - 1) + 1;
    const bottom = Math.min(rowsPerPage + top - 1, rowCount);
    return (
      <div className="flex flex-row bg-gray-100 dark:bg-gray-700 rounded-b-md p-2 justify-between items-center text-gray-700 dark:text-gray-300">
        <div>
          {selectedRows.length != 0 && (
            <>
              <p className="text-gray-700 dark:text-gray-300 text-xs">
                Selecting {selectedRows.length} of {rowCount}
              </p>
              <div className="flex flex-row items-center space-x-2">
                <button
                  className="bg-gray-500 rounded p-1"
                  onClick={async () => {
                    console.log(selectedRows.map((r) => r.id));
                    const response = await removeNotification(
                      userId,
                      selectedRows.map((r) => r.id)
                    );
                    if (response.success) {
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
            </>
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
          <div className="btn-group border-0 outline-none ">
            <button
              disabled={currentPage == 1}
              onClick={() => {
                onChangePage(1, rowCount);
              }}
              className="btn btn-xs bg-gray-400 dark:bg-gray-900 dark:hover:bg-gray-800 border-0 outline-none"
            >
              {"|<"}
            </button>
            <button
              disabled={currentPage == 1}
              onClick={() => {
                onChangePage(currentPage - 1, rowCount);
              }}
              className="btn btn-xs bg-gray-400 dark:bg-gray-900 dark:hover:bg-gray-800 border-0 outline-none"
            >
              {"<"}
            </button>
            <button
              disabled={currentPage == Math.ceil(rowCount / rowsPerPage)}
              onClick={() => {
                onChangePage(currentPage + 1, rowCount);
              }}
              className="btn btn-xs bg-gray-400 dark:bg-gray-900 dark:hover:bg-gray-800 border-0 outline-none"
            >
              {">"}
            </button>
            <button
              disabled={currentPage == Math.ceil(rowCount / rowsPerPage)}
              onClick={() => {
                onChangePage(Math.ceil(rowCount / rowsPerPage), rowCount);
              }}
              className="btn btn-xs bg-gray-400 dark:bg-gray-900 dark:hover:bg-gray-800 border-0 outline-none"
            >
              {">|"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  createTheme(
    "solarized",
    {
      text: {
        primary: "#268bd2",
        secondary: "#2aa198",
      },
      background: {
        default: "#002b36",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={notifications}
        selectableRows
        onSelectedRowsChange={handleChange}
        defaultSortFieldId={"Time"}
        pagination
        paginationComponent={PaginationComponent}
        progressPending={pending}
        progressComponent={<Loader />}
        theme="solarized"
        noDataComponent={
          <EmptyDiv message="You have no notifications."></EmptyDiv>
        }
      />
    </>
  );
};

export default function Messages() {
  const cols = ["Sender", "Title", "Time", "Reply", "Delete"];
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
      <button
        className="mx-2 w-fit rounded-md px-4 py-2 bg-green-500 hover:bg-green-600 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        onClick={async () => {
          const response = await sendNotification(
            "test",
            "test body",
            userId,
            userId,
            true
          );
        }}
      >
        send something to yourself (testing){" "}
      </button>
      <MessageTable></MessageTable>
    </div>
  );
}
