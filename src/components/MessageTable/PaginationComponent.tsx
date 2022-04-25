import { useCallback, useEffect, useMemo } from "react";
import { PaginationComponentProps } from "react-data-table-component";
import { useMessaging } from "../../contexts/messaging";
import { useMessageTable } from "./MessageTable";
import { RefreshIcon, TrashIcon } from "@heroicons/react/solid";

/**
 * number of rows per page
 */
const pageOptions = [15, 20, 30, 50];

const Right = ({
  onChangeRowsPerPage,
  rowCount,
  rowsPerPage,
  currentPage,
  onChangePage,
}: PaginationComponentProps) => {
  const top = rowsPerPage * (currentPage - 1) + 1;
  const bottom = Math.min(rowsPerPage + top - 1, rowCount);
  const onChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      onChangeRowsPerPage(Number(e.target.value), currentPage);
    },
    [onChangeRowsPerPage, currentPage]
  );

  const onFirstPageClick = useCallback(() => {
    onChangePage(1, rowCount);
  }, [onChangePage, rowCount]);

  const onPreviousPageClick = useCallback(() => {
    onChangePage(currentPage - 1, rowCount);
  }, [onChangePage, currentPage, rowCount]);

  const onNextPageClick = useCallback(() => {
    onChangePage(currentPage + 1, rowCount);
  }, [onChangePage, currentPage, rowCount]);

  const onLastPageClick = useCallback(() => {
    onChangePage(Math.ceil(rowCount / rowsPerPage), rowCount);
  }, [onChangePage, rowCount, rowsPerPage, rowCount]);

  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 mt-2 sm:mt-0 text-sm">
      <div className="flex flex-row items-center space-x-2 ">
        <p className="whitespace-nowrap">Rows per page : </p>
        <select
          className=" bg-gray-200 dark:bg-gray-600"
          value={rowsPerPage}
          onChange={onChange}
        >
          {pageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-row items-center space-x-2 ">
        <p>
          {top}-{bottom} of {rowCount}
        </p>
        <div className="btn-group border-0 outline-none border-none flex-nowrap">
          <button
            disabled={currentPage == 1}
            onClick={onFirstPageClick}
            className="btn sm:btn-xs bg-gray-400 dark:bg-gray-800 dark:hover:bg-white/20 border-0 outline-none "
            title="Jump to first page"
          >
            {"|<"}
          </button>
          <button
            disabled={currentPage == 1}
            onClick={onPreviousPageClick}
            className="btn sm:btn-xs bg-gray-400 dark:bg-gray-800 dark:hover:bg-white/20 border-0 outline-none"
            title="Previous page"
          >
            {"<"}
          </button>
          <button
            disabled={currentPage == Math.ceil(rowCount / rowsPerPage)}
            onClick={onNextPageClick}
            className="btn sm:btn-xs bg-gray-400 dark:bg-gray-800 dark:hover:bg-white/20 border-0 outline-none"
            title="Next page"
          >
            {">"}
          </button>
          <button
            disabled={currentPage == Math.ceil(rowCount / rowsPerPage)}
            onClick={onLastPageClick}
            className="btn sm:btn-xs bg-gray-400 dark:bg-gray-800 dark:hover:bg-white/20 border-0 outline-none"
            title="Jump to last page"
          >
            {">|"}
          </button>
        </div>
      </div>
    </div>
  );
};

const PaginationComponent = (props: PaginationComponentProps) => {
  const { onChangeRowsPerPage, rowCount, currentPage } = props;
  const { selectedRows } = useMessageTable();
  const { fetchMessages, deleteMessages, changeMessagesRead } = useMessaging();
  const actions = useMemo(
    () => [
      {
        text: "Refresh",
        icon: <RefreshIcon className="w-5 h-5 text-white"></RefreshIcon>,
        onClick: async () => {
          await fetchMessages();
        },
      },
      {
        text: "Delete messages",
        icon: <TrashIcon className="w-5 h-5 text-white"></TrashIcon>,
        onClick: async () => {
          await deleteMessages(selectedRows.map((r) => r.id));
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
          await changeMessagesRead(
            selectedRows.map((r) => r.id),
            true
          );
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
          await changeMessagesRead(
            selectedRows.map((r) => r.id),
            false
          );
        },
        shown: selectedRows.length != 0,
      },
    ],
    [selectedRows, changeMessagesRead, deleteMessages, fetchMessages]
  );

  useEffect(() => {
    onChangeRowsPerPage(15, currentPage);
  }, [currentPage, onChangeRowsPerPage]);

  return (
    <div className="flex flex-col sm:flex-row  rdt_Pagination">
      <div className="flex flex-row items-center space-x-2">
        <div>
          {selectedRows.length != 0 && (
            <p className="text-gray-700 dark:text-gray-300 text-xs">
              Selecting {selectedRows.length} of {rowCount}
            </p>
          )}
          <div className="flex flex-row items-center space-x-2">
            {actions
              .filter((action) => action.shown ?? true)
              .map((action) => {
                return (
                  <button
                    key={action.text}
                    title={action.text}
                    className="btn bg-gray-500/50  rounded p-1 border-none min-h-0 h-auto w-auto dark:hover:bg-white/30"
                    onClick={action.onClick}
                  >
                    {action.icon}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
      <Right {...props}></Right>
    </div>
  );
};
export default PaginationComponent;
