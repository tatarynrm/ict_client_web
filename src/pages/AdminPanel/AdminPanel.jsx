import { useEffect } from "react";
import "./AdminPanel.scss";
import { useState } from "react";
import socket from "../../utils/socket";
const AdminPanel = () => {
  const [activeUsers, setActiveUsers] = useState();
  const fetchActiveUsers = () => {
    socket.emit("activeUsers");
  };
  useEffect(() => {
    socket.on("showActiveUsers", (data) => {
      setActiveUsers(data);
    });
  }, [activeUsers]);
  return (
    <div className="admin container">
      <div className="admin__inner">
        <div className="admin__nav">
          <button onClick={fetchActiveUsers} className="normal">
            Активні юзери
          </button>
        </div>
        <div className="admin__container">
          {activeUsers
            ? activeUsers.map((item, idx) => {
                return (
                  <div key={idx} className="user">
                    <p>{item.userId}</p>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
