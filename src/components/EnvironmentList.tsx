import EnvironmentCard from "./EnvironmentCard";
import { CubeIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import React from "react";
import EmptyDiv from "./EmptyDiv";
import { useCnails } from "../contexts/cnails";
import { useRouter } from "next/router";
import { Environment } from "../lib/cnails";
import _ from "lodash";

export interface Props {
  environments: Environment[];
  onEnvCreateBtnClick: () => void;
  onEnvClick: (environment: Environment) => void;
  onEnvDelete: (environment: Environment) => void;
  onEnvUpdate: (environment: Environment) => void;
  onEnvHighlight: (environment: Environment) => void;
}

const EnvironmentList = ({
  environments,
  onEnvCreateBtnClick,
  onEnvClick,
  onEnvDelete,
  onEnvHighlight,
  onEnvUpdate,
}: Props) => {
  return (
    <div className="env-list-container">
      <div className="env-list-header">
        <CubeIcon className="course-list-title-icon"></CubeIcon>
        <div className="env-grid-title">Environments</div>
        <button
          onClick={() => {
            if (onEnvCreateBtnClick) onEnvCreateBtnClick();
          }}
        >
          <PlusCircleIcon className="course-list-title-add"></PlusCircleIcon>
        </button>
      </div>
      {
        // generate the environment cards
        environments?.length == 0 ? (
          <EmptyDiv message="There is no environment for this course yet." />
        ) : (
          <div className="env-grid">
            {environments.map((environment) => {
              return (
                <EnvironmentCard
                  key={environment.id}
                  environment={environment}
                  onClick={(environment) => {
                    if (onEnvClick) onEnvClick(environment);
                  }}
                  onDelete={(environment) => {
                    if (onEnvDelete) onEnvDelete(environment);
                  }}
                  onUpdate={(environment) => {
                    if (onEnvUpdate) onEnvUpdate(environment);
                  }}
                  onHighlight={(environment) => {
                    if (onEnvHighlight) onEnvHighlight(environment);
                  }}
                ></EnvironmentCard>
              );
            })}
          </div>
        )
      }
    </div>
  );
};

export default EnvironmentList;
