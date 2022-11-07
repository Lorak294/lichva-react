import React from "react";

import Table from "react-bootstrap/Table";

import "./BankAdminPannel.css";

const BankAdminPannel = (props) => {
  return (
    <div>
      <div className="welcome-banner">
        <h1>Welcome {props.user}!</h1>
      </div>
      <div className="offer-list-section">
        <div className="offer-list-container">
          <h4>Offers made by your Bank:</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BankAdminPannel;
