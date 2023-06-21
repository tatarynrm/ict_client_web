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
  const openZapMenu = (e) => {
    e.stopPropagation();
    setZapMenu((val) => !val);
  };
  // console.log("====================================");
  // console.log(moment(item.DAT).valueOf());
  // console.log("====================================");
  console.log(Date.now());
  console.log(Date.now() - moment(item.DAT).valueOf());
  const newZapColor = Date.now() - moment(item.DAT).valueOf();
  return (
    <div
      // style={{
      //   backgroundColor: newZapColor <= 1800000 ? "#4ddb65" : "#ebb099",
      // }}
      onClick={() => showComments(item)}
      className={`zap zap-${item.KOD}`}
    >
      {newZapColor <= 1800000 ? (
        <div className="decor__line-div-zap-new"></div>
      ) : (
        <div className="decor__line-div-zap-30min"></div>
      )}
      {newZapColor >= 10800000 ? (
        <div className="decor__line-div-zap-3hour"></div>
      ) : null}
      <div className="zap__author">
        <div className="zap__author-name">{item.PIP}</div>
        <div className="zap__comments-length">
          <div className="zap__comments-counter">
            {item.COUNTCOMM <= 0 ? (
              <FaCommentSlash
                title="Коментарів немає"
                className="comments__tooltip"
              />
            ) : (
              <AiOutlineComment />
            )}

            <span>{item.COUNTCOMM <= 0 ? null : item.COUNTCOMM}</span>
            {item.COUNTNEWCOMM <= 0 ? null : (
              <span className="new__comments">{item.COUNTNEWCOMM}</span>
            )}
          </div>
        </div>
        <div className="zap__author-time">{`${moment(item.DAT)
          .startOf("minute")
          .fromNow()}`}</div>
      </div>
      <div className="zap__cities">
        <div>
          {item.ZAV} <br /> - <br />
          {item.ROZV}
        </div>
      </div>
      <div
        onClick={() =>
          copyTextToClipboard(`${item.ZAV} - ${item.ROZV}\n${item.ZAPTEXT}`)
        }
        className="zap__text"
      >
        {item.ZAPTEXT}
      </div>

      {userData?.KOD === item.KOD_OS ? (
        <div className="zap__menu">
          <RxDotsVertical onClick={openZapMenu} />
        </div>
      ) : null}
      {zapMenu ? (
        <ZapEdit
          setEditZap={setEditZap}
          showAddZap={showAddZap}
          setZapMenu={setZapMenu}
          item={item}
        />
      ) : null}
    </div>
  );
};

export default ZapItem;
