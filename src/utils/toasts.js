import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const copyNotify = () =>
  toast("Текст запиту скопійовано", {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
export default copyNotify;
