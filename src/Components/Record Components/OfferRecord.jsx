import React from "react";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import ContentCard from "../ContentCard";
import { offer_status } from "../../Constants and definitions/Enums";

import "./OfferRecord.css";

// PROPS:
// offerObj: object with ofer data
// offerApply: handler to navigate to offerAccept popup

export const OfferRecord = (props) => {

  const getBankLogo = () => {
    // TEMPORARY BMW LOGO -> implement getting bank icon url from offer obj

    // NOTE: Sorting is by bankID anyway so maybe write a function to get bank name and icon from id

    return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/2048px-BMW_logo_%28gray%29.svg.png";
  };

  const applyClick = () => {
    // implement apply form for offer
    console.log("Apply clicked on:" + JSON.stringify(props.offerObj));
    props.offerApply(props.offerObj);
  };

  const declineHandler = () => {
    console.log("decline clicked");
  };

  const acceptHandler = () => {
    console.log("accept clicked");
  };

  const applicantDetailHandler = () => {
    console.log("details about applicant clicked");
  };

  return (
    <ContentCard className="offer-container">
      <div>
        <strong>Created on:</strong>
        <p>{format(new Date(props.offerObj.creationDate), "dd/MM/yyyy")}</p>
      </div>
      {props.bankPerspective && (
        <div>
          <strong>Applicant:</strong>
          <br/>
          <Button size="sm" variant="primary" onClick={applicantDetailHandler}>See applicant details</Button>
        </div>
      )}
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
      <div>
        <strong>Contract:</strong>
        <p>
          <a
            href={props.offerObj.generatedContract}
            target="_blank"
            rel="noreferrer"
          >
            PDF
          </a>
        </p>
      </div>
      <div>
        <strong>Status:</strong>

        {props.offerObj.offerStatus === offer_status.offered && (
          <p className="status-text bg-primary">Offered</p>
        )}
        {props.offerObj.offerStatus === offer_status.waiting_for_acceptance && (
          <p className="status-text bg-warning">
            Waiting for
            <br />
            acceptance
          </p>
        )}
        {props.offerObj.offerStatus === offer_status.accepted && (
          <p className="status-text bg-success">Accepted</p>
        )}
        {props.offerObj.offerStatus === offer_status.declined && (
          <p className="status-text bg-danger">Declined</p>
        )}
      </div>
      {props.bankPerspective ? (
        <div>
          <Button
            variant="success"
            disabled={
              props.offerObj.offerStatus !== offer_status.waiting_for_acceptance
            }
            onClick={acceptHandler}
          >
            Accept
          </Button>
          <Button
            variant="danger"
            disabled={
              props.offerObj.offerStatus !== offer_status.waiting_for_acceptance
            }
            onClick={declineHandler}
          >
            Decline
          </Button>
        </div>
      ) : (
        <Button
          variant="success"
          disabled={props.offerObj.offerStatus !== offer_status.offered}
          className="apply-btn"
          onClick={applyClick}
        >
          Apply
        </Button>
      )}
    </ContentCard>
  );
};
