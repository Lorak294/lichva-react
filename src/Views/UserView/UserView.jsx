import React from "react";

import TopMenu from "../../Components/TopMenu";
import CommonUserPannel from "./CommonUserPannel";
import BankAdminPannel from "./BankAdminPannel";
import PageAdminPannel from "./PageAdminPannel";
import "./UserView.css";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../Hooks/AuthProvider";

const UserView = (props) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const renderSwitch = (userRole) => {
    switch (user.data.roleId) {
      case 2:
        console.log("case admin");
        return <PageAdminPannel />;
      case 3:
        console.log("case employee");
        return <BankAdminPannel/>;
      case 1:
        console.log("case user");
        return <CommonUserPannel/>;
      default:
        console.log("case default");
        return <p className="background-black" />;
    }
  };

  return (
    <div>
      <TopMenu />
      {renderSwitch(user.role)}
    </div>
  );
};

export default UserView;
