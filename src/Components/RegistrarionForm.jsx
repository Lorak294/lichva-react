import React, {useState, useEffect} from "react";

import ContentCard from "./ContentCard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import {useAuth} from "../Hooks/AuthProvider";
import { job_categories, id_types } from "../Constants and definitions/Enums";

import "./RegistrarionForm.css";
import { useNavigate } from "react-router";
import axios from "axios";
//import { useEffect } from "react";

const RegistrationForm = () => {
  const [validated, setValidated] = useState(false);
  const [selectedGovId,setSelectedGovId] = useState("");
  const [idTypes,setIdTypes] = useState([]);
  const [jobTypes,setJobTypes] = useState([]);

  const {token, user, logout,login} = useAuth();
  const navigate = useNavigate();


  const fetchJobTypes = async () =>{
    try{

    
    const response = await axios.get("https://lichvanotitia.azurewebsites.net/api/dictionary/jobs");
    setJobTypes(response.data);
    }
    catch(err)
    {
      console.log(err);
    }
  }

  const fetchIdTypes = async () =>{
    await axios
    .get("https://lichvanotitia.azurewebsites.net/api/dictionary/idTypes")
    .then((response) => {
      //console.log("inquireis have been fetched");
      //console.log(response.data);
      //setWaitingForData(false);
      setIdTypes(response.data);
    })
    .catch((err) => {
      //setWaitingForData(false);
      console.log(err);
    });
  }

  const sendUpdatedUser = async (updatedUser) => {
    try{
      // const config = {
      //   headers:{
      //     Authorization : `Bearer ${token}`
      //   }
      // };
      // const response = await axios.put("https://lichvanotitia.azurewebsites.net/api/User",updatedUser,config);
      const response = await axios.put("https://lichvanotitia.azurewebsites.net/api/User",updatedUser);
      login({token: token, user: updatedUser});
      }
      catch(err)
      {
        console.log(err);
      }
  }

  const handleSubmit = (event) => {
    const form = event.target;

    console.log("FORM OBJECT", form);
    event.preventDefault();
    if (form.checkValidity() === false) {
      //event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(true);
      let updatedUser = {
        ...user,
        hash: form.formEmail.value,
        firstName: form.formName.value,
        lastName: form.formSurname.value,
        jobType: form.formJobType.value,
        idType: selectedGovId,
        idNumber: form.formIdValue.value,
        incomeLevel: 123,
        role: 'user',
        active: true,
      };
      console.log('UPDATED USER', updatedUser);
      sendUpdatedUser(updatedUser);
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

   useEffect(() => {
       console.log("fetching enums...")
       fetchIdTypes();
       fetchJobTypes();
    },[]);

  console.log("rendering form");

  return (
    <ContentCard className="form-container">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2>Registration form</h2>
        <br/>
        <p>Because this is Your first sign-in, in order to proceed You have to provide more information.</p>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control required disabled type="email" placeholder="Enter email" value={user.email}/>
          <Form.Control.Feedback type="invalid">Provide a valid email.</Form.Control.Feedback>
          <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control required type="text" placeholder="Enter Name" defaultValue={user.firstName}/>
              <Form.Control.Feedback type="invalid">Provide a Name</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="formSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control required type="text" placeholder="Enter Surame"  defaultValue={user.lastName}/>
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
              {jobTypes.map((job_type, index) => (
                <option key={index} value={job_type}>
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
              <Form.Group className="mb-3" controlId="formIdType">
                <Form.Label>Gov ID Type</Form.Label>
                <Form.Select
                  required
                  aria-label="Select Gov ID type"
                  onChange={handleGovIdChange}
                  defaultValue={""}
                >
                  <option value="" hidden={true}></option>
                  {idTypes.map((id_type, index) => (
                    <option key={index} value={id_type}>
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
              <Form.Group className="mb-3" controlId="formIdValue">
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
