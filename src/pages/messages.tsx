import React from "react";
import _ from "lodash";
import { MessageTable } from "../components/MessageTable/MessageTable";

export default function Home() {
  return (
    <div className="px-5 sm:px-10 mb-10 mt-5 ">
      <p className="text-3xl  font-bold mb-2 text-gray-600 dark:text-gray-300">
        {" 📬 "} Messages
      </p>

      <MessageTable></MessageTable>
    </div>
  );
}
