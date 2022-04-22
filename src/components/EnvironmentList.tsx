import EnvironmentCard from "./EnvironmentCard";
import { CubeIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import React, { useCallback } from "react";
import EmptyDiv from "./EmptyDiv";
import { Environment } from "../lib/cnails";
import _ from "lodash";
import { MenuItem } from "./CardMenu";
import { useInstructor } from "../contexts/instructor";

const EnvironmentList = () => {
  const { environments, setEnvCreateOpen } = useInstructor();
  const onCreate = useCallback(() => {
    setEnvCreateOpen(true);
  }, [setEnvCreateOpen]);
  return (
    <div className="env-list">
      <div id="header">
        <CubeIcon id="icon"></CubeIcon>
        <div id="title">Environments</div>
        <button onClick={onCreate} id="add" title="create environment">
          <PlusCircleIcon></PlusCircleIcon>
        </button>
      </div>
      {environments?.length == 0 ? (
        <EmptyDiv message="There is no environment for this course yet." />
      ) : (
        <div className="env-grid">
          {environments
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((environment, index) => {
              return (
                <EnvironmentCard
                  key={environment.id}
                  environment={environment}
                  zIndex={environments.length - index}
                ></EnvironmentCard>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default EnvironmentList;
