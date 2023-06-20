import React, { useEffect, useRef, useState } from "react";
import "./ZapComments.scss";
import { CgClose } from "react-icons/cg";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentRedux,
  deleteReduxComments,
  fetchComments,
} from "../../redux/slices/comments";
import socket from "../../utils/socket";
import { changeCommentsCount, fetchZap } from "../../redux/slices/zap";
import { beep, beepSend } from "../../helpers/audio";
import { RxDotsVertical } from "react-icons/rx";
import toTimestamp from "../../helpers/functions";
import CommentItem from "./CommentItem";
import messagesGif from "../../assets/messages1gif.gif";
const ZapComments = ({ showComments, selectedZap }) => {
  const [comment, setComment] = useState("");
  const comments = useSelector((state) => state.comments.comments.items);
  const userData = useSelector((state) => state.auth.data);
  const [arrivalComment, setArrivalComment] = useState([]);
  const dispatch = useDispatch();
  const bottomRef = useRef();
  const [zapFetch, setZapFetch] = useState(null);
  const commentsToShow = [...comments];
  const addComment = async (e) => {
    e.preventDefault();
    try {
      if (comment.length >= 3) {
        const data = await axios.post(`/comments/add`, {
          pKodAuthor: userData?.KOD,
          pKodZap: selectedZap.KOD,
          pComment: comment,
        });
        if (data.status === 200) {
          setComment("");
          socket.emit("newComment", {
            PIP: userData?.PIP,
            pKodAuthor: userData?.KOD,
            pKodZap: selectedZap?.KOD,
            pComment: comment,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyDown = async (e) => {
    try {
      if ((e.key === "Enter") & (comment.length >= 3)) {
        const data = await axios.post(`/comments/add`, {
          pKodAuthor: userData?.KOD,
          pKodZap: selectedZap?.KOD,
          pComment: comment,
        });
        if (data.status === 200 && userData) {
          setComment("");
          socket.emit("newComment", {
            PIP: userData?.PIP,
            pKodAuthor: userData?.KOD,
            pKodZap: selectedZap?.KOD,
            pComment: comment,
          });
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    socket.on("showNewComment", (data) => {
      dispatch(
        addCommentRedux({
          KOD_OS: data.pKodAuthor,
          KOD_ZAP: data.pKodZap,
          PRIM: data.pComment,
          PIP: data.PIP,
          DAT: Date.now(),
        })
      );
      // dispatch(changeCommentsCount(data.pKodZap));
    });
  }, []);
  useEffect(() => {
    socket.on("deleteCommAllUsers", (data) => {
      console.log(data);
      dispatch(deleteReduxComments(data));
    });
  }, [commentsToShow]);

  useEffect(() => {
    dispatch(fetchComments(selectedZap.KOD));
  }, []);
  useEffect(() => {}, [comments]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({
      // block: "end",
      behavior: "smooth",
      // inline: "nearest",
    });
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [commentsToShow]);

  return (
    <div className={"zap__comments-show"}>
      <div onClick={showComments} className="exit__modal">
        <CgClose />
      </div>
      <div className="comments__item">
        <div className="comments__item-author">Автор: {selectedZap.PIP}</div>
        <div className="comments__item-zap-info">
          <div className="cities">
            Завантаження: {selectedZap.ZAV} <br /> - <br /> Вивантаження:{" "}
            {selectedZap.ROZV}
          </div>
          <div className="zap-text">
            Інформація про завантаження: <br />
            {selectedZap.ZAPTEXT}
          </div>
        </div>
        <div className="comments__item-block">
          {comments.length > 0 ? (
            commentsToShow
              .sort((a, b) => a.KOD - b.KOD)
              .map((item, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <CommentItem
                      ref1={bottomRef}
                      comments={commentsToShow}
                      item={item}
                    />
                  </React.Fragment>
                );
              })
          ) : (
            <div>
              <h2>Напишіть перший коментар</h2>
              <img src={messagesGif} alt="messages_gif" />
            </div>
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
