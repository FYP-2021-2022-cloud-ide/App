import _ from "lodash";
import { memo } from "react";
import { Message } from "../../lib/cnails";
import { MyMarkDown } from "../MyMarkdown";

const ExpandedComponent = memo(
  ({ data }: { data: Message }) => {
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

export default ExpandedComponent;
