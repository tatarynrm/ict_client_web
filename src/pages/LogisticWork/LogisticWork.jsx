import { useEffect, useState } from "react";
import "./LogisticWork.scss";
import ZapComments from "../../components/zap/ZapComments";
import moment from "moment";
import "moment/locale/uk";
import toTimestamp from "../../helpers/functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddZap from "../../components/zap/AddZap";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveUsers } from "../../redux/slices/users";
import {
  changeCommentsCount,
  fetchGroups,
  fetchZap,
} from "../../redux/slices/zap";

import socket from "../../utils/socket";
import io from "socket.io-client";

import ZapItem from "../../components/zap/ZapItem";
import ZapEditForm from "../../components/zap/ZapEditForm";
import { editZapAddSlice } from "../../redux/slices/edit";
import { useRef } from "react";
import axios from "../../utils/axios";

const LogisticWork = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const groups = useSelector((state) => state.zap.zap.groups);
  const zap = useSelector((state) => state.zap.zap.items);
  const [activeZap, setActiveZap] = useState([]);
  const { users } = useSelector((state) => state.users);
  const [commentsClass, setCommentsClass] = useState(false);
  const [filterZap, setFilterZap] = useState([]);
  const [selectedZap, setSelectedZap] = useState(null);
  const [addZap, setAddZap] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(3211 || selectedGroup);
  const comments = useSelector((state) => state.comments.comments);
  const [myZap, setMyZap] = useState(null);
  const zapAddSlice = useSelector((state) => state.edit.zapAddSlice);

  const showAddZap = () => {
    setAddZap((value) => !value);
  };
  // useEffect(() => {
  //   userData &&
  //     socket.on("showNewZap", (data) => {
  //       if (data) {
  //         dispatch(fetchZap(userData.KOD));
  //       }
  //     });
  // }, [socket, zap, userData]);
  useEffect(() => {
    socket.emit("newUser", userData?.KOD);
  }, []);
  useEffect(() => {
    socket.on("showNewComment", (data) => {
      dispatch(changeCommentsCount(data.pKodZap));
    });
  }, []);
  const showComments = async (item) => {
    setCommentsClass((value) => !value);
    setSelectedZap(item);
  };
  useEffect(() => {
    if (userData) {
      dispatch(fetchGroups(userData.KOD));
    }
  }, [userData]);
  useEffect(() => {
    if (userData) {
      dispatch(fetchZap(userData.KOD));
    }
  }, [userData]);
  useEffect(() => {
    if (groups.length > 0) {
      setSelectedGroup(groups[0].KOD);
    } else {
      setSelectedGroup(11);
    }
  }, []);

  return (
    <div className="logistic logistic__work container">
      <div className="logistic__work-nav">
        <button onClick={() => dispatch(editZapAddSlice())} className="normal">
          {zapAddSlice ? "Приховати" : "Добавити вантаж"}
        </button>
        <div className="form__control">
          <input
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{
              border: "none",
              borderBottom: "1px solid rgb(76, 135, 202)",
              outline: "none",
            }}
            type="text"
            placeholder="Пошук заявок"
          />
        </div>
      </div>
      <div className="logistic__work-nav">
        {groups
          ? groups.map((item, idx) => {
              return (
                <div key={idx} className="nav">
                  {selectedGroup === item.KOD ? (
                    <div className="decor__div"></div>
                  ) : null}
                  <button
                    onClick={() => setSelectedGroup(item.KOD)}
                    value={item.KOD}
                    className="normal"
                  >
                    {item.NGROUP}{" "}
                    {zap.filter((value) => value.KOD_GROUP === item.KOD).length}
                  </button>
                </div>
              );
            })
          : null}
        <div className="nav">
          <button
            onClick={() => setSelectedGroup(userData.KOD)}
            className="normal"
          >
            Мої
          </button>
        </div>
      </div>
      {zapAddSlice ? (
        <AddZap showAddZap={showAddZap} selectedGroup={selectedGroup} />
      ) : null}

      <div className="zap__list">
        {zap ? (
          zap

            .filter((item) => item.KOD_GROUP === selectedGroup)
            .filter((item) => {
              return searchFilter.toLowerCase() === ""
                ? item
                : item.ZAV.toLowerCase().includes(searchFilter) ||
                    item.ROZV.toLowerCase().includes(searchFilter) ||
                    item.PIP.toUpperCase().includes(searchFilter);
            })
            .sort((a, b) => toTimestamp(b.DAT) - toTimestamp(a.DAT))
            .map((item, idx) => {
              return (
                <ZapItem
                  key={idx}
                  item={item}
                  showComments={showComments}
                  showAddZap={showAddZap}
                />
              );
            })
        ) : (
          <div className="zap__type">
            <h2>Немає завантажень</h2>
          </div>
        )}
      </div>

      {commentsClass ? (
        <ZapComments showComments={showComments} selectedZap={selectedZap} />
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default LogisticWork;
