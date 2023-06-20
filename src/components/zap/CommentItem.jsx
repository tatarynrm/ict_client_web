import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RxDotsVertical } from "react-icons/rx";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "../../utils/axios";
import socket from "../../utils/socket";
const CommentItem = ({ ref1, item }) => {
  const userData = useSelector((state) => state.auth.data);
  const [showCommentEdit, setShowCommentEdit] = useState(false);
  const deleteComment = async (KOD_OS, KOD_COMM) => {
    try {
      const data = await axios.post(`/comments/delete`, {
        pKodAutor: KOD_OS,
        pKodComm: KOD_COMM,
      });
      if (data.status === 200) {
        socket.emit("deleteComm", KOD_COMM);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      ref={ref1}
      className={
        item.KOD_OS === userData.KOD
          ? "manager__comment own"
          : "manager__comment"
      }
    >
      <span>{item.KOD_OS === userData.KOD ? "" : item.PIP}</span>
      <span>{item.PRIM}</span>
      {item.KOD_OS === userData.KOD ? (
        <div
          onClick={() => setShowCommentEdit(!showCommentEdit)}
          className="comments__edit"
        >
          <RxDotsVertical />
        </div>
      ) : null}
      {showCommentEdit ? (
        <div className="comment__edit-buttons">
          <button
            onClick={() => deleteComment(userData?.KOD, item.KOD)}
            className="normal delete"
          >
            Видалити
          </button>
          {/* <button className="normal edit">Редагувати</button> */}
        </div>
      ) : null}
    </div>
  );
};

export default CommentItem;
