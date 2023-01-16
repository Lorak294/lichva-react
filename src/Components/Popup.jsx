import React from "react";

import "./Popup.css";

const Popup = (props) => {
    return(
        <div className="popup">
                {props.children}
        </div>
    );
}

export default Popup;