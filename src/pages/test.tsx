import { useEffect } from "react";
import Layout from "../components/Layout";

const Temp = () => {
  return (
    <div className="w-64 h-36 border ">
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-col w-full min-w-[0px]">
          <div className="w-full">
            <p className="truncate shrink ">
              skfopsdjfisdjfiodjsfoiajsdifodoasjfojdsaifjiosjadfiojsdafijsidfjoidjsfhweiuhrieuwbjksdbfkjs
            </p>
          </div>
        </div>
        <div className="w-5 h-5 bg-black shrink-0"></div>
      </div>
    </div>
  );
};

const test = () => {
  return <Temp></Temp>;
};

export default test;
