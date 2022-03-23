import { useState, useEffect, useCallback, memo } from "react";
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
import _ from "lodash";
import remarkGfm from "remark-gfm";
import remarkFrontMatter from "remark-frontmatter";
import remarkEmoji from "remark-emoji";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import fm from "front-matter";
import { prism, okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "../contexts/theme";

const getTestMessage = () => {
  return `
  > This is a test blockquote
  > - item 1 
  > - item 2 
  > - item 3

  ---

  # h1 Heading
  ## h2 Heading
  ### h3 Heading
  #### h4 Heading
  ##### h5 Heading
  ###### h6 Heading

  ___

  ---

  ***

  ## Emphasis

  **This is bold text**

  __This is bold text__

  *This is italic text*

  _This is italic text_

  ~~Strikethrough~~


  ## Blockquotes


  > Blockquotes can also be nested...
  >> ...by using additional greater-than signs right next to each other...
  > > > ...or with spaces between arrows.
  >>>> ...even more 
  >>>>> ...even more

  ## Lists

  Unordered

  + Create a list by starting a line with \`+\`, \`-\`, or \`*\`
  + Sub-lists are made by indenting 2 spaces:
    - Marker character change forces new list start:
      * Ac tristique libero volutpat at
      + Facilisis in pretium nisl aliquet
      - Nulla volutpat aliquam velit
        - koewrkwe
          - werkowekr
            - wkeorkeow
  + Very easy!


1. Lorem ipsum dolor sit amet
    1. qowekqwo
      1. wqekwqoe
         - kweorkweork
      2. weokrework
      3. wkeorewor
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


  `;
};

export const MyMarkDown = ({ text }: { text: string }) => {
  const { isDark } = useTheme();

  return (
    <ReactMarkdown
      children={text}
      remarkPlugins={[remarkGfm, remarkFrontMatter, remarkEmoji, remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline ? (
            <div className="p-3">
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                language={match ? match[1] : undefined}
                style={isDark ? okaidia : prism}
                PreTag="div"
                showLineNumbers
                {...props}
              />
            </div>
          ) : (
            <code
              className="text-red-400 bg-red-200/20 px-1 rounded"
              {...props}
            >
              {children}
            </code>
          );
        },
        hr({ className }) {
          return (
            <hr className="my-5 border-b-2 dark:border-white/30 border-black-30"></hr>
          );
        },
        table({ node, children }) {
          return <table className="m-2">{children}</table>;
        },
        th({ node, children, style, isHeader }) {
          // isHeader is true
          return <th className="border">{children}</th>;
        },
        ul({ node, children, className }) {
          console.log(className);
          return (
            <ul
              className={
                className === "contains-task-list"
                  ? className
                  : "list-disc list-inside ml-5"
              }
            >
              {children}
            </ul>
          );
        },
        ol({ node, children, className }) {
          return (
            <ol
              className={
                className === "contains-task-list"
                  ? className
                  : "list-decimal list-inside ml-5"
              }
            >
              {children}
            </ol>
          );
        },
        li({ node, children, index, ordered, checked, className }) {
          if (checked != null) {
            console.log(children);
          }
          return <li className=" ">{children}</li>;
        },
        td({ node, children, style, isHeader }) {
          // isHeader is false
          return <td className="border p-1">{children}</td>;
        },
        a({ node, children, href, title }) {
          return (
            <a title={title} href={href} className="text-blue-300 underline">
              {children}
            </a>
          );
        },
      }}
    />
  );
};

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
  const [input, setInput] = useState("");
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
          <div className="btn-group border-0 outline-none border-none flex-nowrap">
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
      {/* <button
        className="bg-green-500 text-white px-2 rounded h-min"
        onClick={async () => {
          const temp = getTestMessage();
          console.log(temp);
          const response = await sendNotification(
            "test",
            temp,
            userId,
            userId,
            Math.random() > 0.5
          );
          if (response.success) {
            fetchNotifications(userId);
          } else {
            myToast.error(response.error.error);
          }
        }}
      >
        Send test message
      </button> */}
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
