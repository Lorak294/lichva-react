import React from "react";

import "./ContentCard.css";

const ContentCard = (props)=>{
    console.log(props.className);
    return(
        <div className={`${props.className} content-card`}>
            {props.children}
        </div>
    );
}

export default ContentCard;