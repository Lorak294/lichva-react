import React, { useState, useEffect } from "react";
import { OfferRecord } from "../Record Components/OfferRecord";
import { OfferFilterComponent } from "./OfferFIlterComponent";
import Spinner from "react-bootstrap/Spinner";
import Accordion from "react-bootstrap/Accordion";
import ContentCard from "../ContentCard";
import { Pagination } from "react-bootstrap";
import { exampleOffers } from "../../Constants and definitions/ExampleData";

import { Outlet, useNavigate } from "react-router-dom";

import "./Table.css";
import { useAuth } from "../../Hooks/AuthProvider";
import axios from "axios";

const OffersTable = (props) => {
  const [offData, setOffData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([1]);
  const [waitingForData, setWaitingForData] = useState(false);
  const [offerStatuses, setOfferStatuses] = useState([]);
  const [banks, setBanks] = useState([]);
  const navigate = useNavigate();

  const { user,getCallConfig } = useAuth();

  const pageSize = 10;

  const fetchOfferStatuses = async () => {
    axios.get('https://lichvanotitia.azurewebsites.net/api/dictionary/offerStatus',getCallConfig()).then(response => {
      console.log("fetched statuses",response.data);
      setOfferStatuses(response.data);
    }).catch(err => console.log(err));
  }

  const fetchBanks = async () => {
    axios.get('https://lichvanotitia.azurewebsites.net/api/Bank',getCallConfig()).then(response => {
      console.log(response.data);
      setBanks(response.data);
    }).catch(err => console.log(err));
  }

  const fetchOffers = async () => {
    setWaitingForData(true);
    // const response = await axios.get("api_URL_HERE").catch(err => console.log(err));
    if (props.refInq) {
      console.log("GETTING INQ RESULTS",props.refInq);
      axios
        .get(`https://lichvanotitia.azurewebsites.net/api/Offer?inquiryId=${props.refInq.inquiryId}`,getCallConfig())
        .then((response) => {
          setWaitingForData(false);
          setOffData(response.data);
          setFilteredData(response.data);
          updatePages(response.data.length);
        })
        .catch((err) => {
          console.log(err);
          setWaitingForData(false);
        });



    } else {
      switch (user.data.roleId) {
        case 1:
          // get inq 
          console.log("GETTING USER OFFERS");
          axios
            .get("https://lichvanotitia.azurewebsites.net/api/User/offers",getCallConfig())
            .then((response) => {
              console.log(response);
              setWaitingForData(false);
              setOffData(response.data);
              setFilteredData(response.data);
              updatePages(response.data.length);
            })
            .catch((err) => {
              console.log(err);
              setWaitingForData(false);
            });
          break;
        case 3:
          console.log("GETTING BANK OFFERS");
          axios
          .get("https://lichvanotitia.azurewebsites.net/api/Employee/offers",getCallConfig())
          .then((response) => {
            console.log(response);
            setWaitingForData(false);
            setOffData(response.data);
            setFilteredData(response.data);
            updatePages(response.data.length);
          })
          .catch((err) => {
            console.log(err);
            setWaitingForData(false);
          });
          break;
      }
    }
  };

  const applyFiltersHandler = (filterConditions) => {
    
    /*
    // console.log("FILTER CONDITIONS: ");
    // console.log(filterConditions);
    // console.log("DATA: ");
    // console.log(offData);

    // const resultData = offData
    //   .filter(
    //     (offer) =>
    //       (filterConditions.minDate === "" ||
    //         Date.parse(offer.creationDate) >=
    //           Date.parse(filterConditions.minDate)) &&
    //       (filterConditions.maxDate === "" ||
    //         Date.parse(offer.creationDate) <=
    //           Date.parse(filterConditions.maxDate)) &&
    //       (filterConditions.minAmmount === "" ||
    //         offer.ammount >= filterConditions.minAmmount) &&
    //       (filterConditions.maxAmmount === "" ||
    //         offer.ammount <= filterConditions.maxAmmount) &&
    //       (filterConditions.minInstallments === "" ||
    //         offer.installments >= filterConditions.minInstallments) &&
    //       (filterConditions.maxInstallments === "" ||
    //         offer.installments <= filterConditions.maxInstallments) &&
    //       (filterConditions.banks.length === 0 ||
    //         filterConditions.banks === "" ||
    //         filterConditions.banks.includes(offer.bankId)) &&
    //       (filterConditions.status.length === 0 ||
    //         filterConditions.status === "" ||
    //         filterConditions.status.includes(offer.offerStatus))
    //   )
    //   .sort((a, b) => {
    //     let res;

    //     if (a[filterConditions.sortby] < b[filterConditions.sortby]) {
    //       res = -1;
    //     } else if (a[filterConditions.sortby] > b[filterConditions.sortby]) {
    //       res = 1;
    //     } else {
    //       res = 0;
    //     }

    //     if (filterConditions.sortMode === "desc") res = res * -1;

    //     return res;
    //   });

    */
    

    // let dateStr = (filterConditions.minDate && filterConditions.maxDate) ? `[${filterConditions.minDate},${filterConditions.maxDate}]`:null;
    // let ammountStr = (filterConditions.minAmmount && filterConditions.maxAmmount) ? `[${filterConditions.minAmmount},${filterConditions.maxAmmount}]`:null;
    // let installmentsStr = (filterConditions.minInstallments && filterConditions.maxInstallments) ? `[${filterConditions.minInstallments},${filterConditions.maxInstallments}]`:null;
    // let monthInstallmentsStr = (filterConditions.minMonthInstallments && filterConditions.maxMonthInstallments) ? `[${filterConditions.minMonthInstallments},${filterConditions.maxMonthInstallments}]`:null;
    // let percentageStr = (filterConditions.minPercentage && filterConditions.maxPercentage) ? `[${filterConditions.minPercentage},${filterConditions.maxPercentage}]` :null;
    // let statusStr = filterConditions.status? filterConditions.status.join():null;
    // let bankStr = filterConditions.selectedBanks.length > 0 ? filterConditions.selectedBanks.join() : null;
    
    // let url = `https://lichvanotitia.azurewebsites.net/api/User/offers?
    // ${dateStr ? 'creationDateFilter='+ dateStr: ""}
    // &requestedValueFilter=2
    // &installmentsFilter=3
    // &percentageFilter=4
    // &monthlyInstallmentsFilter=5
    // &bankIdFilter=6
    // &statusIdFitler=7`
    // axios.get(url,)
    
    const resultData = offData;// API CALL 

    setFilteredData(resultData);
    updatePages(resultData.length);
  };

  const updatePages = (dataSize) => {
    let pagesLength = dataSize === 0 ? 0 : Math.ceil(dataSize / pageSize);

    const newPageArray = Array.from({ length: pagesLength }, (_, i) => i + 1);
    setPages(newPageArray);
    setActivePage(1);
  };

  const pageClickHandler = (event) => {
    const newActive = parseInt(event.target.text);
    setActivePage(newActive);
  };

  const prevPage = () => {
    if (activePage > 1) setActivePage(activePage - 1);
  };
  const nextPage = () => {
    if (activePage < pages.length) setActivePage(activePage + 1);
  };

  const offerApplyHandler = (offerObj) => {
    navigate(`/dashboard/user/offers/apply`, { state: offerObj });
  };

  const userDetailsHandler= (offerObj) => {
    navigate(`/dashboard/user/offers/applicant`, { state: offerObj });
  };

  useEffect(() => {
    fetchOfferStatuses();
    fetchBanks();
    fetchOffers();
  }, []);

  return (
    <ContentCard className="table-container">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filtering and Sorting</Accordion.Header>
          <Accordion.Body>
            <OfferFilterComponent
              filterList={applyFiltersHandler}
              banks={banks}
              offerStatuses={offerStatuses}
            ></OfferFilterComponent>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <br />
      {waitingForData ? (
        <Spinner variant="primary" animation="border" />
      ) : filteredData.length > 0 ? (
        filteredData
          .slice((activePage - 1) * pageSize, activePage * pageSize)
          .map((offer) => (
            <OfferRecord
              key={offer.id}
              offerObj={offer}
              offerApply={offerApplyHandler}
              userDetails={userDetailsHandler}
              offerStatuses={offerStatuses}
              banks={banks}
            />
          ))
      ) : (
        <p>No records meet the filter requirements.</p>
      )}

      <div className="pagintaion">
        <Pagination>
          <Pagination.Prev onClick={prevPage} />
          {pages.map((page) => (
            <Pagination.Item
              active={page === activePage}
              onClick={pageClickHandler}
              key={page}
            >
              {page}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={nextPage} />
        </Pagination>
      </div>
      <Outlet />
    </ContentCard>
  );
};

export default OffersTable;
