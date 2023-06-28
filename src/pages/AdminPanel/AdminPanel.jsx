import React, { useEffect } from "react";
import "./AdminPanel.scss";
import { useState } from "react";
import socket from "../../utils/socket";
const AdminPanel = () => {
  const [textToAllUsers, setTextToAllUsers] = useState("");
  const [activeUsers, setActiveUsers] = useState();
  const [action, setAction] = useState(false);
  const [message, setMessage] = useState("");
  const fetchActiveUsers = () => {
    socket.emit("activeUsers");
  };
  const reloadWindow = () => {
    socket.emit("windowReload");
  };
  const handleSubmitMessages = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    socket.emit("textToAllUsers", textToAllUsers);
  };
  useEffect(() => {
    socket.on("showActiveUsers", (data) => {
      setActiveUsers(data);
    });
  }, [activeUsers]);
  const sendMessageToUser = (item) => {
    socket.emit("admin_msg_user", {
      message: message,
      id: item.socketId,
      kod: item.userId,
    });
  };
  console.log(activeUsers);
  return (
    <div className="admin container">
      <div className="admin__inner">
        <div className="admin__nav">
          <button onClick={fetchActiveUsers} className="normal">
            Активні юзери
          </button>
          <button onClick={reloadWindow} className="normal">
            Перезавантажити сторінки
          </button>
        </div>
        <div className="admin__messages-to-users">
          <form onSubmit={handleSubmitMessages}>
            <div className="form__control">
              <input
                type="text"
                onChange={(e) => setTextToAllUsers(e.target.value)}
                value={textToAllUsers}
              />
            </div>
            <button className="normal">Відправити</button>
          </form>
        </div>
        <div className="admin__container">
          {activeUsers ? (
            <div className="active__users">
              {activeUsers && (
                <div className="active__users-block">
                  <div className="user__info">КОД ПРАЦІВНИКА</div>
                  <div className="user__info">ПІБ</div>
                  <div className="user__info">EMAIL</div>
                  <div className="user__info">STATUS: ONLINE</div>
                </div>
              )}
              {activeUsers
                .filter((item) => item.userId !== undefined)
                .map((item, idx) => {
                  return (
                    <React.Fragment key={idx}>
                      <div className="user">
                        <div className="user__info">{item.userId}</div>
                        <div className="user__info">{item.PIP}</div>
                        <div className="user__info">{item.MAIL}</div>
                        <div className="user__info">{item.DB_PASSWD}</div>
                        <button
                          className="normal"
                          onClick={(e) => setAction((value) => !value)}
                        >
                          Виконати дії
                        </button>
                      </div>
                      {action && (
                        <div className="admin__user-action">
                          <div className="admin__send-message">
                            <textarea
                              name="admin_text"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                            <button
                              onClick={() => sendMessageToUser(item)}
                              className="normal"
                            >
                              Написати {item.PIP}
                            </button>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
