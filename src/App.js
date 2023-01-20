import React from "react";
import "./App.css";
import LoginView from "./Views/LoginView/LoginView";
import UserView from "./Views/UserView/UserView";
import InquiryBox from "./Components/InquiryBox";
import { OfferApplication } from "./Components/OfferApplication";
import { Routes, Route } from "react-router-dom";
import InquiriesTable from "./Components/Data Tables/InquiriesTable";
import OffersTable from "./Components/Data Tables/OffersTable";
import InquiryResults from "./Components/InquiryResults";
import RegistrationForm from "./Components/RegistrarionForm";
import { UserDetails } from "./Components/UserDetails";

import {ProtectedLayout} from "./Routing/ProtectedLayout";
import { AnnInqResult } from "./Components/AnnInqResult";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginView />}>
          <Route path="annonymousinquiry" element={<InquiryBox />} />
        </Route>

        <Route path="/anninquiryresult:inqId" element={<AnnInqResult/>}/>

        <Route path="dashboard" element={<ProtectedLayout />}>
          <Route path="registration" element={<RegistrationForm/>}/>
          
          <Route path="user" element={<UserView />}>         
            <Route path="newinquiry" element={<InquiryBox />} />
            
            <Route path="offers" element={<OffersTable />}>
              <Route path="apply" element={<OfferApplication />} />
              <Route path="applicant" element={<UserDetails/>}/>
            </Route>
            
            <Route path="inquiries" element={<InquiriesTable />}>
              <Route path="results" element={<InquiryResults />} />
            </Route>
          
          </Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
