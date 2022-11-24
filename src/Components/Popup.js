import React from "react";

import "./Popup.css";

const Popup = (props) => {
    return(
        <div className="popup">
            <div className="popup-inner">
                {props.children}
            </div>
        </div>
    );
}

export default Popup;