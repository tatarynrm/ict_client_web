import { useDispatch, useSelector } from "react-redux";
import "./ZapEdit.scss";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import axios from "../../utils/axios";
import { deleteReduxZap, fetchZap } from "../../redux/slices/zap";
import {
  editZap,
  editZapAddSlice,
  editZapEditData,
  editZapRedux,
} from "../../redux/slices/edit";
import { useEffect } from "react";
import socket from "../../utils/socket";
import { useState } from "react";
const ZapEdit = ({ item, showAddZap, setZapMenu, setEditZap }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const userData = useSelector((state) => state.auth.data);
  const zap = useSelector((state) => state.zap.items);
  const dispatch = useDispatch();

  const editCurrentZap = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // setShowEditModal((value) => !value);
    // setZapMenu((value) => !value);

    // dispatch(
    //   editZapEditData({
    //     zav: item.ZAV,
    //     rozv: item.ROZV,
    //     zapText: item.ZAPTEXT,
    //     zapKod: item.KOD,
    //     zapKodOs: item.KOD_OS,
    //   })
    // );
  };
  const submitEditForm = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const deleteZap = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      if (window.confirm("Ви впевнені що хочете видалити дану заявку?")) {
        const data = await axios.post("/zap/delete", {
          pKodAuthor: userData?.KOD,
          pStatus: 1,
          pKodZap: item.KOD,
        });
        if (data.status === 200) {
          socket.emit("deleteZap", item.KOD);
          // dispatch(fetchZap(userData?.KOD));
          // socket.on("deleteZapAllUsers", () => {
          //   dispatch(deleteReduxZap(item.KOD));
          // });
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, [zap]);
  return (
    <>
      <div className="zap__menu-buttons">
        <i onClick={deleteZap} className="zap__edit-block zap__edit-delete">
          <AiFillDelete />
          <span>Видалити</span>
        </i>
        {/* <i onClick={editCurrentZap} className="zap__edit-block  zap__edit-edit">
          <AiFillEdit />
          <span>Редагувати</span>
        </i> */}
      </div>
      {/* {showEditModal ? (
        <div className="edit__zap">
          <form onSubmit={submitEditForm}>
            <div className="form__control">
              <input type="text" />
            </div>
          </form>
        </div>
      ) : null} */}
    </>
  );
};

export default ZapEdit;
