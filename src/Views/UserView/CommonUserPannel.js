import React, {useState,useEffect, useMemo} from "react";
import axios from 'axios';

import {exampleInquiries, exampleOffers} from "../../Constants and definitions/ExampleData"; 

import IconButton from "../../Components/IconButton";
import Button from "react-bootstrap/esm/Button";
import { BiPlus } from "react-icons/bi";
import InquiriesTable from "../../Components/Data Tables/InquiriesTable";
import OffersTable from "../../Components/Data Tables/OffersTable";

import "./CommonUserPannel.css";
import { Outlet, useNavigate } from "react-router-dom";
import ContentCard from "../../Components/ContentCard";

// PROPS TO PASS:
//  - user:             user object

const CommonUserPannel = (props) => {
    const navigate = useNavigate()
    const [displayOption,setDisplayOption] = useState(0);
    const [inqData,setInqData] = useState([]);
    const [offData,setOffData] = useState([]);

    const newInqHandler = () =>{
       navigate(`/user/newinquiry`,{state: props.user});
    }

    const myOffersHandler = () =>{
      if(displayOption  !== 2) setDisplayOption(2);
    }

    const myInquiriesHandler = () =>{
      if(displayOption !== 1) setDisplayOption(1);
    }

    const fetchInquires = async () => {
      // const response = await axios.get("api_URL_HERE").catch(err => console.log(err));

      // if(response){
      //   const inqData = response.data;
      //   console.log("Fatched Inquiries: ",inqData);
      //   setInqData(inqData);
      // }
      setInqData(exampleInquiries);
    }

    const fetchOffers = async () => {
      // const response = await axios.get("api_URL_HERE").catch(err => console.log(err));

      // if(response){
      //   const offData = response.data;
      //   console.log("Fatched Offers: ",offData);
      //   setOffData(offData);
      // }
      setOffData(exampleOffers);
    }
  
    useEffect(() => {
      fetchInquires();
      fetchOffers();
    },[]);

    return(
      <div>
        <div className="welcome-banner">
        <h1>Welcome {props.user.first_name}!</h1>
        <p>Looking for a new loan?</p>
        <IconButton icon={<BiPlus size="25"/>} variant="primary" size="lg" className="new-inq-btn" onClick={newInqHandler}>
          Create new inquiry
        </IconButton>
      </div>
        <div className="lists-buttons">
        <Button variant={displayOption===1?"primary":"light"} onClick={myInquiriesHandler}>
          <h3>My inquiries</h3>
          <br />
          <p>Here you can see what inquireies you have made in the past.</p>
        </Button>
        <Button variant={displayOption===2?"primary":"light"} onClick={myOffersHandler}>
          <h3>My offers</h3>
          <br />
          <p>
            Here you can check all the offers that were made to you by the
            banks.
          </p>
        </Button>
      </div>
      
      {(displayOption===1 && inqData.length > 0) && 

        <ContentCard className="table-container">
          <h2>Your previous inquiries</h2>
          <br/>
          <InquiriesTable inqData={inqData}/>
        </ContentCard>
      }
      
      {displayOption===2&& 

        <ContentCard className="table-container">
          <h2>Your previous offers</h2>
          <br/>
          <OffersTable offData={offData}/>
        </ContentCard>
      }
      
      <Outlet/>
      </div>
    );
}

export default CommonUserPannel;