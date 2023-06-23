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
import { FcInfo } from "react-icons/fc";
import { FcManager, FcComments } from "react-icons/fc";
import { FaCity } from "react-icons/fa";
import { FaCommentSlash } from "react-icons/fa";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
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
        <div className="comments__item-author">
          <FcManager /> <span style={{ color: "blue" }}>{selectedZap.PIP}</span>
        </div>
        <div className="comments__item-zap-info">
          <div className="cities">
            <FaCity /> <AiOutlineArrowRight /> {selectedZap.ZAV} <br /> <br />{" "}
            <FaCity /> <AiOutlineArrowLeft /> {selectedZap.ROZV}
          </div>
          <div className="zap-text">
            <FcInfo /> <br />
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
            <div className="disabled__comments">
              <FcComments className="no__comments" />
            </div>
          )}
        </div>
      </div>
      <div className="comments__item-create">
        <div className="comments__control">
          <input
            type="text"
            placeholder="Фрахт,Перевізник,К-сть авто (мінімум 2 символа)"
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
