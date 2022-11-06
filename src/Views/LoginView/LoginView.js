import React from "react";

import "./LoginView.css";

import Button from "react-bootstrap/Button";
import { SiAzuredevops } from "react-icons/si";

const LoginView = () => {
  const adText = ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui
    imperdiet sem et lectus tempus luctus. Nulla facilisi. Aliquam
    erat volutpat. Phasellus in quam in quam sodales euismod. Aenean
    euismod hendrerit arcu, lacinia consequat elit. Cras mi leo,
    ultricies a augue vel, sodales imperdiet risus. Duis aliquet nisi
    enim, sed tempus magna congue non. Mauris tincidunt euismod magna
    vel euismod.`;

  return (
    <div>
      
      <div className="logo-pannel">
        <span className="logo-span">INSERT LOGO HERE</span>
        <span className="slogan-span">
          <h1> Lich.va</h1>
          <h3> Your place for loans</h3>
        </span>
      </div>

      <div className="login-card">
        <h3>One of the best Credit Comparing Websites</h3>
        <p>{adText}</p>
        <Button variant="primary">
          <span class="btn-text">Login with Azure Ad</span>
          <span class="btn-icon">
            {" "}
            <SiAzuredevops />
          </span>
        </Button>
        <hr />
        <p>Don't have an account?</p>
        <Button variant="primary mb-3">Register Now</Button>
        <p>or</p>
        <Button variant="primary">Create an annonymous inquiry</Button>
      </div>
    </div>
  );
};

export default LoginView;
