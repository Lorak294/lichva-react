import React from "react";
import Button from "react-bootstrap/esm/Button";
import TopMenu from "../../Components/TopMenu";
import "./UserView.css";


const UserView = () =>{

    // BUTTON HANDLERS
    const logoutHandler = () => {console.log("external logout clicked")};
    
    const userStr = "Example user";

    return(
        <div>
            <TopMenu onLogoutClick={logoutHandler}></TopMenu>
            <div className="welcome-banner">
                <h1>Welcome {userStr}!</h1>
                <p>Looking for a new loan?</p>
                <Button variant="primary">
                    Create new inquiry
                </Button>
            </div>

            <div>
                <table></table>
            </div>
        </div>
    )   
}

export default UserView;