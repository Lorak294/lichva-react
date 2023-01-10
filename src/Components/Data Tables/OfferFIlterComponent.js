import React from "react";
import Form from "react-bootstrap/Form";
import { OfferRecord } from "../Record Components/OfferRecord";

import "./OfferFilterComponent.css";
import { Button } from "react-bootstrap";
import { offer_status } from "../../Constants and definitions/Enums";

export const OfferFilterComponent = (props) => {

    const handleSubmit = (event) =>
    {
        event.preventDefault();

        var selectedBanks = Array.from(event.target.banks.options).filter(function (option) {
            return option.selected;
        }).map(function (option) {
            return parseInt(option.value);
        });

        var selectedStatuses = Array.from(event.target.status.options).filter(function (option) {
          return option.selected;
        }).map(function (option) {
          return parseInt(option.value);
        });

        const filterConditions = {
            minDate: event.target.minDate.value,
            maxDate: event.target.maxDate.value,
            minAmmount: event.target.minAmmount.value,
            maxAmmount: event.target.maxAmmount.value,
            minInstallments: event.target.minInstallments.value,
            maxInstallments: event.target.maxInstallments.value,
            banks: selectedBanks,
            status: selectedStatuses,
            sortby: event.target.sortby.value,
            sortMode: event.target.sortbyMode.value
        };

        console.log(filterConditions);

        props.filterList(filterConditions);
    }

  return (
    // <ContentCard className="main-container">
    <div className="main-container">
      <Form onSubmit={handleSubmit}>
        <h5>Filtering</h5>
        <section className="filtering-section">
          <div className="date-div">
            <strong>Creation date</strong>
            <div className="filtering-section">
              <Form.Group className="mb-3" controlId="minDate">
                <Form.Label>From</Form.Label>
                <Form.Control type="date" defaultValue={""} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="maxDate">
                <Form.Label>To</Form.Label>
                <Form.Control type="date" defaultValue={""} />
              </Form.Group>
            </div>
          </div>

          <div className="installments-div">
            <strong>Installments</strong>
            <div className="filtering-section">
              <Form.Group className="mb-3" controlId="minInstallments">
                <Form.Label>Min</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={""}
                  min="1"
                  step="1"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="maxInstallments">
                <Form.Label>Max</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={""}
                  min="1"
                  step="1"
                />
              </Form.Group>
            </div>
          </div>
          
          <div className="ammount-div">
            <strong>Ammount</strong>
            <div className="filtering-section">
              <Form.Group className="mb-3" controlId="minAmmount">
                <Form.Label>Min</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={""}
                  min="1000"
                  step="1000"
                  pattern="/d+"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="maxAmmount">
                <Form.Label>Max</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={""}
                  min="1000"
                  step="1000"
                  pattern="/d+"
                />
              </Form.Group>
            </div>
          </div>

          <div className="bank-div">
            <strong>Banks</strong>
            <Form.Group  className="mb-3" controlId="banks">
                <Form.Select
                aria-label="Select Banks"
                multiple
                >
                    <option selected value={1001}>Bank 1</option>
                    <option selected value={2001}>Bank 2</option>
                    <option selected value={3001}>Bank 3</option>
                </Form.Select>
            </Form.Group>
          </div>

          <div className="status-div">
            <strong>Status</strong>
            <Form.Group  className="mb-3" controlId="status">
                <Form.Select
                aria-label="Select Status"
                multiple
                >
                    <option selected value={offer_status.offered}>Offered</option>
                    <option selected value={offer_status.waiting_for_acceptance}>Waiting for acceptance</option>
                    <option selected value={offer_status.accepted}>Accepted</option>
                    <option selected value={offer_status.declined}>Declined</option>
                </Form.Select>
            </Form.Group>
          </div>


        </section>

        <h5>Sorting</h5>
        <section className="sorting-section">
            <Form.Group  className="mb-3" controlId="sortby">
                <Form.Label>Sort by</Form.Label>
                <Form.Select
                aria-label="Select column to sort by"
                >
                    <option value="creationDate">Created on</option>
                    <option value="bankId">Bank</option>
                    <option value="ammount">Ammount</option>
                    <option value="installments">Installments</option>
                    <option value="offerStatus">Status</option>
                </Form.Select>
            </Form.Group>

            <Form.Group  className="mb-3" controlId="sortbyMode">
                <Form.Label>Mode</Form.Label>
                <Form.Select
                aria-label="Select column sorting mode"
                >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </Form.Select>
            </Form.Group>
        </section>
        <Button variant="primary" type="submit" size="lg">Apply filters</Button>
      </Form>
    </div>
    //</ContentCard>
  );
};
