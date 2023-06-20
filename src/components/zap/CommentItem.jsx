import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RxDotsVertical } from "react-icons/rx";
import { useRef } from "react";
import { useEffect } from "react";
const CommentItem = ({ ref1, item }) => {
  const userData = useSelector((state) => state.auth.data);
  const [showCommentEdit, setShowCommentEdit] = useState(false);
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
          {showCommentEdit ? (
            <div className="comment__edit-buttons">
              <button className="normal">Видалити</button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default CommentItem;
