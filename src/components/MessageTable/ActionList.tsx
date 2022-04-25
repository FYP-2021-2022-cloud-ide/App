import { Fragment } from "react";

export type Action = {
  text: string;
  icon: JSX.Element;
  onClick: () => void;
  shown?: boolean; // default is shown
};

const ActionList = ({ actions }: { actions: Action[] }) => {
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
};

export default ActionList;
