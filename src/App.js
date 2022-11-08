import React from 'react';
import './App.css';
import LoginView from './Views/LoginView/LoginView';
import UserView from './Views/UserView/UserView';
import RegistrationForm from './Components/RegistrarionForm';
import NewInquiryForm from './Components/NewInquiryForm';

function App() {
  return (
    <div className="App">
      {/* <LoginView></LoginView> */}
      {/* <UserView></UserView> */}
      {/* <RegistrationForm></RegistrationForm> */}
      <NewInquiryForm></NewInquiryForm>
    </div>
  );
}

export default App;
