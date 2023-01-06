import React from "react";

export const ColumnFilter = ({column}) => {
    const {filterValue, setFilter} = column;
    return(
        <input placeholder="search" value={filterValue || ''} onChange={(e)=> setFilter(e.target.value)}/>
    )
} 