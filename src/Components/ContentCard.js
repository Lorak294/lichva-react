import React from "react";

import "./ContentCard.css";

const ContentCard = (props)=>{
    return(
        <div className={(props.className && props.className) + " content-card"}>
            {props.children}
        </div>
    );
}

export default ContentCard;