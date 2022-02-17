import { ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { Fragment } from "react";

type Props = {
  elements: {
    name: string;
    path: string;
  }[];
};

const Breadcrumbs = ({ elements }: Props) => {
  return (
    <div className="text-sm flex flex-row font-bold dark:text-gray-300 items-center space-x-2">
      {elements.map((e, index) => {
        return (
          <Fragment key={e.name}>
            {index != 0 && (
              <ChevronRightIcon className="w-4 h-4 text-gray-400"></ChevronRightIcon>
            )}
            <div className="text-gray-600 dark:text-gray-300 hover:underline">
              <Link href={e.path}>{e.name}</Link>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
