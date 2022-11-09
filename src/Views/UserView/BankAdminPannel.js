import React, { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ContentCard from "../../Components/ContentCard";

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
  },
  {
    id: 1,
    client: "Krzysztof Kononowicz",
    ammount: 2000,
    cost: 120,
    installments: "36",
    creationDate: "17.02.2004",
    status: "Declined",
  },
];

const BankAdminPannel = (props) => {
  const [offers, setOffers] = useState([]);

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
        <h1>Welcome {props.user}!</h1>
      </div>
      <div className="offer-list-section">
        <ContentCard>
          <h3>Offers made by your Bank:</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Client</th>
                <th>Ammount</th>
                <th>Installments</th>
                <th>Cost</th>
                <th>Creation date:</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offerObj) => (
                <tr key={offerObj.id}>
                  <td>{offerObj.client}</td>
                  <td>{offerObj.ammount}</td>
                  <td>{offerObj.installments}</td>
                  <td>{offerObj.cost}</td>
                  <td>{offerObj.creationDate}</td>
                  <td>{offerObj.status}</td>
                  <td>
                    {offerObj.status !== "Declined" && (
                      <div>
                        <Button variant="success">Accept</Button>
                        <Button variant="danger">Decline</Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ContentCard>
      </div>
    </div>
  );
};

export default BankAdminPannel;
