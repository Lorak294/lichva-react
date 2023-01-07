import React from 'react';
import './App.css';
import LoginView from './Views/LoginView/LoginView';
import UserView from './Views/UserView/UserView';
import RegistrationForm from './Components/RegistrarionForm';
import NewInquiryForm from './Components/NewInquiryForm';
import InquiryBox from './Components/InquiryBox';
import { OfferApplication } from './Components/OfferApplication';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import InquiriesTable from './Components/Data Tables/InquiriesTable';
import OffersTable from './Components/Data Tables/OffersTable';

function App() {
  return (
    <div className="App">
      {/* <LoginView></LoginView> */}
      {/* <UserView></UserView> */}
      {/* <RegistrationForm></RegistrationForm> */}
      {/* <NewInquiryForm></NewInquiryForm> */}

      // test comment for commit
      <Router>
        <Routes>
          <Route path='/' element={<LoginView/>}>
            <Route path='annonymousinquiry' element={<InquiryBox/>}/>
          </Route>
          <Route path='/user' element={<UserView/>}>
            <Route path='newinquiry' element={<InquiryBox/>}/>
            <Route path='offers' element= {<OffersTable/>}>
              <Route path='apply' element={<OfferApplication/>}/>
            </Route>
            <Route path='inquiries' element= {<InquiriesTable/>}>
            </Route>
          </Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
