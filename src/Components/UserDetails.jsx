import React from "react";
import axios from "axios";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/AuthProvider";
import ContentCard from "./ContentCard";
import Popup from "./Popup";
import { useEffect } from "react";

import "./UserDetails.css";

export const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const { getCallConfig } = useAuth();

  const offerObj = location.state;

  if (!offerObj) {
    navigate(-1);
  }

  //console.log(offerObj);
  const fetchUserDetails = async () => {
    axios
      .get(
        `https://lichvanotitia.azurewebsites.net/api/User?offerId=${offerObj.id}`,
        getCallConfig()
      )
      .then((response) => {
        setUserData(response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Popup>
      <ContentCard className="details-container">
        <h2>Applicant details</h2>
        <div>
          {userData ? (
            <div className="elements-div">
              <div>
                <strong>First name</strong>
                <p>{userData.firstName}</p>
              </div>
              <div>
                <strong>Last name</strong>
                <p>{userData.lastName}</p>
              </div>
              <div>
                <strong>Income level</strong>
                <p>{userData.incomeLevel}</p>
              </div>
            </div>
          ) : (
            <Spinner animation="border" variant="primary" />
          )}
        </div>
      </ContentCard>
    </Popup>
  );
};
