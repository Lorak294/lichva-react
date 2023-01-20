import React from "react";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import ContentCard from "../ContentCard";
import { offer_status } from "../../Constants and definitions/Enums";

import "./OfferRecord.css";
import { useAuth } from "../../Hooks/AuthProvider";

// PROPS:
// offerObj: object with ofer data
// offerApply: handler to navigate to offerAccept popup
// offerStatuses

export const OfferRecord = (props) => {
  const { user } = useAuth();

  const bankPerspective = user && user.data.roleId == 3;
  const applyClick = () => {
    // implement apply form for offer
    console.log("Apply clicked on:" + JSON.stringify(props.offerObj));
    props.offerApply(props.offerObj);
  };

  const declineHandler = (event) => {
    event.target.disabled = true;
    document.getElementById(`acceptButton${props.offerObj.id}`).disabled= true;
    console.log("decline clicked");
        // axios.put(... , {...props.offerObj, statusId: 4})
          // .then( (response) => {
          //   alert("Your application will be processed now. You can check the progress in My Offers section. Thank you for your application.")
          //   navigate("/dashboard/user");
          // }
          // ).catch((err) => console.log(err));
  };

  const acceptHandler = (event) => {
    console.log("accept clicked");
    event.target.disabled = true;
    document.getElementById(`declineButton${props.offerObj.id}`).disabled= true;
    // axios.put(... , {...props.offerObj, statusId: 3})
          // .then( (response) => {
          //   alert("Your application will be processed now. You can check the progress in My Offers section. Thank you for your application.")
          //   navigate("/dashboard/user");
          // }
          // ).catch((err) => console.log(err));


  };

  const applicantDetailHandler = () => {
    console.log("details about applicant clicked");
  };

  const getBankName = () => {
    return (props.bank && props.banks.find((bank) => bank.id == props.offerObj.bankId).name);
  }


  return (
    <ContentCard className="offer-container">
      <div>
        <strong>Created on:</strong>
        <p>{format(new Date(props.offerObj.createDate), "dd/MM/yyyy")}</p>
      </div>
      {bankPerspective && (
        <div>
          <strong>Applicant:</strong>
          <br />
          <Button size="sm" variant="primary" onClick={applicantDetailHandler}>
            See applicant details
          </Button>
        </div>
      )}
      <div>
        <strong>Bank:</strong>
        <p>{getBankName()}</p>
      </div>
      <div>
        <strong>Requested value:</strong>
        <p>{props.offerObj.ammount}</p>
      </div>
      <div>
        <strong>Installments:</strong>
        <p>{props.offerObj.installments}</p>
      </div>
      <div>
        <strong>Percentage:</strong>
        <p>{props.offerObj.percentage}</p>
      </div>
      <div>
        <strong>Monthly Installment:</strong>
        <p>{props.offerObj.monthlyInstallment}</p>
      </div>
      <div>
        <strong>Generated Contract:</strong>
        <p>
            <a
              href='https://lichvablob.blob.core.windows.net/lichvapdf/umowa_blank.pdf'
              target="_blank"
              rel="noreferrer"
            >
              PDF
            </a>
        </p>
      </div>
      <div>
        <strong>Signed Contract:</strong>
          {!props.offerObj.documentLink ? (
            <p>No file</p>
          ) : (
            <a
              href={props.offerObj.documentLink}
              target="_blank"
              rel="noreferrer"
            >
              PDF
            </a>
          )}
      </div>
      <div>
        <strong>Status:</strong>

        {props.offerObj.statusDescription === 'offered' && (
          <p className="status-text bg-primary">Offered</p>
        )}
        {props.offerObj.statusDescription === 'waiting_for_acceptance' && (
          <p className="status-text bg-warning">
            Waiting for
            <br />
            acceptance
          </p>
        )}
        {props.offerObj.statusDescription === 'accepted' && (
          <p className="status-text bg-success">Accepted</p>
        )}
        {props.offerObj.statusDescription === 'declined' && (
          <p className="status-text bg-danger">Declined</p>
        )}
      </div>
      {user.data.roleId === 3 ? (
        <div>
          <Button
            variant="success"
            disabled={
              props.offerObj.statusDescription !== 'waiting_for_acceptance'
            }
            onClick={acceptHandler}
            id={`acceptButton${props.offerObj.id}`}
          >
            Accept
          </Button>
          <Button
            variant="danger"
            disabled={
              props.offerObj.statusDescription !== 'waiting_for_acceptance'
            }
            onClick={declineHandler}
            id={`declineButton${props.offerObj.id}`}
          >
            Decline
          </Button>
        </div>
      ) : (
        <Button
          variant="success"
          disabled={props.offerObj.statusDescription !== 'offered'}
          className="apply-btn"
          onClick={applyClick}
        >
          Apply
        </Button>
      )}
    </ContentCard>
  );
};
