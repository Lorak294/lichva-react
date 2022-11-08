import React from "react";

import ContentCard from "./ContentCard";
import Form from "react-bootstrap/Form";

import "./NewInquiryForm.css";

const NewInquiryForm = (props) => {
  return (
    <ContentCard className="form-container">
      <Form>
        <h2>New Inquiry</h2>
      </Form>
    </ContentCard>
  );
};

export default NewInquiryForm;
