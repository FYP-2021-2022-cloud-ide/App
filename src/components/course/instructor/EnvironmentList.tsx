import EnvironmentCard from "./EnvironmentCard";
import { CubeIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import React from "react";
import EmptyDiv from "../../EmptyDiv";
import { useCnails } from "../../../contexts/cnails";
import { useRouter } from "next/router";
import { Environment } from "../../../lib/cnails";
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
  const router = useRouter();
  const { sub } = useCnails();

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row text-gray-700 dark:text-gray-300 justify-start gap-x-4 pb-4">
        <CubeIcon className="w-7 h-7"></CubeIcon>
        <div className="env-grid-title">Environments</div>
        <button
          onClick={() => {
            if (onEnvCreateBtnClick) onEnvCreateBtnClick();
          }}
        >
          <PlusCircleIcon className="w-7 h-7 hover:scale-110 transition  ease-in-out duration-300"></PlusCircleIcon>
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
