import React from "react";
import { Button } from "react-bootstrap";
import {format} from 'date-fns';
import ContentCard from "../ContentCard";

import "./InquiryRecord.css";

// PROPS:
// inqObj: object with inquiry data

export const InquiryRecord = (props) => {

    const seeResultsClick = () => {
        console.log("See results clicked on " + JSON.stringify(props.inqObj));
        props.resultsHandler(props.inqObj);
    }

  return (
    <ContentCard className="inq-container">
        <div>
          <strong>Inquiry</strong>
          <p>{props.inqObj.id}</p>
        </div>
        <div>
          <strong>Created on:</strong>
          <p>{format(new Date(props.inqObj.creation_date), "dd/MM/yyyy")}</p>
        </div>
        <div>
          <strong>Ammount:</strong>
          <p>{props.inqObj.ammount}</p>
        </div>
        <div>
          <strong>Installments:</strong>
          <p>{props.inqObj.installments}</p>
        </div>
        <Button variant="primary" className="results-btn" onClick={seeResultsClick}>See results</Button>
    </ContentCard>
  );
};
