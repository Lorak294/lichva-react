import React, { useState } from "react";
import axios from "axios";

import ContentCard from "./ContentCard";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./NewInquiryForm.css";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

import { job_categories, id_types } from "../Constants and definitions/Enums";

// PROPS TO PASS:
//  - user:             user object (empty for annonymous inq.)
const NewInquiryForm = (props) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [selectedGovId, setSelectedGovId] = useState("");

  const annonymous = props.user == null;

  const handleSubmit = (event) => {
    const form = event.target;
    event.preventDefault();
    if (form.checkValidity() === false) {
      //event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }
    else{
      setValidated(true);
      // API CALL HERE
      let inquiry = {
        userId: props.user.id,
        ammount: form.formLoanValue.value,
        installments: form.formNOP.value
      }
      console.log(inquiry);
      alert("Your inquiry has been submitted - you will receive an email with the results");
      navigate("/user");
    }

  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleGovIdChange = (event) => {
    const selectBox = event.currentTarget;
    setSelectedGovId((prev) => {
      return selectBox.value;
    });
  };

  const stingifyField = (fieldName) => {
    let s = "";
    const words = fieldName.split("_");
    words.forEach(
      (word) => (s += word.charAt(0).toUpperCase() + word.slice(1) + " ")
    );
    s = s.slice(0, -1);
    return s;
  };

  return (
    <ContentCard className="form-container">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2>New Inquiry</h2>
        <br />
        <section>
          <h4>Client information</h4>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Name"
                  disabled={!annonymous}
                  defaultValue={annonymous ? "" : props.user.first_name}
                />
                <Form.Control.Feedback type="invalid">
                  Provide your Name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formSurname">
                <Form.Label>Surame</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Surame"
                  disabled={!annonymous}
                  defaultValue={annonymous ? "" : props.user.last_name}
                />
                <Form.Control.Feedback type="invalid">
                  Provide your Surname.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              disabled={!annonymous}
              defaultValue={annonymous ? "" : props.user.email}
            />
            <Form.Control.Feedback type="invalid">
              Provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formJobType">
            <Form.Label>Job Type</Form.Label>
            <Form.Select
              required
              aria-label="Select Job Type"
              disabled={!annonymous}
              defaultValue={annonymous ? "" : props.user.job_type}
            >
              <option value="" hidden={true}></option>
              {Object.keys(job_categories).map((job_type, index) => (
                <option key={index} value={index + 1}>
                  {stingifyField(job_type)}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Choose your job type.
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-3">
            <Col sm={5}>
              <Form.Group className="mb-3" controlId="formGovIdType">
                <Form.Label>Gov ID Type</Form.Label>
                <Form.Select
                  required
                  aria-label="Select Gov ID type"
                  onChange={handleGovIdChange}
                  disabled={!annonymous}
                  defaultValue={annonymous ? "" : props.user.id_type}
                >
                  <option value="" hidden={true}></option>
                  {Object.keys(id_types).map((id_type, index) => (
                    <option key={index} value={index + 1}>
                      {stingifyField(id_type)}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Select one of the Gov ID Types
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formGovIdValue">
                <Form.Label>Gov ID</Form.Label>
                <Form.Control
                  required
                  type="text"
                  disabled={!selectedGovId}
                  placeholder={selectedGovId}
                  readOnly={!annonymous}
                  defaultValue={annonymous ? "" : props.user.id_number}
                />
                <Form.Control.Feedback type="invalid">
                  Provide a valid Gov ID
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </section>
        <section>
          <h4>Loan information</h4>
          <Row>
            <Col>
              {/* THIS MAY BE CHANGED TO SPECIAL MONEY INPUT COMPONENT */}
              <Form.Group className="mb-3" controlId="formLoanValue">
                <Form.Label>Loan value</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter Loan value"
                  min="1000"
                  step="1000"
                  pattern="/d+"
                />
                <Form.Control.Feedback type="invalid">
                  Enter loan value.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formNOP">
                <Form.Label>Number of payments</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter number of payments"
                  min="1"
                  step="1"
                />
                <Form.Control.Feedback type="invalid">
                  Enter number of payments.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </section>
        <Button className="mt-3" variant="primary" type="submit" size="lg">
          Submit
        </Button>
        <Button
          className="mt-3"
          variant="danger"
          size="lg"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Form>
    </ContentCard>
  );
};

export default NewInquiryForm;
