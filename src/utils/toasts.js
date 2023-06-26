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
export const notifyNewZap = (userData, data) =>
  toast(
    `👉 ${data.PIP} щойно ${
      userData?.CODE_SEX == "W" ? "додала" : "додав"
    } нову заявку  ✅${data.ZAP_KOD} Завантаження: ${
      data.pZav
    } - Вивантаження: ${data.pRozv}`,
    {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
  );
export const notifyCommentZap = (userData, data) =>
  toast(
    `👉 ${data.PIP} щойно ${
      userData?.CODE_SEX == "W" ? "додала" : "додав"
    } нову коментар до вашої заявки ✅${data.pKodZap}`,
    {
      position: "bottom-left",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    }
  );
export default copyNotify;
