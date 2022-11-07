import React from "react";
import Button from "react-bootstrap/esm/Button";

import "./IconButton.css";

// PROPS
// icon - icon as component
// rest same as in Button form bootstrap
const IconButton = (props) =>{
    return(
        <Button variant={props.variant} size={props.size} onClick={props.onClick}>
        <div className="icon-btn">
            <span>{props.children}</span>
            <span className="icon-span">
             {props.icon}
            </span>
          </div>
        </Button>
    );
}

export default IconButton;