import "./HeaderNav.scss";
import { navbar_menu } from "../../../data/navbar_menu";
import MenuItem from "./MenuItem";
import { useState } from "react";
import Dropdown from "react-multilevel-dropdown";
import { Link } from "react-router-dom";
const HeaderNav = () => {
  const [showSub, setShowSub] = useState(false);
  const showSubMenu = () => {
    setShowSub((prev) => !prev);
  };
  return (
    <div className="header__menu">
      {navbar_menu.map((item, idx) => (
        <MenuItem key={idx} item={item} />
      ))}
    </div>
  );
};

export default HeaderNav;
