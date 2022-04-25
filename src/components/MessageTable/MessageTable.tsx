import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import React, {
  createContext,
  Fragment,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import DataTable, {
  createTheme,
  TableColumn,
} from "react-data-table-component";
import { MyMarkDown } from "../MyMarkdown";
import ActionList, { Action } from "./ActionList";
import { Message } from "../../lib/cnails";
import { useMessaging } from "../../contexts/messaging";
import { ReplyIcon } from "@heroicons/react/outline";
import { RefreshIcon, TrashIcon } from "@heroicons/react/solid";
import { ExpandRowToggled } from "react-data-table-component/dist/src/DataTable/types";
import MessageReplyForm from "../forms/MessageReplyForm";
import EmptyDiv from "../EmptyDiv";
import Facet from "./Facet";
import PaginationComponent from "./PaginationComponent";
import ExpandedComponent from "./ExpandedComponent";
import { Course } from "../../lib/messageHelper";

type MessageTableContextState = {
  selectedRows: Message[];
  setSelectedRows: React.Dispatch<React.SetStateAction<Message[]>>;
  replyFormOpen: boolean;
  setReplyFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  replyTarget: Message;
  setReplyTarget: React.Dispatch<React.SetStateAction<Message>>;
  onlyUnread: boolean;
  setOnlyUnread: React.Dispatch<React.SetStateAction<boolean>>;
  onlyCourses: string[];
  setOnlyCourses: React.Dispatch<React.SetStateAction<string[]>>;
};

const MessageTableContext = createContext({} as MessageTableContextState);

export const useMessageTable = () => useContext(MessageTableContext);

export const MessageTable = () => {
  const router = useRouter();
  const queryTarget = router.query.id;
  const [selectedRows, setSelectedRows] = useState<Message[]>([]);
  const { messages, changeMessagesRead, deleteMessages } = useMessaging();

  const [replyFormOpen, setReplyFormOpen] = useState<boolean>(false);
  const [replyTarget, setReplyTarget] = useState<Message>();
  const [readDuringUnreadFiltering, setReadDuringUnreadFiltering] = useState<
    Message[]
  >([]);
  const [onlyUnread, setOnlyUnread] = useState<boolean>(false);
  const [onlyCourses, setOnlyCourses] = useState<string[]>([]);
  let filterMessages = messages
    .filter((message) => {
      return (
        readDuringUnreadFiltering.some((j) => j.id == message.id) ||
        !onlyUnread ||
        (onlyUnread && !message.read)
      );
    })
    .filter((message) => {
      return (
        onlyCourses.length == 0 ||
        onlyCourses
          .map((course) => JSON.parse(course) as Course)
          .some((course) => course.id == message.section_id)
      );
    });

  const rowActions = useCallback(
    (row: Message) => [
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
          await changeMessagesRead([row.id], !row.read);
        },
      },
      {
        text: "Reply",
        icon: <ReplyIcon className="w-5 h-5 text-white" />,
        onClick: () => {
          setReplyFormOpen(true);
          setReplyTarget(row);
        },
        shown: !row.allow_reply, //bug:this does not show when allow reply is true
      },
      {
        text: "Delete message",
        icon: <TrashIcon className="w-5 h-5 text-white"></TrashIcon>,
        onClick: async () => {
          setSelectedRows(selectedRows.filter((r) => r.id != row.id));
          await deleteMessages([row.id]);
        },
      },
    ],
    [
      selectedRows,
      deleteMessages,
      setReplyFormOpen,
      setReplyTarget,
      changeMessagesRead,
    ]
  );

  const columns: TableColumn<Message>[] = useMemo(
    () => [
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
        minWidth: "300px",
      },
      {
        id: "Course",
        name: "Course",
        selector: (row) =>
          row.section_id ? `${row.courseCode} (${row.sectionCode})` : "N/A",
        maxWidth: "200px",
        minWidth: "150px",
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
        minWidth: "200px",
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
        minWidth: "150px",
      },
      {
        id: "Actions",
        name: "Actions",
        maxWidth: "200px",
        cell: (row) => {
          return <ActionList actions={rowActions(row)}></ActionList>;
        },
      },
    ],
    [rowActions]
  );

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

  const onRowExpandToggled: ExpandRowToggled<Message> = useCallback(
    async (expand, message) => {
      if (expand && onlyUnread)
        setReadDuringUnreadFiltering([...readDuringUnreadFiltering, message]);
      if (expand && !message.read) await changeMessagesRead([message.id], true);
    },
    [onlyUnread, changeMessagesRead, readDuringUnreadFiltering]
  );

  /**
   * this hook change the column padding of the Read row in every render because the padding is wrong
   */
  useEffect(() => {
    const cell = document.querySelector(
      "div[data-column-id='Read']"
    ) as HTMLElement;
    if (cell) cell.style.padding = "0px";
  });

  useEffect(() => {
    if (queryTarget != null) changeMessagesRead([queryTarget as string], true);
  }, [changeMessagesRead, queryTarget]);

  useEffect(() => {
    setReadDuringUnreadFiltering([]);
  }, [onlyUnread]);

  createTheme(
    "cnails-dark",
    {
      background: {
        default: "transparent",
      },
    },
    "light"
  );

  return (
    <MessageTableContext.Provider
      value={{
        selectedRows,
        setSelectedRows,
        replyFormOpen,
        setReplyFormOpen,
        replyTarget,
        setReplyTarget,
        onlyUnread,
        setOnlyUnread,
        onlyCourses,
        setOnlyCourses,
      }}
    >
      <>
        {messages.length == 0 ? (
          <EmptyDiv message="You have no messages."></EmptyDiv>
        ) : (
          // only if user have messages
          <div className="flex flex-col space-y-4 space-x-0 md:flex-row md:space-x-2 md:space-y-0  text-gray-600 dark:text-gray-300">
            <Facet />
            <div className="w-full">
              <DataTable
                columns={columns}
                data={filterMessages}
                selectableRows
                persistTableHead
                noDataComponent={<></>}
                onSelectedRowsChange={handleChange}
                defaultSortAsc
                defaultSortFieldId={"Time"}
                expandableRows
                pagination
                // To pre-expand rows based on your data
                // this will not trigger the on expand function
                expandableRowExpanded={(row) =>
                  queryTarget != null && row.id == queryTarget
                }
                paginationComponent={PaginationComponent}
                expandOnRowClicked
                expandableRowsHideExpander
                onRowExpandToggled={onRowExpandToggled}
                theme="cnails-dark"
                selectableRowSelected={(row) =>
                  selectedRows.map((n) => n.id).includes(row.id)
                }
                expandableRowsComponent={ExpandedComponent}
              />
              {filterMessages.length == 0 ? (
                <div className="flex flex-row bg-gray-100 dark:bg-black/50 rounded-b-md p-2 justify-center items-center rdt_Pagination h-56 text-gray-400">
                  No messages after faceting
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </>
      <MessageReplyForm
        isOpen={replyFormOpen}
        setOpen={setReplyFormOpen}
        target={replyTarget}
      />
    </MessageTableContext.Provider>
  );
};
