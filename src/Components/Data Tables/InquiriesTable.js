import React, { useState } from "react";

import { InquiryRecord } from "../Record Components/InquiryRecord";
import { InquiryFilterComponent } from "./InquiryFIlterComponent";
import { Accordion } from "react-bootstrap";

const InquiriesTable = (props) => {
  const [filteredData, setFilteredData] = useState(props.inqData);

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
  };

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
      {filteredData.map((inquiry) => (
        <InquiryRecord key={inquiry.id} inqObj={inquiry} />
      ))}
    </div>
  );
};

export default InquiriesTable;
