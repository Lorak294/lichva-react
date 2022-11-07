import React from "react";

import Table from "react-bootstrap/Table";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ContentCard from "../../Components/ContentCard";


import "./PageAdminPannel.css";

const PageAdminPannel = (props) => {
  return (
    <div>
      <div className="welcome-banner">
        <h1>Welcome {props.user}!</h1>
      </div>
      <div className="offer-list-section">
        <ContentCard>
          <h3>List of page users:</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Last login</th>
                <th>Pforile Creation date</th>
                <th>Current permissions</th>
                <th>Bank <br/>(for Bank Admins only)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>MarkusSmarkus</td>
                <td>Mark</td>
                <td>The Client</td>
                <td>25.11.2022</td>
                <td>01.01.1645</td>
                <td>Common User</td>
                <td>-</td>
                <td>
                  <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                    <Dropdown.Item>Common User</Dropdown.Item>
                    <Dropdown.Item>Bank Admin</Dropdown.Item>
                    <Dropdown.Item>Page Admin</Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            </tbody>
          </Table>
          </ContentCard>
      </div>
    </div>
  );
};

export default PageAdminPannel;
