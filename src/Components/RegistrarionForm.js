import React, {useState} from "react";

import ContentCard from "./ContentCard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import "./RegistrationForm.css";

const RegistrationForm = (props) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


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
            {/* <FloatingLabel controlId="formName" label="Name">
              <Form.Control required type="text" placeholder="Name" />
              <Form.Control.Feedback type="invalid ">Provide a Name.</Form.Control.Feedback>
            </FloatingLabel> */}
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control required type="text" placeholder="Enter Name" />
              <Form.Control.Feedback type="invalid">Provide a Name</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            {/* <FloatingLabel controlId="formSurame" label="Surame">
              <Form.Control required type="text" placeholder="Surame" />
              <Form.Control.Feedback type="invalid ">Provide a Surame.</Form.Control.Feedback>
            </FloatingLabel> */}
            <Form.Group className="mb-3" controlId="formSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control required type="text" placeholder="Enter Surame" />
              <Form.Control.Feedback type="invalid">Provide a Surname</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* <FloatingLabel
          className="mb-3"
          controlId="formJobType"
          label="Job Type"
        >
          <Form.Select aria-label="Select Job Type">
            <option value="1">Job Type One</option>
            <option value="2">Job Type Two</option>
            <option value="3">Job Type Three</option>
            <option value="4">Other</option>
          </Form.Select>
        </FloatingLabel> */}

        <Form.Group className="mb-3" controlId="formJobType">
          <Form.Label>Job Type</Form.Label>
          <Form.Select aria-label="Select Job Type">
            <option value="1">Job Type One</option>
            <option value="2">Job Type Two</option>
            <option value="3">Job Type Three</option>
            <option value="4">Other</option>
          </Form.Select>
        </Form.Group>

        <Row className="mb-3">
          <Col sm={5}>
            {/* <FloatingLabel
              controlId="govIdType"
              label="Gov ID Type"
              className="mb-3"
            >
              <Form.Select aria-label="Select Gov ID type">
                <option value="1">Gov ID Type One</option>
                <option value="2">Gov ID Type Two</option>
                <option value="3">Gov ID Type Three</option>
              </Form.Select>
            </FloatingLabel> */}
            <Form.Group className="mb-3" controlId="formGovIdType">
              <Form.Label>Job Type</Form.Label>
              <Form.Select aria-label="Select Gov ID type">
                <option value="1"> Gov ID Type One </option>
                <option value="2"> Gov ID Type Two </option>
                <option value="3"> Gov ID Type Three </option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            {/* <FloatingLabel
              controlId="govIdValue"
              label="Gov ID"
              className="mb-3"
            >
              <Form.Control required type="text" placeholder="Enter Gov ID" />
              <Form.Control.Feedback type="invalid ">Provide a valid Gov ID.</Form.Control.Feedback>
            </FloatingLabel> */}
            <Form.Group className="mb-3" controlId="formGovIdValue">
              <Form.Label>Gov ID</Form.Label>
              <Form.Control required type="text" placeholder="Enter Gov ID"/>
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
