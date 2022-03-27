import React from "react";
import toast from "react-hot-toast";
import { CLICK_TO_DISMISS, CLICK_TO_REPORT } from "../lib/constants";

export const loadingTime = 5 * 60000;

export const shouldNotClickToDismiss = ["toaster-loading"];

const myToast = {
  ...toast,
  error: (
    {
      title,
      description,
      comment = CLICK_TO_REPORT,
    }: { title: string; description: string; comment?: string },
    onClick: () => void = () => {
      window.open(
        "https://github.com/FYP-2021-2022-cloud-ide/Public-Issues/issues"
      );
    }
  ) => {
    const id = toast.error(
      <>
        <p id="title">{title}</p>
        <p id="description">{description}</p>
        <p id="comment">{comment}</p>
      </>,
      {
        className: "toaster toaster-error",
      }
    );
    myToast.onClickCallbacks[id] = onClick;
    return id;
  },
  success: (text: string | JSX.Element, onClick?: () => void) => {
    const id = toast.success(
      <>
        <p id="description">{text}</p>
        <p id="comment">{CLICK_TO_DISMISS}</p>
      </>,
      {
        className: "toaster toaster-success",
      }
    );
    myToast.onClickCallbacks[id] = onClick;
    return id;
  },
  loading: (text: string | JSX.Element, onClick?: () => void) => {
    const id = toast.loading(text, {
      className: "toaster toaster-loading toaster-no-dismiss",
    });
    myToast.onClickCallbacks[id] = onClick;
    myToast.loadingTimeout[id] = setTimeout(() => {
      myToast.error({
        title: "Request timeout",
        description: `There is no response from server after waiting ${
          loadingTime / 60000
        } mins.`,
      });
    }, loadingTime);
    return id;
  },
  warning: (text: string | JSX.Element, onClick?: () => void) => {
    // the custom is broken
    return myToast.custom(
      <>
        <p id="description">{text}</p>
        <p id="comment">{CLICK_TO_DISMISS}</p>
      </>,
      "toaster toaster-warning",
      "⚠️",
      onClick
    );
  },
  notification: (text: string | JSX.Element, onClick?: () => void) => {
    return myToast.custom(
      <>
        <p id="description">{text}</p>
        <p id="comment">{CLICK_TO_DISMISS}</p>
      </>,
      "toaster toaster_notification",
      "📥",
      onClick
    );
  },

  /**
   * @param content
   * @param icon an JSX element such as heroicon
   * @param className
   * @param onClick
   * @returns
   */
  custom: (
    content: string | JSX.Element,
    className: string,
    icon: JSX.Element | string,
    onClick?: () => void
  ) => {
    const id = toast.success(content, {
      icon: icon,
      className: className,
    });
    myToast.onClickCallbacks[id] = onClick;
    return id;
  },
  dismiss: (id: string) => {
    toast.dismiss(id);
    clearTimeout(myToast.loadingTimeout[id]);
  },
  onClickCallbacks: {} as { [id: string]: () => void },
  loadingTimeout: {} as { [id: string]: NodeJS.Timeout },
};

export default myToast;
