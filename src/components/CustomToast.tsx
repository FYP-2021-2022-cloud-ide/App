import toast from "react-hot-toast";

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
  setTemplate: (text: string | JSX.Element, onClick?: () => void) => {
    const id = toast.success(text, {
      icon: "🗂",
      className: "toaster-set-template",
    });
    myToast.onClickCallbacks[id] = onClick;

    return id;
  },
  onClickCallbacks: {} as { [id: string]: () => void },
};

export default myToast;
