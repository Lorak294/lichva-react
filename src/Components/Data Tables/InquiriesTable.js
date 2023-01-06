import React, { useEffect, useState } from "react";

import { InquiryRecord } from "../Record Components/InquiryRecord";
import { InquiryFilterComponent } from "./InquiryFIlterComponent";
import { Accordion } from "react-bootstrap";
import { Pagination } from "react-bootstrap";

import "./Table.css";

const InquiriesTable = (props) => {
  const [filteredData, setFilteredData] = useState(props.inqData);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([1]);

  const pageSize = 10;

  const applyFiltersHandler = (filterConditions) => {
    console.log("FILTER CONDITIONS: ");
    console.log(filterConditions);
    console.log("DATA: ");
    console.log(props.offData);

    const resultData = props.inqData
      .filter(
        (inquiry) =>
          (filterConditions.minDate === "" ||
            Date.parse(inquiry.creation_date) >=
              Date.parse(filterConditions.minDate)) &&
          (filterConditions.maxDate === "" ||
            Date.parse(inquiry.creation_date) <=
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

  useEffect(() => updatePages(props.inqData.length), []);

  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filtering and Sorting</Accordion.Header>
          <Accordion.Body>
            <InquiryFilterComponent filterList={applyFiltersHandler} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <br />
      {filteredData.length > 0 ? (
        filteredData
          .slice((activePage - 1) * pageSize, activePage * pageSize)
          .map((inquiry) => <InquiryRecord key={inquiry.id} inqObj={inquiry} />)
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
            >
              {page}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={nextPage} />
        </Pagination>
      </div>
    </div>
  );
};

export default InquiriesTable;
