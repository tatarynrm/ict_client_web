import { useEffect, useRef, useState } from "react";
import "./AddZap.scss";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { fetchZap, addZap } from "../../redux/slices/zap";
import socket from "../../utils/socket";
import { beep } from "../../helpers/audio";
import { editZapAddSlice } from "../../redux/slices/edit";
// import { io } from "socket.io-client";
const AddZap = ({ selectedGroup, showAddZap }) => {
  const zap = useSelector((state) => state.zap.zap.items);
  const userData = useSelector((state) => state.auth.data);
  const [zav, setZav] = useState("");
  const [rozv, setRozv] = useState("");
  const [zapText, setZapText] = useState("");
  const [zapType, setZapType] = useState(null);
  const dispatch = useDispatch();
  const handleSubmitAddZap = async (e) => {
    e.preventDefault();
    const object = {
      pKodAuthor: userData.KOD,
      pKodGroup: selectedGroup,
      pZav: zav.label,
      pRozv: rozv.label,
      pZapText: zapText,
      PIP: userData.PIP,
    };
    if ((zav !== "" || rozv !== "" || zapType === null, zapText === "")) {
      alert("Заповніть усіполя");
    } else {
      const data = await axios.post("/zap/add", object);
      if (data.status === 200) {
        // dispatch(addZap(object));
        const dataKod = data.data.outBinds.pKodZap;
        console.log(dataKod);
        socket.emit("newZap", object);
        socket.on("showNewZap", (data) => {
          if (data) {
            // dispatch(fetchZap(userData?.KOD));
            dispatch(
              addZap({
                DAT: Date.now(),
                ZAPTEXT: data.pZapText,
                KOD: dataKod,
                PIP: userData.PIP,
                ZAV: data.pZav,
                ROZV: data.pRozv,
                KOD_GROUP: data.pKodGroup,
                KOD_OS: data.pKodAuthor,
                COUNTNEWCOMM: 0,
                COUNTCOMM: 0,
                ISNEW: 1,
                STATUS: 0,
              })
            );
          }
        });
        dispatch(editZapAddSlice());
      } else {
        alert("Виникла якась помилка");
      }
    }

    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmitAddZap} className="add__zap">
      <div className="form__control">
        <GooglePlacesAutocomplete
          className="okkk"
          apiKey="AIzaSyDddHSvr8KFFahBGyqLCQVxpjCsFw-p5ek"
          apiOptions={{
            language: "uk",
          }}
          selectProps={{
            zav,
            onChange: setZav,
          }}
        />
      </div>
      <div className="form__control">
        <GooglePlacesAutocomplete
          apiKey="AIzaSyDddHSvr8KFFahBGyqLCQVxpjCsFw-p5ek"
          apiOptions={{
            language: "uk",
          }}
          selectProps={{
            rozv,
            onChange: setRozv,
          }}
        />
      </div>
      <div className="form__control">
        <textarea
          onChange={(e) => setZapText(e.target.value)}
          type="text"
          placeholder="Додаткова інформація по вантажу"
        />
      </div>

      <button className="normal">Добавити</button>
    </form>
  );
};

export default AddZap;
