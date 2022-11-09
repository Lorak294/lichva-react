import React, {useState} from "react";

import ContentCard from "./ContentCard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./RegistrarionForm.css";

const RegistrationForm = (props) => {
  const [validated, setValidated] = useState(false);
  const [selectedGovId,setSelectedGovId] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleGovIdChange = (event) => {
    const selectBox = event.currentTarget;
    setSelectedGovId((prev) => {return selectBox.value;});
  }



  return (
    <ContentCard className="form-container">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2>Register</h2>

        <Form.Group className="mb-3" controlId="formEmailFloat">
          <Form.Label>Email address</Form.Label>
          <Form.Control required type="email" placeholder="Enter email" />
          <Form.Control.Feedback type="invalid">Provide a valid email.</Form.Control.Feedback>
          <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control required type="text" placeholder="Enter Name" />
              <Form.Control.Feedback type="invalid">Provide a Name</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="formSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control required type="text" placeholder="Enter Surame" />
              <Form.Control.Feedback type="invalid">Provide a Surname</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formJobType">
          <Form.Label>Job Type</Form.Label>
          <Form.Select required aria-label="Select Job Type">
            <option value="" hidden="true"></option>
            <option value="1">Job Type One</option>
            <option value="2">Job Type Two</option>
            <option value="3">Job Type Three</option>
            <option value="4">Other</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">Select one of the Job Types</Form.Control.Feedback>
        </Form.Group>

        <Row className="mb-3">
          <Col sm={5}>
            <Form.Group className="mb-3" controlId="formGovIdType">
              <Form.Label>Gov ID Type</Form.Label>
              <Form.Select required aria-label="Select Gov ID type" onChange={handleGovIdChange}>
                <option value="" hidden="true"></option>
                <option value="1"> Gov ID Type One </option>
                <option value="2"> Gov ID Type Two </option>
                <option value="3"> Gov ID Type Three </option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Select one of the Gov ID Types</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formGovIdValue">
              <Form.Label>Gov ID</Form.Label>
              <Form.Control required type="text" disabled={!selectedGovId} placeholder={selectedGovId}/>
              <Form.Control.Feedback type="invalid">Provide a valid Gov ID</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" size="lg">
          Submit
        </Button>
      </Form>
    </ContentCard>
  );
};

export default RegistrationForm;
