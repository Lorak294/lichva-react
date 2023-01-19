import React, { useState, useEffect } from "react";

import ContentCard from "../../Components/ContentCard";
import OffersTable from "../../Components/Data Tables/OffersTable";
import { Button } from "react-bootstrap";
import { useAuth } from "../../Hooks/AuthProvider";

import "./BankAdminPannel.css";
import { Outlet, useNavigate } from "react-router-dom";


const BankAdminPannel = (props) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const myOffersHandler = () =>{
    navigate(`/dashboard/user/offers`);
  }

  const myInquiriesHandler = () =>{
    navigate(`/dashboard/user/inquiries`);
  }

  return (
    <div>
      <div className="welcome-banner">
        <h1>Welcome {user.data.firstName}!</h1>
        <h3>You represent Lich.va Bank Departement</h3>
      </div>
      <div className="lists-buttons">
        <Button variant="primary" onClick={myInquiriesHandler}>
          <h3>Inquiries to my bank</h3>
          <br />
          <p>Here you can see what inquireies have been made to Your bank.</p>
        </Button>
        <Button variant="primary" onClick={myOffersHandler}>
          <h3>Offers made by my Bank</h3>
          <br />
          <p>
            Here you can check and manage all the offers Your bank has made to the applicants
          </p>
        </Button>
      </div>
      <Outlet/>
    </div>
  );
};

export default BankAdminPannel;
