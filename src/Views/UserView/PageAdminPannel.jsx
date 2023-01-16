import React, {useState,useEffect} from "react";

import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ContentCard from "../../Components/ContentCard";

import "./PageAdminPannel.css";

const tmpUsersData =  [
  {
    id: 0,
    name: "User",
    surname: "Example",
    email: "user@example.com",
    creationDate: "01.01.2000",
    permissions: "default permissions",
  },
  {
    id: 1,
    name: "User 1",
    surname: "Example 1",
    email: "user1@example.com",
    creationDate: "01.01.2001",
    permissions: "default permissions",
  },
];

const PageAdminPannel = (props) => {
  const [users, setUsers] = useState([]);
 
  // getter for users table data
  const getUsers = () =>{
      console.log("getting users");
      setUsers((prev) => {
        return tmpUsersData;
      })
  }

  // only once on component first render
  useEffect(()=>{
    getUsers();
  },[])

  return (
    <div>
      <div className="welcome-banner">
        <h1>Welcome {props.user.first_name}!</h1>
      </div>
      <div className="offer-list-section">
        <ContentCard>
          <h3>Manage page users</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Profile <br />Creation date</th>
                <th>Current <br />permissions</th>
                <th>
                  Bank <br />
                  (for Bank Admins only)
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userObj) => (
                <tr key={userObj.id}>
                  <td>{userObj.name}</td>
                  <td>{userObj.surname}</td>
                  <td>{userObj.email}</td>
                  <td>{userObj.creationDate}</td>
                  <td>{userObj.permissions}</td>
                  <td>-</td>
                  <td>
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="Change permissions"
                    >
                      <Dropdown.Item>Common User</Dropdown.Item>
                      <Dropdown.Item>Bank Admin</Dropdown.Item>
                      <Dropdown.Item>Page Admin</Dropdown.Item>
                    </DropdownButton>
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

export default PageAdminPannel;
