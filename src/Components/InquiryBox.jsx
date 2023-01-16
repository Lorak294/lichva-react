import React from "react";

import Popup from "./Popup";
import NewInquiryForm from "./NewInquiryForm";
const InquiryBox = () => {
    
    return(
        <div>
            <Popup>
                <NewInquiryForm/>
            </Popup>
        </div>
    );
}

export default InquiryBox;