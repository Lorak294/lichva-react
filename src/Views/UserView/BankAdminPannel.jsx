import React, { useState, useEffect } from "react";

import ContentCard from "../../Components/ContentCard";
import OffersTable from "../../Components/Data Tables/OffersTable";
import { useAuth } from "../../Hooks/AuthProvider";

import "./BankAdminPannel.css";

const tmpOffersData = [
  {
    id: 0,
    client: "Marcin Najman",
    ammount: 100000,
    cost: 20000,
    installments: "24",
    creationDate: "01.01.2000",
    status: "Active",
    pdfLink: "https://en.wikipedia.org/wiki/Cock_and_ball_torture",
  },
  {
    id: 1,
    client: "Krzysztof Kononowicz",
    ammount: 2000,
    cost: 120,
    installments: "36",
    creationDate: "17.02.2004",
    status: "Declined",
    pdfLink: "https://kononopedia.pl/wiki/Uniwersum_Szkolnej_17",
  },
];

const BankAdminPannel = (props) => {
  const [offers, setOffers] = useState([]);
  const {user} = useAuth(); 

  const getOffers = () => {
    console.log("getting offers");
    setOffers((prev) => {
      return tmpOffersData;
    });
  };

  // only once on component first render
  useEffect(() => {
    getOffers();
  }, []);

  return (
    <div>
      <div className="welcome-banner">
        <h1>Welcome {user.givenName}!</h1>
        </div>
        <ContentCard className="offer-section">
          <h3>Offers made by your Bank:</h3>
          <OffersTable refBank={ "somebank" }></OffersTable>
        </ContentCard>
    </div>
  );
};

export default BankAdminPannel;
