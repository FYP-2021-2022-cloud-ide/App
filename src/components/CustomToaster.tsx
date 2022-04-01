import { Toaster, Toast, ToastBar } from "react-hot-toast";
import Twemoji from "react-twemoji";
import myToast, { loadingTime } from "./CustomToast";

const CustomToaster = () => {
    return <Toaster
        position="bottom-right"
        toastOptions={{
            // this can the default duration of the toast
            duration: 5000,
        }}
    >
        {(t: Toast) => {
            const classList = t.className.split(" ");
            if (classList.includes("toaster-loading")) t.duration = loadingTime;
            if (classList.includes("toaster-custom")) t.duration = 60 * 60000;
            return (
                <Twemoji noWrapper options={{ className: "twemoji" }}>
                    <div
                        onClick={() => {
                            if (!classList.includes("toaster-no-dismiss"))
                                myToast.dismiss(t.id);
                            // dirty
                            if (myToast.onClickCallbacks[t.id]) {
                                myToast.onClickCallbacks[t.id]();
                                delete myToast.onClickCallbacks[t.id];
                            }
                        }}
                    >
                        <ToastBar toast={t}>
                            {({ icon, message }) => {
                                return (
                                    <div className="toaster-content">
                                        {icon}
                                        <div className="toaster-text">
                                            {(message as JSX.Element).props.children}
                                        </div>
                                    </div>
                                );
                            }}
                        </ToastBar>
                    </div>
                </Twemoji>
            );
        }}
    </Toaster>
}

export default CustomToaster