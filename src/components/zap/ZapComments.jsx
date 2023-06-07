import { useEffect, useRef, useState } from "react";
import "./ZapComments.scss";
import { CgClose } from "react-icons/cg";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../redux/slices/comments";
// import socket from "../../utils/socket";

import { fetchZap } from "../../redux/slices/zap";
import { io } from "socket.io-client";
const ZapComments = ({ showComments, selectedZap }) => {
  const socket = useRef();
  const [comment, setComment] = useState("");
  const comments = useSelector((state) => state.comments.comments.items);
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const bottomRef = useRef();
  useEffect(() => {
    socket.current = io("http://192.168.1.33:5002");
  }, []);
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`/comments/add`, {
        pKodAuthor: userData.KOD,
        pKodZap: selectedZap.KOD,
        pComment: comment,
      });
      if (data.status === 200) {
        setComment("");
        socket.current.emit("newComment", {
          pKodAuthor: userData.KOD,
          pKodZap: selectedZap.KOD,
          pComment: comment,
        });
        socket.current.on("showNewZap", (data) => {
          if (data) {
            dispatch(fetchZap(userData && userData.KOD));
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyDown = async (e) => {
    try {
      if (e.key === "Enter") {
        const data = await axios.post(`/comments/add`, {
          pKodAuthor: userData.KOD,
          pKodZap: selectedZap.KOD,
          pComment: comment,
        });
        if (data.status === 200) {
          setComment("");
          socket.current.emit("newComment", {
            pKodAuthor: userData.KOD,
            pKodZap: selectedZap.KOD,
            pComment: comment,
          });
          socket.current.on("showNewZap", (data) => {
            if (data) {
              dispatch(fetchZap(userData && userData.KOD));
            }
          });
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    socket.current.on("showNewComment", (data) => {
      dispatch(fetchComments(data.pKodZap));
    });
  }, []);

  useEffect(() => {
    dispatch(fetchComments(selectedZap.KOD));
  }, []);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({
      // block: "end",
      behavior: "smooth",
      // inline: "nearest",
    });
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [comments]);
  return (
    <div className={"zap__comments-show"}>
      <div onClick={showComments} className="exit__modal">
        <CgClose />
      </div>
      <div className="comments__item">
        <div className="comments__item-author">{selectedZap.PIP}</div>
        <div className="comments__item-zap-info">
          <div className="cities">
            {selectedZap.ZAV} <br /> - <br /> {selectedZap.ROZV}
          </div>
          <div className="zap-text">{selectedZap.ZAPTEXT}</div>
        </div>
        <div className="comments__item-block">
          {comments.length > 0 ? (
            comments.map((item, idx) => {
              return (
                <div
                  key={idx}
                  ref={bottomRef}
                  className={
                    item.KOD_OS === userData.KOD
                      ? "manager__comment own"
                      : "manager__comment"
                  }
                >
                  <span>{item.KOD_OS === userData.KOD ? "" : item.PIP}</span>
                  {"  "}
                  <span>{item.PRIM}</span>
                </div>
              );
            })
          ) : (
            <h2>Коментарів немає</h2>
          )}
        </div>
      </div>
      <div className="comments__item-create">
        <div className="comments__control">
          <input
            type="text"
            placeholder="Фрахт,Перевізник,К-сть авто"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="normal" onClick={addComment}>
            Надіслати
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZapComments;
