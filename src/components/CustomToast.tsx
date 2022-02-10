import toast from "react-hot-toast";

const myToast = {
  ...toast,
  error: (text: string) => {
    const id = Math.random().toString(36).slice(2, 10);
    toast.error(text, {
      className: "toaster-error",
      id: id,
    });
    return id;
  },
  success: (text: string) => {
    const id = Math.random().toString(36).slice(2, 10);
    toast.success(text, {
      className: "toaster-success",
      id: id,
    });
    return id;
  },
  loading: (text: string) => {
    const id = Math.random().toString(36).slice(2, 10);
    toast.loading(text, {
      className: "toaster-loading",
    });
    return id;
  },
  warning: (text: string) => {
    // the custom is broken
    const id = Math.random().toString(36).slice(2, 10);
    toast.success(text, {
      icon: "⚠️",
      className: "toaster-warning",
      id: id,
    });
    return id;
  },
};

export default myToast;
