import { useDispatch, useSelector } from "react-redux";
import "./ZapEdit.scss";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import axios from "../../utils/axios";
import { fetchZap } from "../../redux/slices/zap";
import {
  editZap,
  editZapAddSlice,
  editZapEditData,
} from "../../redux/slices/edit";
import { useEffect } from "react";
const ZapEdit = ({ item, showAddZap, setZapMenu }) => {
  const userData = useSelector((state) => state.auth.data);
  const zapEditStatus = useSelector((state) => state.edit.zapEdit);
  const zapEditData = useSelector((state) => state.edit.zapEditData);

  const dispatch = useDispatch();
  const editCurrentZap = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setZapMenu((value) => !value);
    dispatch(editZapAddSlice());
    dispatch(
      editZapEditData({
        zav: item.ZAV,
        rozv: item.ROZV,
        zapText: item.ZAPTEXT,
        zapKod: item.KOD,
        zapKodOs: item.KOD_OS,
      })
    );
  };
  useEffect(() => {}, [zapEditStatus]);
  useEffect(() => {
    console.log("====================================");
    console.log(zapEditData.zav);
    console.log("====================================");
  }, [zapEditData]);
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
          dispatch(fetchZap(userData?.KOD));
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="zap__menu-buttons">
      <i onClick={deleteZap} className="zap__edit-block zap__edit-delete">
        <AiFillDelete />
        <span>Видалити</span>
      </i>
      <i onClick={editCurrentZap} className="zap__edit-block  zap__edit-edit">
        <AiFillEdit />
        <span>Редагувати</span>
      </i>
    </div>
  );
};

export default ZapEdit;
