import React from "react";
import Button from "react-bootstrap/esm/Button";
import TopMenu from "../../Components/TopMenu";
import { BiPlus } from "react-icons/bi";
import "./UserView.css";

const UserView = () => {
  // BUTTON HANDLERS
  const logoutHandler = () => {
    console.log("external logout clicked");
  };

  const userStr = "Example user";

  return (
    <div>
      <TopMenu onLogoutClick={logoutHandler}></TopMenu>
      <div className="welcome-banner">
        <h1>Welcome {userStr}!</h1>
        <p>Looking for a new loan?</p>
        <Button variant="primary" size="lg">
          <div className="icon-btn">
            <span className="text-span">Create new inquiry</span>
            <span className="icon-span">
              <BiPlus size="25"/>
            </span>
          </div>
        </Button>
      </div>

      <div className="lists-buttons">
        <Button variant="light">
          <h3>My inquiries</h3>
          <br />
          <p>Here you can see what inquireies you have made in the past.</p>
        </Button>
        <Button variant="light">
          <h3>My offers</h3>
          <br />
          <p>
            Here you can check all the offers that were made to you by the
            banks.
          </p>
        </Button>
      </div>
    </div>
  );
};

export default UserView;
