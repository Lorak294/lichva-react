import React, { useEffect, useState } from "react";
import axios from "axios";

import { InquiryRecord } from "../Record Components/InquiryRecord";
import { InquiryFilterComponent } from "./InquiryFIlterComponent";
import Spinner from "react-bootstrap/Spinner";
import Accordion from "react-bootstrap/Accordion";
import ContentCard from "../ContentCard";
import Pagination from "react-bootstrap/Pagination";

import { useNavigate } from "react-router-dom";

import "./Table.css";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../Hooks/AuthProvider";

const InquiriesTable = (props) => {
  const [inqData, setInqData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([1]);
  const [waitingForData, setWaitingForData] = useState(false);
  const navigate = useNavigate();

  //const user = location.state; // to trzeba zmienić na handler do zdobycia danych
  const { user } = useAuth();

  const pageSize = 10;

  const fetchInquiries = async () => {
    setWaitingForData(true);
    // TRZEBA ZMIENIĆ ŻEBY ŚCIĄGAŁO TYLKO INQ USERA A NA RAZIE BIERZE WSZYSTKIE
    await axios
      .get("https://lichvanotitia.azurewebsites.net/api/Inquiry")
      .then((response) => {
        //console.log("inquireis have been fetched");
        //console.log(response.data);
        setWaitingForData(false);
        setInqData(response.data);
        setFilteredData(response.data);
        updatePages(response.data.length);
      })
      .catch((err) => {
        setWaitingForData(false);
        console.log(err);
      });

    // setInqData(exampleInquiries);
    // setFilteredData(exampleInquiries);
    // updatePages(exampleInquiries.length);
  };

  const applyFiltersHandler = (filterConditions) => {
    // console.log("FILTER CONDITIONS: ");
    // console.log(filterConditions);
    //console.log("DATA: ");
    //console.log(inqData);

    const resultData = inqData
      .filter(
        (inquiry) =>
          (filterConditions.minDate === "" ||
            Date.parse(inquiry.creationDate) >=
              Date.parse(filterConditions.minDate)) &&
          (filterConditions.maxDate === "" ||
            Date.parse(inquiry.creationDate) <=
              Date.parse(filterConditions.maxDate)) &&
          (filterConditions.minAmmount === "" ||
            inquiry.ammount >= filterConditions.minAmmount) &&
          (filterConditions.maxAmmount === "" ||
            inquiry.ammount <= filterConditions.maxAmmount) &&
          (filterConditions.minInstallments === "" ||
            inquiry.installments >= filterConditions.minInstallments) &&
          (filterConditions.maxInstallments === "" ||
            inquiry.installments <= filterConditions.maxInstallments)
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

  const inqResultsHandler = (inqObj) => {
    //console.log("INQ OBJ INSIDE HANDLER:");
    //console.log(inqObj);
    navigate(`/dashboard/user/inquiries/results`, { state: inqObj });
  };

  useEffect(() => {
    if (user) {
      fetchInquiries();
    }
  }, []);

  return (
    <ContentCard className="table-container">
      <Outlet />
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filtering and Sorting</Accordion.Header>
          <Accordion.Body>
            <InquiryFilterComponent filterList={applyFiltersHandler} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <br />
      {waitingForData ? (
        <Spinner variant="primary" animation="broder" />
      ) : filteredData.length > 0 ? (
        filteredData
          .slice((activePage - 1) * pageSize, activePage * pageSize)
          .map((inquiry) => (
            <InquiryRecord
              key={inquiry.id}
              inqObj={inquiry}
              resultsHandler={inqResultsHandler}
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
    </ContentCard>
  );
};

export default InquiriesTable;
