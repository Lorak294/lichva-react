import React, { useEffect } from "react";

import ContentCard from "./ContentCard";
import Popup from "./Popup";
import OffersTable from "./Data Tables/OffersTable";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


// pass throug state: inqObj

const InquiryResults = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const inqObj = location.state;
    console.log("RECEIVED INQ OBJ:");
    console.log(location);

    const closeHandler = () =>{
        navigate(-1);
    }

    useEffect(() => {
      if(!inqObj){
        console.log("no inqObj passed -> redirecting to user");
        navigate("/user");
      }
    })

  return (
    <Popup>
      <ContentCard className="bg-primary mt-300">
        <Button variant="danger" onClick={closeHandler}>Close</Button>
        <h4 className="text-white">Your inquiry results</h4>
        <div>
            <OffersTable refInq={inqObj}></OffersTable>
        </div>
      </ContentCard>
    </Popup>
  );
};

export default InquiryResults;
