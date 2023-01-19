import React, { useState, useEffect } from "react";
import axios from "axios";

import ContentCard from "./ContentCard";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./NewInquiryForm.css";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../Hooks/AuthProvider";

const NewInquiryForm = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [selectedGovId, setSelectedGovId] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [idTypes, setIdTypes] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);

  const { user, getCallConfig} = useAuth();
  const annonymous = user == null;

  console.log("user stored data:", user);

  const fetchJobTypes = async () => {
    try {
      const response = await axios.get(
        "https://lichvanotitia.azurewebsites.net/api/dictionary/jobs"
      );
      console.log("jobs response: ", response);
      setJobTypes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchIdTypes = async () => {
    await axios
      .get("https://lichvanotitia.azurewebsites.net/api/dictionary/idTypes")
      .then((response) => {
        //console.log("inquireis have been fetched");
        console.log("id response: ", response);
        //setWaitingForData(false);
        setIdTypes(response.data);
      })
      .catch((err) => {
        //setWaitingForData(false);
        console.log(err);
      });
  };

  const handleSubmit = (event) => {
    const form = event.target;
    event.preventDefault();
    if (form.checkValidity() === false) {
      //event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(true);
      // API CALL HERE

      let selectedGovIdObj = idTypes.find((type) => type.id == selectedGovId);
      let selectedJobTypeObj = jobTypes.find(
        (type) => type.id == selectedJobType
      );

      let inquiry = {
        value: form.formLoanValue.value,
        installmentsNumber: form.formNOP.value,
        governmentDocument: {
          typeId: selectedGovIdObj.id,
          name: selectedGovIdObj.name,
          description: selectedGovIdObj.description,
          number: form.formGovIdValue.value,
        },
        personalData: {
          firstName: form.formName.value,
          lastName: form.formSurname.value,
          birthDate: null,
        },
        jobDetails: {
          typeId: selectedJobTypeObj.id,
          name: selectedJobTypeObj.name,
          description: selectedJobTypeObj.description,
          incomeLevel: form.formIncomeLvl.value,
          jobStartDate: null,
          jobEndDate: null,
        },
      };

      console.log(inquiry);

      if (annonymous) {
        axios
          .post(`https://lichvanotitia.azurewebsites.net/api/Inquiry/anonymous?email=${form.formEmail.value}`, inquiry)
          .then((response) => {
            console.log(response);
            alert(
              "Your inquiry has been submitted - you will receive an email with the results."
            );
            navigate("/");
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .post("https://lichvanotitia.azurewebsites.net/api/Inquiry", inquiry,getCallConfig())
          .then((response) => {
            console.log(response);
            alert(
              "Your inquiry has been submitted - you can check the result on your dashboard."
            );
            navigate("/dashboard/user");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
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

  const handleJobTypeChange = (event) => {
    const selectBox = event.currentTarget;
    setSelectedJobType((prev) => {
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
    console.log("fetching enums...");
    fetchIdTypes();
    fetchJobTypes();

    if (!annonymous) {
      setSelectedJobType(user.data.jobTypeId);
      setSelectedGovId(user.data.idTypeId);
    }
  }, []);

  console.log("SELECTED GOV ID TYPE:",selectedGovId);
  console.log("SELECTED JOB TYPE:",selectedJobType);

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
                  defaultValue={annonymous ? "" : user.data.firstName}
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
                  defaultValue={annonymous ? "" : user.data.lastName}
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
              defaultValue={annonymous ? "" : user.data.email}
            />
            <Form.Control.Feedback type="invalid">
              Provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formIncomeLvl">
            <Form.Label>Income level</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Enter Income level"
              disabled={!annonymous}
              defaultValue={annonymous ? "" : user.data.incomeLevel}
              min="0"
              pattern="/d+"
            />
            <Form.Control.Feedback type="invalid">
              Provide a valid value.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formJobType">
            <Form.Label>Job Type</Form.Label>
            <Form.Select
              required
              aria-label="Select Job Type"
              disabled={!annonymous}
              onChange={handleJobTypeChange}
              //defaultValue={annonymous ? "" : user.data.jobTypeId}
              value={selectedJobType}
            >
              <option value="" hidden={true}></option>
              {jobTypes.map((job_type) => (
                <option key={job_type.id} value={job_type.id}>
                  {stingifyField(job_type.name)}
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
                  //defaultValue={annonymous ? "" : user.data.idTypeId}
                  value={selectedGovId}
                >
                  <option value="" hidden={true}></option>
                  {idTypes.map((id_type) => (
                    <option key={id_type.id} value={id_type.id}>
                      {stingifyField(id_type.name)}
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
                  disabled={!selectedGovId || !annonymous}
                  placeholder={selectedGovId}
                  readOnly={!annonymous}
                  defaultValue={annonymous ? "" : user.data.idNumber}
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
