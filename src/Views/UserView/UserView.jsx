import React from "react";

import TopMenu from "../../Components/TopMenu";
import CommonUserPannel from "./CommonUserPannel";
import BankAdminPannel from "./BankAdminPannel";
import PageAdminPannel from "./PageAdminPannel";
import "./UserView.css";
import { useNavigate } from "react-router-dom";

import {exampleUser} from "../../Constants and definitions/ExampleData";
import {roles} from "../../Constants and definitions/Enums";

let user = exampleUser;

const UserView = (props) => {
  const navigate = useNavigate();

  const renderSwitch = (userRole) => {
    // switch(userRole){
    //   case roles.admin:
    //     console.log("case admin");
    //     return <PageAdminPannel user={user}/>;
    //   case roles.employee:
    //     console.log("case employee");
    //     return <BankAdminPannel user={user}/>;
    //   case roles.user:
    //     console.log("case user");
    //     return <CommonUserPannel user={user}/>;
    //   default:
    //     console.log("case default");
    //     return <p className="background-black"/>;
    // }

    return <CommonUserPannel/>;
  }

  return (
    <div>
      <TopMenu/>
      {renderSwitch(user.role)}
    </div>
  );
};

export default UserView;
