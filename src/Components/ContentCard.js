import React from "react";

import "./ContentCard.css";

const ContentCard = (props)=>{
    return(
        <div className={`content-card ${props.className}`}>
            {props.children}
        </div>
    );
}

export default ContentCard;