import { NextPageContext } from "next";
import { useState } from "react";
import CryingFace from "../components/CryingFace";
import myToast from "../components/CustomToast";
import sc from "../lib/statusCode.json";

const defaultText =
  "There is some unexpected error in the server. The error is logged and we will try to fix it ASAP. We are sorry for the inconvenience.";

const Error = ({
  statusCode,
  status,
}: {
  statusCode: number;
  status?: any;
}) => {
  const [text, setText] = useState("");
  return (
    <div className="w-full h-full relative">
      <div className="flex flex-col items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-2 min-w-[1/2] w-1/2">
        <CryingFace className="h-[200px] w-[200px]"></CryingFace>
        <p className="error-page-status-code">{statusCode}</p>
        <p className="error-page-text font-semibold">{sc[statusCode].text}</p>
        <p className="error-page-text ">
          {sc[statusCode].message ?? defaultText}
        </p>
        <button
          className="btn btn-primary"
          onClick={() => {
            // report the issue
            myToast.success("You message has been sent.");
          }}
          disabled={text == ""}
        >
          Report issue
        </button>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-600 text-sm dark:text-gray-200 ">
              Issue
            </span>
          </label>
          <textarea
            className="error-page-textarea"
            placeholder="Description"
            onChange={(e) => setText(e.currentTarget.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
