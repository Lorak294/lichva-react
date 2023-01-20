import React, { useState } from "react";
import Popup from "./Popup";
import ContentCard from "./ContentCard";
import axios from "axios";

import "./OfferApplication.css";

import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/AuthProvider";

export const OfferApplication = () => {
  const [validated, setValidated] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { token, authToken, getCallConfig } = useAuth();

  const handleCancel = () => {
    navigate(-1);
  };

  const offerObj = location.state;

  const selectFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(true);

      console.log(file);
      if (file) {
        let formData = new FormData();
        formData.append("file", file);

        axios
          .post(
            `https://lichvanotitia.azurewebsites.net/api/Offer/${offerObj.id}/document/upload`,
            formData,
            {
              headers: {
                authorization: `Bearer ${token}`,
                authToken: `${authToken}`,
                "content-type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            axios
              .put(
                `https://lichvanotitia.azurewebsites.net/api/Offer/${offerObj.id}/updateStatus?newStateId=2`,
                null,
                getCallConfig()
              )
              .then((response) => {
                alert(
                  "Your application will be processed now. You can check the progress in My Offers section. Thank you for your application."
                );
                navigate("/dashboard/user");
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    }
  };

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
                  href="https://lichvablob.blob.core.windows.net/lichvapdf/umowa_blank.pdf"
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
                <Form.Control type="file" required onChange={selectFile} />
                <Form.Control.Feedback type="invalid">
                  You must upload a file
                </Form.Control.Feedback>
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
