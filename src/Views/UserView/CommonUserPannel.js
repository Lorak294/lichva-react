import React from "react";

import IconButton from "../../Components/IconButton";
import Button from "react-bootstrap/esm/Button";
import { BiPlus } from "react-icons/bi";

import "./CommonUserPannel.css";
import { Outlet, useNavigate } from "react-router-dom";


// PROPS TO PASS:
//  - user:             user object

const CommonUserPannel = (props) => {
    const navigate = useNavigate();  

    const newInqHandler = () =>{
       navigate(`/user/newinquiry`,{state: props.user});
    }
  
  
    return(
      <div>
        <div className="welcome-banner">
        <h1>Welcome {props.user.first_name}!</h1>
        <p>Looking for a new loan?</p>
        <IconButton icon={<BiPlus size="25"/>} variant="primary" size="lg" className="new-inq-btn" onClick={newInqHandler}>
          Create new inquiry
        </IconButton>
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
      <Outlet/>
      </div>
    );
}

export default CommonUserPannel;