import React from "react";
import Form from "react-bootstrap/Form";

import "./InquiryFilterComponent.css";
import { Button } from "react-bootstrap";

export const InquiryFilterComponent = (props) => {

    const handleSubmit = (event) =>
    {
        event.preventDefault();

        const filterConditions = {
            minDate: event.target.minDate.value,
            maxDate: event.target.maxDate.value,
            minAmmount: event.target.minAmmount.value,
            maxAmmount: event.target.maxAmmount.value,
            minInstallments: event.target.minInstallments.value,
            maxInstallments: event.target.maxInstallments.value,
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
        </section>

        <h5>Sorting</h5>
        <section className="sorting-section">
            <Form.Group  className="mb-3" controlId="sortby">
                <Form.Label>Sort by</Form.Label>
                <Form.Select
                aria-label="Select column to sort by"
                >
                    <option value="creationDate">Created on</option>
                    <option value="ammount">Ammount</option>
                    <option value="installments">Installments</option>
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
