import React from "react";
import "./TopMenu.css";

import IconButton from "./IconButton";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../Hooks/AuthProvider";

// PROPS TO PASS:

const TopMenu = (props) => {
  const { user, logout } = useAuth();

  return (
    <div className="top-menu-bar">
      <span className="profile-span">
        <span className="profile-span-icon">
          <CgProfile size={30} />
        </span>
        <span className="profile-span-username">
          {user.name}
        </span>
      </span>
      <span className="logout-button-span">
        <IconButton icon={<FiLogOut />} variant="primary" onClick={logout}>
          Logout
        </IconButton>
      </span>
    </div>
  );
};

export default TopMenu;
