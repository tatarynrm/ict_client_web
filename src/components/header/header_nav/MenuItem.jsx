import { Link } from "react-router-dom";
import { FcAssistant } from "react-icons/fc";
import { useSelector } from "react-redux";
const MenuItem = ({ item }) => {
  const userData = useSelector((state) => state.auth.data);

  return (
    <>
      <div className={item.submenu ? "menu__item submenu" : "menu__item"}>
        <div>{item.icon}</div>
        <Link to={item.link}>{item.label}</Link>

        {item.submenu && (
          <div className={"submenu__items"}>
            {item.submenu &&
              item.submenu.map((item, idx) => {
                return (
                  <div key={idx + 1} className="submenu__item">
                    <Link to={item.link}>{item.label}</Link>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default MenuItem;
