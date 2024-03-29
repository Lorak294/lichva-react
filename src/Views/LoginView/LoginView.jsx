import React, { useEffect } from "react";
import axios from "axios";

import "./LoginView.css";
import logo from "../../logoLichva.png";

import { FcGoogle } from "react-icons/fc";
import ContentCard from "../../Components/ContentCard";
import Button from "react-bootstrap/Button";
import IconButton from "../../Components/IconButton";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

import { useAuth } from "../../Hooks/AuthProvider";
import { refreshTokenSetup } from "../../Hooks/refreshTokenSetup";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const adText = ` Lich.va to twoje narzedzie do znalezienia najlepszej oferty kredytowej. Nasze wysublimowane systemy porównujące są bezkonkurencyjne na rynku.
Złóż wniosek już teraz i sprawdź sam! Wziąłeś kredyt we frankach? Hipoteka na 20 lat? Zakwestionuj swoje wybory życiowe i zobacz ile mogłeś zaoszczędzić korzystając z naszej strony.`;

const LoginView = () => {
  const navigate = useNavigate();
  const { token, user, login } = useAuth();
  const [waitingForLogin, setWaitingForLogin] = useState(false);
  const [userNumber, setUserNumber] = useState("");

  const annEnqHandler = () => {
    navigate("/annonymousinquiry");
  };

  const fetchUserNumber = async () => {
     axios
      .get("https://lichvanotitia.azurewebsites.net/api/User/total_count")
      .then((response) => setUserNumber(response.data.count))
      .catch((err) => console.log(err));
  };

  // GOOGLE LOGIN - to clean up later now i want it separate
  // const [profile,setProfile] = useState([]);
  //const clientId = "625318245450-ac4a4f3rldhgcb2fp1tsg1o8k5fiumc2.apps.googleusercontent.com";
  const clientId =
    "975889795934-d16i8h32h946jtboaqn9fcqntteleqgo.apps.googleusercontent.com";

  const onLoginSuccess = (googleRes) => {
    setWaitingForLogin(true);
    console.log("login success:", googleRes);
    refreshTokenSetup(googleRes);
    console.log(googleRes);

    // TO DO: GET FULL USER DATA OBJECT AND INSERT IT HERE INSTEAD OF "res.profileObj".
    axios
      .post("https://lichvanotitia.azurewebsites.net/api/auth/google", {
        tokenId: googleRes.tokenId,
      })
      .then((response) => {
        console.log(response);
        setWaitingForLogin(false);
        login(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setWaitingForLogin(false);
      });
  };
  const onLoginFailure = (err) => {
    console.log("login failed:", err);
    // TO DO: DISPALY ERROR MESSAGE
  };

  useEffect(() => {
    fetchUserNumber();
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  if (user || token) {
    return <Navigate to="/dashboard/user" />;
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
        <br />
        <p> Mamy już <strong>{userNumber}</strong> aktywnych użytkowników</p>
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={user}
          render={(renderProps) => (
            <IconButton
              variant="light"
              size="lg"
              icon={<FcGoogle />}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              {waitingForLogin ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                "Sign in with Google"
              )}{" "}
            </IconButton>
          )}
        />
        <hr />
        <p>Don't have a google account?</p>
        <Button variant="primary" size="lg" onClick={annEnqHandler}>
          Create an annonymous inquiry
        </Button>
      </ContentCard>
      <Outlet />
    </div>
  );
};

export default LoginView;
