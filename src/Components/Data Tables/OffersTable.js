import React, { useState } from "react";
import { OfferRecord } from "../Record Components/OfferRecord";
import { FilterComponent } from "./FIlterComponent";
import Accordion from 'react-bootstrap/Accordion';

import './Table.css';

const OffersTable = (props) => {

    const [filteredData, setFilteredData] = useState(props.offData);

    const applyFiltersHandler = (filterConditions) => {
        
        console.log( "FILTER CONDITIONS: ");
        console.log( filterConditions);
        console.log( "DATA: ");
        console.log(props.offData);

        const resultData = props.offData.filter(offer =>
            (filterConditions.minDate === ""  || Date.parse(offer.creation_date) >= Date.parse(filterConditions.minDate))
            && (filterConditions.maxDate === ""  || Date.parse(offer.creation_date) <= Date.parse(filterConditions.maxDate))
            && (filterConditions.minAmmount==="" || offer.ammount >= filterConditions.minAmmount) 
            && (filterConditions.maxAmmount==="" || offer.ammount <= filterConditions.maxAmmount)
            && (filterConditions.minInstallments==="" || offer.installments >= filterConditions.minInstallments)
            && (filterConditions.maxInstallments==="" || offer.installments <= filterConditions.maxInstallments)
            && (filterConditions.banks.length === 0 || filterConditions.banks==='' || filterConditions.banks.includes(offer.bank_id ))
            ).sort((a,b) =>{
                let res;

                if( a[filterConditions.sortby] < b[filterConditions.sortby])
                {
                    res = -1;
                }
                else if( a[filterConditions.sortby] > b[filterConditions.sortby])
                {
                    res = 1;
                }
                else
                {
                    res = 0;
                }

                if(filterConditions.sortMode === "desc")
                    res = res * -1;

                return res;
            });

        setFilteredData(resultData);
    }

    
    return(
        <div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Filtering and Sorting</Accordion.Header>
                    <Accordion.Body>
                        <FilterComponent filterList={applyFiltersHandler}></FilterComponent>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <br/>
            {filteredData.map((offer) => <OfferRecord key={offer.id} offerObj={offer}/>)}
        </div>
    );
};


export default OffersTable;