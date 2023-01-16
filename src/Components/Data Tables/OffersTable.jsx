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

const OffersTable = (props) => {
  const [offData,setOffData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([1]);
  const [waitingForData, setWaitingForData] = useState(false);
  const navigate = useNavigate();

  const {user} = useAuth();

  const pageSize = 10;

  const fetchOffers = async () => {

    setWaitingForData(true);
    // const response = await axios.get("api_URL_HERE").catch(err => console.log(err));

    // if(response){
    //   const inqData = response.data;
    //   console.log("Fatched Inquiries: ",inqData);
    //   setInqData(inqData);
    // }

    if(props.refInq)
    {
      console.log("fetching offers which are result of inquiry to a table...");
      console.log(props.refInq);
      setWaitingForData(false);
      setOffData(exampleOffers);
      setFilteredData(exampleOffers);
      updatePages(exampleOffers.length);
    }
    else if(props.refBank)
    {
      console.log("fetching offers form given bank to a table...");
      console.log(props.refBank);
      setWaitingForData(false);
      setOffData(exampleOffers);
      setFilteredData(exampleOffers);
      updatePages(exampleOffers.length);
    }
    else
    {
      console.log("fetching offers to a table...");
      setWaitingForData(false);
      setOffData(exampleOffers);
      setFilteredData(exampleOffers);
      updatePages(exampleOffers.length);
    }
  }



  const applyFiltersHandler = (filterConditions) => {
    // console.log("FILTER CONDITIONS: ");
    // console.log(filterConditions);
    // console.log("DATA: ");
    // console.log(offData);

    const resultData = offData
      .filter(
        (offer) =>
          (filterConditions.minDate === "" ||
            Date.parse(offer.creationDate) >=
              Date.parse(filterConditions.minDate)) &&
          (filterConditions.maxDate === "" ||
            Date.parse(offer.creationDate) <=
              Date.parse(filterConditions.maxDate)) &&
          (filterConditions.minAmmount === "" ||
            offer.ammount >= filterConditions.minAmmount) &&
          (filterConditions.maxAmmount === "" ||
            offer.ammount <= filterConditions.maxAmmount) &&
          (filterConditions.minInstallments === "" ||
            offer.installments >= filterConditions.minInstallments) &&
          (filterConditions.maxInstallments === "" ||
            offer.installments <= filterConditions.maxInstallments) &&
          (filterConditions.banks.length === 0 ||
            filterConditions.banks === "" ||
            filterConditions.banks.includes(offer.bankId)) &&
          (filterConditions.status.length === 0 ||
              filterConditions.status === "" ||
              filterConditions.status.includes(offer.offerStatus))
      )
      .sort((a, b) => {
        let res;

        if (a[filterConditions.sortby] < b[filterConditions.sortby]) {
          res = -1;
        } else if (a[filterConditions.sortby] > b[filterConditions.sortby]) {
          res = 1;
        } else {
          res = 0;
        }

        if (filterConditions.sortMode === "desc") res = res * -1;

        return res;
      });

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

  const offerApplyHandler = (offerObj) =>{
    navigate(`/dashboard/user/offers/apply`,{state: offerObj});
  }

  useEffect(() => {
    if(user){
      fetchOffers();
    }
  }, []);

  return (
    <ContentCard className="table-container">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filtering and Sorting</Accordion.Header>
          <Accordion.Body>
            <OfferFilterComponent
              filterList={applyFiltersHandler}
            ></OfferFilterComponent>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <br />
      { waitingForData ? <Spinner variant="primary" animation="broder"/>:
      
      filteredData.length > 0 ? (
        filteredData
          .slice((activePage - 1) * pageSize, activePage * pageSize)
          .map((offer) => <OfferRecord key={offer.id} offerObj={offer} offerApply={offerApplyHandler} bankPerspective={props.refBank}/>)
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
      <Outlet/>
    </ContentCard>
  );
};

export default OffersTable;
