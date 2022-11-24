import React from 'react';
import './App.css';
import LoginView from './Views/LoginView/LoginView';
import UserView from './Views/UserView/UserView';
import RegistrationForm from './Components/RegistrarionForm';
import NewInquiryForm from './Components/NewInquiryForm';
import InquiryBox from './Components/InquiryBox';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <LoginView></LoginView> */}
      {/* <UserView></UserView> */}
      {/* <RegistrationForm></RegistrationForm> */}
      {/* <NewInquiryForm></NewInquiryForm> */}

      <Router>
        <Routes>
          <Route path='/' element={<LoginView/>}>
            <Route path='annonymousinquiry' element={<InquiryBox/>}/>
          </Route>
          <Route path='/user' element={<UserView/>}>
            <Route path='newinquiry' element={<InquiryBox/>}/>
          </Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
