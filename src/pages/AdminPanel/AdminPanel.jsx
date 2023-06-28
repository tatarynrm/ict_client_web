import { useEffect } from "react";
import "./AdminPanel.scss";
import { useState } from "react";
import socket from "../../utils/socket";
const AdminPanel = () => {
  const [textToAllUsers, setTextToAllUsers] = useState("");
  const [activeUsers, setActiveUsers] = useState();
  const fetchActiveUsers = () => {
    socket.emit("activeUsers");
  };
  const reloadWindow = () => {
    socket.emit("windowReload");
  };
  const handleSubmitMessages = async (e) => {
    e.preventDefault();
    socket.emit("textToAllUsers", textToAllUsers);
  };
  useEffect(() => {
    socket.on("showActiveUsers", (data) => {
      setActiveUsers(data);
    });
  }, [activeUsers]);
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
                    <div key={idx} className="user">
                      <div className="user__info">{item.userId}</div>
                      <div className="user__info">{item.PIP}</div>
                      <div className="user__info">{item.MAIL}</div>
                      <div className="user__info">{item.DB_PASSWD}</div>
                    </div>
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
