import React from "react";
import { Button } from "react-bootstrap";
import {format} from 'date-fns';
import ContentCard from "../ContentCard";

import "./OfferRecord.css";

// PROPS:
// offerObj: object with ofer data

export const OfferRecord = (props) => {
  const getBankLogo = () => {
    // TEMPORARY BMW LOGO -> implement getting bank icon url from offer obj

    // NOTE: Sorting is by bankID anyway so maybe write a function to get bank name and icon from id

    return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/2048px-BMW_logo_%28gray%29.svg.png";
  };

  const applyClick = () => {
    // implement apply form for offer
    console.log("Apply clicked on:" + JSON.stringify(props.offerObj));
  }

  const seeInquiryDetailsClick = () => {
     // implement inquiry details popup
    console.log("See Inquiry Details clicked on:" + JSON.stringify(props.offerObj));
  }

  return (
    <ContentCard className="offer-container">
        <div>
          <strong>Offer</strong>
          <p>{props.offerObj.id}</p>
        </div>
        <div>
          <strong>For inquiry</strong>
          <br/>
          <Button variant="primary" size="sm" onClick={seeInquiryDetailsClick}>See Inquiry Details</Button>
        </div>
        <div>
          <strong>Created on:</strong>
          <p>{format(new Date(props.offerObj.creation_date), "dd/MM/yyyy")}</p>
        </div>
        <div>
          <strong>Bank:</strong>
          <div className="bank-container">
            <p>Bank name</p>
            <img className="bank-logo" src={getBankLogo()} alt="logo" />
          </div>
        </div>
        <div>
          <strong>Ammount:</strong>
          <p>{props.offerObj.ammount}</p>
        </div>
        <div>
          <strong>Installments:</strong>
          <p>{props.offerObj.installments}</p>
        </div>
        <Button variant="success" className="apply-btn" onClick={applyClick}>Apply</Button>
    </ContentCard>
  );
};
