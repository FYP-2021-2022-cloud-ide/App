import moment from "moment";
import React, { useCallback, useState } from "react";
import myToast from "../components/CustomToast";
import { useContainers } from "../contexts/containers";
import { useWarning } from "../contexts/warning";
import { Container } from "../lib/cnails";
import useInterval from "./useInterval";

/**
 *
 * @param isoTime a timestamp
 * @returns the time from the timestamp
 */
export const getTimeDiff = (isoTime: string) => {
  return moment.duration(moment().diff(moment(isoTime)));
};

const formatDuration = (duration: moment.Duration): string => {
  const second = duration.asSeconds();
  if (!second) {
    return "0s";
  }
  if (second < 60) {
    return `${Math.floor(second)}s`;
  } else if (second < 3600) {
    return `${Math.floor(duration.asMinutes())}m`;
  } else return `${Math.floor(duration.asHours())}h`;
};

const getDuration = (container: Container) => {
  return container
    ? formatDuration(
        getTimeDiff(
          container.isTemporary
            ? container.redisPatch.requestAt
            : container.startAt
        )
      )
    : undefined;
};

const useContainerCard = (container: Container) => {
  const { removeContainer, setContainerStatus } = useContainers();
  // if the container temporary, API doesn't return the start time,
  // so we use the request time, although it is technically inaccurate
  const [duration, setDuration] = useState<string>(getDuration(container));
  const { waitForConfirm } = useWarning();
  /**
   * this hook update the UI every 30s
   */
  useInterval(() => {
    setDuration(getDuration(container));
  }, 30 * 1000);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (container && container.status == "DEFAULT" && container.id)
        window.open(
          `https://codespace.ust.dev/user/container/${container.id}/`
        );
    },
    [container]
  );

  const onRemove = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (container) {
        if (!container.isTemporary) {
          setContainerStatus(container.id, "REMOVING");
          await removeContainer(container.id);
          myToast.dismiss(container.id);
          return;
        }

        const question =
          (container.redisPatch.cause == "ENV_CREATE" &&
            "Are you sure you want to cancel the commit? All your changes in the workspace will not be saved and no environment will be built.") ||
          (container.redisPatch.cause == "ENV_UPDATE" &&
            "Are you sure that you want to cancel the commit? All your changes in the workspace will not be saved and the environment will not be updated.") ||
          (container.redisPatch.cause == "TEMPLATE_CREATE" &&
            "Are you sure you want to cancel the commmit? All you changes in the workspace will not be saved and no template will be created.") ||
          (container.redisPatch.cause == "TEMPLATE_UPDATE" &&
            "Are you sure you want to cancel the commit? All your changes in the workspace will not be saved and the template will not be updated.") ||
          (container.redisPatch.cause == "SANDBOX_UPDATE" &&
            "Are you sure that you want to cancel the commit. All your changes in the workspace will not be saved and personal workspace will not be updated.");
        const confirm = await waitForConfirm(question);
        if (confirm) {
          setContainerStatus(container.id, "REMOVING");
          await removeContainer(container.id);
          myToast.dismiss(container.id);
        }
      }
    },
    [removeContainer, setContainerStatus, container, waitForConfirm]
  );

  const comment = container
    ? (container.status == "CREATING" && "starting workspace...") ||
      (container.status == "REMOVING" && "stopping workspace...") ||
      (container.status == "DEFAULT" && "running...")
    : undefined;

  return { duration, onClick, onRemove, comment };
};

export default useContainerCard;
