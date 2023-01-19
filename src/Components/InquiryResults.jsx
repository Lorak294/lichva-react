import React, { useEffect } from "react";

import ContentCard from "./ContentCard";
import Popup from "./Popup";
import OffersTable from "./Data Tables/OffersTable";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import "./InquiryResults.css"


// pass throug state: inqObj

const InquiryResults = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const inqObj = location.state;
    console.log("RECEIVED INQ OBJ:", inqObj? inqObj: props.inqObj);

    const closeHandler = () =>{
        navigate(-1);
    }

    useEffect(() => {
      if(!inqObj && !props.inqObj){
        console.log("no inqObj passed -> redirecting to user");
        navigate("dashboard/user");
      }
    })

  return (
    <Popup>
      <ContentCard className="bg-primary results-container" >
        <Button className="close-button" variant="danger" size="lg" onClick={closeHandler}>Close</Button>
        <h4 className="text-white">Your inquiry results</h4>
        <div>
            <OffersTable refInq={inqObj?inqObj:props.inqObj}></OffersTable>
        </div>
      </ContentCard>
    </Popup>
  );
};

export default InquiryResults;
