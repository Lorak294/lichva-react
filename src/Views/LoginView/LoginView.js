import React, { useEffect } from "react";
import axios from "axios";

import "./LoginView.css";
import logo from "../../logoLichva.png";

import ContentCard from "../../Components/ContentCard";
import Button from "react-bootstrap/Button";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

import {useAuth} from "../../Hooks/AuthProvider";

const LoginView = () => {
  const navigate = useNavigate();
  const adText = ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui
    imperdiet sem et lectus tempus luctus. Nulla facilisi. Aliquam
    erat volutpat. Phasellus in quam in quam sodales euismod. Aenean
    euismod hendrerit arcu, lacinia consequat elit. Cras mi leo,
    ultricies a augue vel, sodales imperdiet risus. Duis aliquet nisi
    enim, sed tempus magna congue non. Mauris tincidunt euismod magna
    vel euismod.`;
  const {user,login} = useAuth();
  
  const annEnqHandler = () => {
    navigate("/annonymousinquiry");
  };

  const registerNowHandler = () => {
    // EXAMPLE API CALL - to delete later
    let inquiry = {
      userId: 2137,
      ammount: 42000,
      installments: 69,
    };
    const headers = {
      "Content-Type": "text/json",
      accept: "text/plain",
    };

    axios
      .post("https://lichvanotitia.azurewebsites.net/api/Inquire", inquiry, {
        headers: headers,
      })
      .then((res) => {
        console.log("PUT RESPONSE:");
        console.log(res);
      });
  };

  // GOOGLE LOGIN - to clean up later now i want it separate
  // const [profile,setProfile] = useState([]);
  const clientId = "625318245450-ac4a4f3rldhgcb2fp1tsg1o8k5fiumc2.apps.googleusercontent.com";

   const onLoginSuccess = (res) => {
     console.log("login success:", res);
     
     
     // TO DO: GET FULL USER DATA OBJECT AND INSERT IT HERE INSTEAD OF "res.profile.Obj".
     login(res.profileObj);
   };
   const onLoginFailure = (err) => {
     console.log("login failed:", err);
     // TO DO: DISPALY ERROR MESSAGE
   };

   useEffect(() => {
     const initClient = () => {
       gapi.client.init({
         clientId: clientId,
         scope: "",
       });
     };
     gapi.load("client:auth2", initClient);
   });

   if(user){
    return <Navigate to="/dashboard/user"/>;
   }

  return (
    <div>
      <div className="logo-pannel">
        <span className="logo-span">
          <img className="logo-img" src={logo} alt="logo" />
        </span>
        <span className="slogan-span">
          <h1> Lich.va</h1>
          <h3> Your place for loans</h3>
        </span>
      </div>

      <ContentCard className="login-card">
        <h3>One of the best Credit Comparing Websites</h3>
        <p>{adText}</p>
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={user}
        />
        <hr />
        <p>Don't have an account?</p>
        <Button variant="primary mb-3" size="lg" onClick={registerNowHandler}>
          Register Now
        </Button>
        <p>or</p>
        <Button variant="primary" size="lg" onClick={annEnqHandler}>
          Create an annonymous inquiry
        </Button>
      </ContentCard>
      <Outlet />
    </div>
  );
};

export default LoginView;
