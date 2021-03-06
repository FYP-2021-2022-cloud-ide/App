import React from "react";
import toast, { Toast } from "react-hot-toast";
import { Container } from "../lib/cnails";
import { CLICK_TO_DISMISS, CLICK_TO_REPORT } from "../lib/constants";
import TempContainerToast from "./TempContainerToast";

export const loadingTime = 3 * 60000;

type Options = Partial<
  Pick<
    Toast,
    | "id"
    | "icon"
    | "duration"
    | "ariaProps"
    | "className"
    | "style"
    | "position"
    | "iconTheme"
  >
>;

/**
 * This clear function is used by the `dismiss` function
 * @param id
 */
const clear = (id: string) => {
  delete myToast.onClickCallbacks[id];
  if (myToast.loadingTimeout[id]) clearTimeout(myToast.loadingTimeout[id]);
  delete myToast.onClickDismiss[id];
};

/**
 * this is an extension of the original react hot toast
 */
const myToast = {
  ...toast,
  error: (
    { title, description }: { title: string; description: string },
    options: Options = {},
    onClick?: () => void,
    clickToDismiss: boolean = true
  ) => {
    const id = toast.error(
      <>
        <p id="title">{title}</p>
        <p id="description">{description}</p>
        <p id="comment">{CLICK_TO_DISMISS}</p>
      </>,
      {
        className: "toaster toaster-error",
        ...options,
        duration: 5000,
      }
    );
    myToast.onClickCallbacks[id] = onClick;
    myToast.onClickDismiss[id] = clickToDismiss;
    return id;
  },
  success: (
    text: string | JSX.Element,
    options: Options = {},
    onClick?: () => void,
    clickToDismiss: boolean = true
  ) => {
    const id = toast.success(
      <>
        <p id="description">{text}</p>
        <p id="comment">{CLICK_TO_DISMISS}</p>
      </>,
      {
        className: "toaster toaster-success",
        ...options,
        duration: 5000,
      }
    );
    myToast.onClickCallbacks[id] = onClick;
    myToast.onClickDismiss[id] = clickToDismiss;
    return id;
  },
  loading: (
    text: string | JSX.Element,
    options?: Options,
    onClick?: () => void
  ) => {
    const id = toast.loading(text, {
      className: "toaster toaster-loading",
      ...options,
      duration: loadingTime,
    });
    myToast.onClickCallbacks[id] = onClick;
    /**
     * this loading toast will have loading timeout,
     * this loading timeout callback will be called unless it is dismissed
     */
    myToast.loadingTimeout[id] = setTimeout(() => {
      myToast.error(
        {
          title: "Request timeout",
          description: `There is no response from server after waiting ${
            loadingTime / 60000
          } mins.`,
        },
        {
          id: id,
          duration: loadingTime,
        }
      );
    }, loadingTime);
    return id;
  },
  warning: (
    text: string | JSX.Element,
    options?: Options,
    onClick?: () => void,
    clickToDismiss: boolean = true
  ) => {
    return myToast.custom(
      <>
        <p id="description">{text}</p>
        <p id="comment">{CLICK_TO_DISMISS}</p>
      </>,
      {
        className: "toaster toaster-warning",
        icon: "??????",
        ...options,
        duration: 60 * 1000,
      },
      onClick,
      clickToDismiss
    );
  },
  notification: (
    text: string | JSX.Element,
    options: Options = {},
    onClick?: () => void,
    clickToDismiss: boolean = true
  ) => {
    return myToast.custom(
      <>
        <p id="description">{text}</p>
        <p id="comment">{CLICK_TO_DISMISS}</p>
      </>,
      {
        className: "toaster toaster_notification",
        icon: "????",
        ...options,
        duration: 5000,
      },
      onClick,
      clickToDismiss
    );
  },
  tempContainer: (container: Container) => {
    myToast.custom(
      <TempContainerToast container={container}></TempContainerToast>,
      {
        className: "toaster toaster-temp-container ",
        icon: "????",
        id: container.id,
        duration: 99999 * 86400,
      },
      undefined,
      false
    );
  },
  /**
   *
   * @param content
   * @param onClick
   * @param options
   * @param clickToDismiss if you have an `onClick` function on the toast,
   * it is suggested that the `clickToDismiss` function should be `false`
   * @returns
   */
  custom: (
    content: string | JSX.Element,
    options?: Options,
    onClick?: () => void,
    clickToDismiss: boolean = true
  ) => {
    const id = toast(content, options);
    myToast.onClickCallbacks[id] = onClick;
    myToast.onClickDismiss[id] = clickToDismiss;
    return id;
  },
  dismiss: (id: string) => {
    toast.dismiss(id);
    clear(id);
  },
  /**
   * wrap the promise with loading toast
   * @param content
   * @param promise
   * @returns
   */
  promise: async function <T>(
    content: string | JSX.Element,
    promise: Promise<T>
  ) {
    const toastId = myToast.loading(content);
    const result = await promise;
    myToast.dismiss(toastId);
    return result;
  },
  onClickCallbacks: {} as { [id: string]: () => void },
  /**
   * this stores all the dismiss function of loading toast
   */
  loadingTimeout: {} as { [id: string]: NodeJS.Timeout },
  onClickDismiss: {} as { [id: string]: boolean },
};

export default myToast;
