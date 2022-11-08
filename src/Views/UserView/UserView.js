import React from "react";

import TopMenu from "../../Components/TopMenu";
import CommonUserPannel from "./CommonUserPannel";
import BankAdminPannel from "./BankAdminPannel";
import PageAdminPannel from "./PageAdminPannel";
import "./UserView.css";

const UserView = () => {
  // BUTTON HANDLERS
  const logoutHandler = () => {
    console.log("external logout clicked");
  };

  const userStr = "Example user";

  return (
    <div>
      <TopMenu onLogoutClick={logoutHandler}/>
      <CommonUserPannel user={userStr}/>
      {/* <BankAdminPannel user={userStr}/> */}
      {/* <PageAdminPannel user={userStr}></PageAdminPannel> */}
    </div>
  );
};

export default UserView;
