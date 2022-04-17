import { useEffect } from "react";
import { PaginationComponentProps } from "react-data-table-component";
import { Message } from "../../lib/cnails";

const Right = (props: PaginationComponentProps & { options: number[] }) => {
  const {
    onChangeRowsPerPage,
    rowCount,
    rowsPerPage,
    currentPage,
    onChangePage,
    options,
  } = props;
  const top = rowsPerPage * (currentPage - 1) + 1;
  const bottom = Math.min(rowsPerPage + top - 1, rowCount);
  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 mt-2 sm:mt-0 text-sm">
      <div className="flex flex-row items-center space-x-2 ">
        <p className="whitespace-nowrap">Rows per page : </p>
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
      </div>

      <div className="flex flex-row items-center space-x-2 ">
        <p>
          {top}-{bottom} of {rowCount}
        </p>
        <div className="btn-group border-0 outline-none border-none flex-nowrap">
          <button
            disabled={currentPage == 1}
            onClick={() => {
              onChangePage(1, rowCount);
            }}
            className="btn sm:btn-xs bg-gray-400 dark:bg-gray-800 dark:hover:bg-white/20 border-0 outline-none "
            title="Jump to first page"
          >
            {"|<"}
          </button>
          <button
            disabled={currentPage == 1}
            onClick={() => {
              onChangePage(currentPage - 1, rowCount);
            }}
            className="btn sm:btn-xs bg-gray-400 dark:bg-gray-800 dark:hover:bg-white/20 border-0 outline-none"
            title="Previous page"
          >
            {"<"}
          </button>
          <button
            disabled={currentPage == Math.ceil(rowCount / rowsPerPage)}
            onClick={() => {
              onChangePage(currentPage + 1, rowCount);
            }}
            className="btn sm:btn-xs bg-gray-400 dark:bg-gray-800 dark:hover:bg-white/20 border-0 outline-none"
            title="Next page"
          >
            {">"}
          </button>
          <button
            disabled={currentPage == Math.ceil(rowCount / rowsPerPage)}
            onClick={() => {
              onChangePage(Math.ceil(rowCount / rowsPerPage), rowCount);
            }}
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

const PaginationComponent = (
  props: PaginationComponentProps & {
    selectedRows: Message[];
    /**
     * number of rows per page
     */
    options: number[];
    actions: {
      text: string;
      icon: JSX.Element;
      onClick: () => void;
      shown?: boolean; // default is shown
    }[];
  }
) => {
  const { selectedRows, onChangeRowsPerPage, rowCount, currentPage, actions } =
    props;
  useEffect(() => {
    onChangeRowsPerPage(15, currentPage);
  }, [currentPage, onChangeRowsPerPage]);
  return (
    <div className="flex flex-col sm:flex-row bg-gray-100 dark:bg-black/50 rounded-b-md p-2 justify-between sm:items-center rdt_pagination">
      <div className="flex flex-row items-center space-x-2">
        <div>
          {selectedRows.length != 0 && (
            <p className="text-gray-700 dark:text-gray-300 text-xs">
              Selecting {selectedRows.length} of {rowCount}
            </p>
          )}
          <div className="flex flex-row items-center space-x-2">
            {actions
              .filter((action) => action.shown || action.shown === undefined)
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
