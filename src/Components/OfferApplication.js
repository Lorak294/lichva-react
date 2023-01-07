import React, { useState } from "react";
import Popup from "./Popup";
import ContentCard from "./ContentCard";


import "./OfferApplication.css";

import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

export const OfferApplication = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCancel = () => {
    navigate(-1);
  };

  const offerObj = location.state;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }
    else{
      setValidated(true);
      navigate("/user");
    }
  }

  return (
    <Popup>
      <ContentCard className="application-container">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h2>
            To apply for this offer you must fill out and uplaod the contract
          </h2>
          <div className="elements-div">
            <div>
              <h5>Generated contract:</h5>
              <p>
                <a
                  href={offerObj.generated_contract_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  PDF
                </a>
              </p>
            </div>

            <div>
              <Form.Group controlId="contractFile" className="mb-3">
                <Form.Label>Your signed contract</Form.Label>
                <Form.Control type="file" required/>
                <Form.Control.Feedback type="invalid">You must upload a file</Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          <Button variant="danger" onClick={handleCancel}>
            {" "}
            Cancel
          </Button>
          <Button variant="success" type="submit">
            {" "}
            Apply
          </Button>
        </Form>
      </ContentCard>
    </Popup>
  );
};
