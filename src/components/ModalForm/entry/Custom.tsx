import flat from "flat";
import dynamic from "next/dynamic";
import { memo, useEffect, useRef } from "react";
import _ from "lodash";
import ReactDOMServer from "react-dom/server";
import { MyMarkDown } from "../../../pages/messages";
import { EntryProps } from "../types";
import fm from "front-matter";
import { InformationCircleIcon } from "@heroicons/react/solid";

const component = ({
  zIndex,
  id,
  entry,
  sectionId,
  data,
  onChange,
}: EntryProps) => {
  if (entry.type != "custom") return <></>;
  return (
    <div style={{ zIndex: zIndex }} id={id}>
      <div className="flex flex-row space-x-2 items-center">
        {entry.label && (
          <p className="modal-form-text-base capitalize">{entry.label}</p>
        )}
        {entry.tooltip && (
          <div
            className="tooltip tooltip-bottom tooltip-info"
            data-tip={entry.tooltip}
          >
            <InformationCircleIcon className="tooltip-icon" />
          </div>
        )}
      </div>
      {entry.node((newValue) => onChange(newValue), data[sectionId][id])}
    </div>
  );
};

export default component;
