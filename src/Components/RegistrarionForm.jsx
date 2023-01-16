import React, {useState} from "react";

import ContentCard from "./ContentCard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import {useAuth} from "../Hooks/AuthProvider";
import { job_categories, id_types } from "../Constants and definitions/Enums";

import "./RegistrarionForm.css";
import { useNavigate } from "react-router";
//import { useEffect } from "react";

const RegistrationForm = () => {
  const [validated, setValidated] = useState(false);
  const [selectedGovId,setSelectedGovId] = useState("");

  const {user, logout} = useAuth();
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    const form = event.target;
    event.preventDefault();
    if (form.checkValidity() === false) {
      //event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(true);
      // API CALL HERE -> sending form information to back
      navigate('/dashboard/user');
    }
  };

  const handleCancel = () => {
    logout();
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

  // useEffect(() => {
  //   if(USER MA WYPEŁNIONE DANE){
  //     navigate('dashboard/user');
  //   }
  // })



  return (
    <ContentCard className="form-container">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2>Registration form</h2>
        <br/>
        <p>Because this is Your first sign-in, in order to proceed You have to provide more information.</p>

        <Form.Group className="mb-3" controlId="formEmailFloat">
          <Form.Label>Email address</Form.Label>
          <Form.Control required disabled type="email" placeholder="Enter email" value={user.email}/>
          <Form.Control.Feedback type="invalid">Provide a valid email.</Form.Control.Feedback>
          <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control required type="text" placeholder="Enter Name" value={user.givenName}/>
              <Form.Control.Feedback type="invalid">Provide a Name</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="formSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control required type="text" placeholder="Enter Surame"  value={user.familyName}/>
              <Form.Control.Feedback type="invalid">Provide a Surname</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formJobType">
            <Form.Label>Job Type</Form.Label>
            <Form.Select
              required
              aria-label="Select Job Type"
              defaultValue={""}
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
                  defaultValue={""}
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
                  defaultValue={""}
                />
                <Form.Control.Feedback type="invalid">
                  Provide a valid Gov ID
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>



        <Button variant="primary" type="submit" size="lg">
          Submit
        </Button>
        <Button variant="danger" size="lg" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </ContentCard>
  );
};

export default RegistrationForm;
