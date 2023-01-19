import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ContentCard from "./ContentCard";
import InquiryResults from "./InquiryResults";

import "./AnnInqResult.css";

export const AnnInqResult = () => {
  const [waitingForData, setWaitingForData] = useState(true);
  const [inqObj, setInqObj] = useState(null);
  const params = useParams();

  const fetchInqResults = async (inqId) => {
    setWaitingForData(true);
    // API CALL TO FETCH INQ RESULTS BY ID
    setTimeout(() => {
      setInqObj({ id: inqId, data: "someInqData" });
      setWaitingForData(false);
    }, "1500");
  };

  useEffect(() => {
    fetchInqResults(params.inqId);
  }, []);


  return (
    <ContentCard className="result-container">
      <h2>Your inquiry results:</h2>
      {waitingForData ? (
        <Spinner variant="primary" animation="border" />
      ) : (
        // <InquiryResults inqObj={inqObj} />
        <p>HERE IS YOUR RESULT BITCH</p>
      )}
    </ContentCard>
  );
};
