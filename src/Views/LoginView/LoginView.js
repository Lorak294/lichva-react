import React from "react";
import axios from "axios";

import "./LoginView.css";
import logo from "../../logoLichva.png";

import IconButton from "../../Components/IconButton";
import ContentCard from "../../Components/ContentCard";
import Button from "react-bootstrap/Button";
import { SiAzuredevops } from "react-icons/si";
import { Outlet, useNavigate } from "react-router-dom";

const LoginView = () => {
  const navigate = useNavigate();
  const adText = ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui
    imperdiet sem et lectus tempus luctus. Nulla facilisi. Aliquam
    erat volutpat. Phasellus in quam in quam sodales euismod. Aenean
    euismod hendrerit arcu, lacinia consequat elit. Cras mi leo,
    ultricies a augue vel, sodales imperdiet risus. Duis aliquet nisi
    enim, sed tempus magna congue non. Mauris tincidunt euismod magna
    vel euismod.`;

  const annEnqHandler = () => {
    navigate("/annonymousinquiry");
  };

  const loginHandler = () => {
    navigate("/user");
  };

  const registerNowHandler = () => {
    // EXAMPLE API CALL - to delete later
    let inquiry = {
      userId: 2137,
      ammount: 42000,
      installments: 69,
    };
    const headers = {
      "Content-Type": "text/json",
      "accept": "text/plain"
    };

    axios
      .post("https://lichvanotitia.azurewebsites.net/api/Inquire", inquiry, {headers: headers})
      .then((res) => {
        console.log("PUT RESPONSE:");
        console.log(res);
      });
  };

  return (
    <div>
      <div className="logo-pannel">
        <span className="logo-span">
          <img className="logo-img" src={logo} alt="logo" />
        </span>
        <span className="slogan-span">
          <h1> Lich.va</h1>
          <h3> Your place for loans</h3>
        </span>
      </div>

      <ContentCard className="login-card">
        <h3>One of the best Credit Comparing Websites</h3>
        <p>{adText}</p>
        <IconButton
          size="lg"
          icon={<SiAzuredevops />}
          variant="primary"
          onClick={loginHandler}
        >
          Login with Azure Ad
        </IconButton>
        <hr />
        <p>Don't have an account?</p>
        <Button variant="primary mb-3" size="lg" onClick={registerNowHandler}>
          Register Now
        </Button>
        <p>or</p>
        <Button variant="primary" size="lg" onClick={annEnqHandler}>
          Create an annonymous inquiry
        </Button>
      </ContentCard>
      <Outlet />
    </div>
  );
};

export default LoginView;
