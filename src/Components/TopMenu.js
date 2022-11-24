import React from "react";
import "./TopMenu.css";

import IconButton from "./IconButton";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

// PROPS TO PASS:
//  - user:             user object
//  - onLogoutclick:    hander for clicking the Logout button

const TopMenu = (props) => {
  return (
    <div className="top-menu-bar">
      <span className="profile-span">
        <span className="profile-span-icon">
          <CgProfile size={30} />
        </span>
        <span className="profile-span-username">
          {`${props.user.first_name} ${props.user.last_name}` || "Example User"}
        </span>
      </span>
      <span className="logout-button-span">
        <IconButton
          icon={<FiLogOut />}
          variant="primary"
          onClick={
            props.onLogoutClick ||
            (() => {
              console.log("[E] logout clicked");
            })
          }
        >
          Logout
        </IconButton>
      </span>
    </div>
  );
};

export default TopMenu;
