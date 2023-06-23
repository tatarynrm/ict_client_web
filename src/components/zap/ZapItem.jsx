import React, { useState } from "react";
import moment from "moment";
import "moment/locale/uk";
import { copyTextToClipboard } from "../../helpers/navigator";
import { RxDotsVertical } from "react-icons/rx";
import { AiOutlineComment } from "react-icons/ai";
import { FaCommentSlash } from "react-icons/fa";
import ZapEdit from "../../components/zap/ZapEdit";
import { useSelector } from "react-redux";
const ZapItem = ({ item, showComments, showAddZap, setEditZap }) => {
  const userData = useSelector((state) => state.auth.data);
  const [zapMenu, setZapMenu] = useState(false);
  const comments = useSelector((state) => state.comments.comments.items);
  const openZapMenu = (e) => {
    e.stopPropagation();
    setZapMenu((val) => !val);
  };
  const newZapColor = Date.now() - moment(item.DAT).valueOf();
  return (
    <div onClick={() => showComments(item)} className={`zap zap-${item.KOD}`}>
      {newZapColor <= 1800000 ? (
        <div className="decor__line-div-zap-new"></div>
      ) : (
        <div className="decor__line-div-zap-30min"></div>
      )}
      {newZapColor >= 10800000 ? (
        <div className="decor__line-div-zap-3hour"></div>
      ) : null}
      <div className="zap__author">
        <div className="zap__item-kod" title="Код заявки">
          {item.KOD}
        </div>
        <div className="zap__author-name" title="Автор заявки">
          {item.PIP}
        </div>
        <div className="zap__comments-length">
          <div className="zap__comments-counter">
            {item.COUNTCOMM <= 0 ? (
              <FaCommentSlash
                title="Коментарів немає"
                className="comments__tooltip"
              />
            ) : (
              <AiOutlineComment
                style={{ color: item.COUNTMYCOMM > 0 ? "blue" : "black" }}
                title="Кількість коментарів"
              />
            )}

            <span
              style={{
                color: item.COUNTMYCOMM > 0 ? "blue" : "black",
                fontWeight: item.COUNTMYCOMM > 0 ? "bold" : "normal",
                fontSize: item.COUNTMYCOMM > 0 ? "20px" : "14px",
              }}
            >
              {item.COUNTCOMM <= 0 ? null : item.COUNTCOMM}
            </span>
            {item.COUNTNEWCOMM <= 0 ? null : (
              <span className="new__comments">{item.COUNTNEWCOMM}</span>
            )}
          </div>
        </div>
        <div
          className="zap__author-time"
          title="Час створення заявки"
        >{`${moment(item.DAT).startOf("minute").fromNow()}`}</div>
      </div>
      <div className="zap__cities">
        <div>
          <span title="Завантаження">{item.ZAV} </span> <br /> - <br />
          <span title="Вивантаження"> {item.ROZV}</span>
        </div>
      </div>
      <div title="Основна інформація по завантаженні" className="zap__text">
        {item.ZAPTEXT}
      </div>

      {userData?.KOD === item.KOD_OS ||
      userData.KOD == 3711 ||
      userData.KOD == 38231 ? (
        <div className="zap__menu">
          <RxDotsVertical onClick={openZapMenu} />
        </div>
      ) : null}
      {zapMenu ? (
        <ZapEdit
          setEditZap={setEditZap}
          showAddZap={showAddZap}
          setZapMenu={setZapMenu}
          openZapMenu={openZapMenu}
          item={item}
        />
      ) : null}
    </div>
  );
};

export default ZapItem;
