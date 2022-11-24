import React from "react";

import Popup from "./Popup";
import NewInquiryForm from "./NewInquiryForm";
import { useLocation } from "react-router-dom";
const InquiryBox = (props) => {
    
    const location = useLocation();
    console.log(location.state);
    return(
        <div>
            <Popup>
                <NewInquiryForm user={location.state}/>
            </Popup>
        </div>
    );
}

export default InquiryBox;