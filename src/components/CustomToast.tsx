import toast from "react-hot-toast";

const myToast = {
  ...toast,
  error: (text: string) => {
    toast.error(text, {
      className: "toaster-error",
    });
  },
  success: (text: string) => {
    toast.success(text, {
      className: "toaster-success",
    });
  },
  loading: (text: string) => {
    toast.loading(text, {
      className: "toaster-loading",
    });
  },
  warning: (text: string) => {
    // the custom is broken
    toast.success(text, {
      icon: "⚠️",
      className: "toaster-warning",
    });
  },
};

export default myToast;
