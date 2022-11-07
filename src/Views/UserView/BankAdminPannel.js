import React from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ContentCard from "../../Components/ContentCard";

import "./BankAdminPannel.css";

const BankAdminPannel = (props) => {
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
                <th>#</th>
                <th>Client</th>
                <th>Ammount</th>
                <th>Commision</th>
                <th>Number of payments</th>
                <th>Duration</th>
                <th>Creation Date</th>
                <th>State</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark the Client</td>
                <td>300.000$</td>
                <td>15%</td>
                <td>120</td>
                <td>10 years</td>
                <td>26.11.2022</td>
                <td>Active</td>
                <td>
                  <Button variant="success">Accept</Button>
                  <Button variant="danger">Decline</Button>
                </td>
              </tr>
            </tbody>
          </Table>
          </ContentCard>
      </div>
    </div>
  );
};

export default BankAdminPannel;
