import React from "react";
import "./TopMenu.css";

import Button from "react-bootstrap/Button";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";


// PROPS TO PASS:
//  - user:             string with username
//  - onLogoutclick:    hander for clicking the Logout button

const TopMenu = (props) => {
  return (
    <div className="top-menu-bar">
      <span className="profile-span">
        <span className="profile-span-icon">
          <CgProfile size={30} />
        </span>
        <span className="profile-span-username">
          {props.user ? props.user : "Example User"}
        </span>
      </span>
      <span className="logout-button-span">
        <Button
          variant="primary"
          onClick={
            props.onLogoutClick
              ? props.onLogoutClick
              : () => {
                  console.log("[E] logout clicked");
                }
          }
        >
          <span class="btn-text">Logout</span>
          <span class="btn-icon">
            {" "}
            <FiLogOut />
          </span>
        </Button>
      </span>
    </div>
  );
};

export default TopMenu;
