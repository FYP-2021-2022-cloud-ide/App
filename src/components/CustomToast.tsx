import toast from "react-hot-toast";

export const loadingTime = 5 * 60000;

const myToast = {
  ...toast,
  error: (text: string | JSX.Element, onClick?: () => void) => {
    const id = toast.error(text, {
      className: "toaster-error",
    });
    myToast.onClickCallbacks[id] = onClick;
    return id;
  },
  success: (text: string | JSX.Element, onClick?: () => void) => {
    const id = toast.success(text, {
      className: "toaster-success",
    });
    myToast.onClickCallbacks[id] = onClick;
    return id;
  },
  loading: (text: string | JSX.Element, onClick?: () => void) => {
    const id = toast.loading(text, {
      className: "toaster-loading",
    });
    myToast.onClickCallbacks[id] = onClick;
    myToast.loadingTimeout[id] = setTimeout(() => {
      myToast.error("Request timeout, no response from server.");
    }, loadingTime);
    return id;
  },
  warning: (text: string | JSX.Element, onClick?: () => void) => {
    // the custom is broken
    const id = toast.success(text, {
      icon: "⚠️",
      className: "toaster-warning",
    });
    myToast.onClickCallbacks[id] = onClick;
    return id;
  },
  notification: (text: string | JSX.Element, onClick?: () => void) => {
    const id = toast.success(text, {
      icon: "📩",
      className: "toaster-notification",
    });
    myToast.onClickCallbacks[id] = onClick;
    return id;
  },

  // the lasting time of custom toast is one hour
  custom: (text: string | JSX.Element, icon: string, onClick?: () => void) => {
    const id = toast.success(text, {
      icon: icon,
      className: "toaster-custom",
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
