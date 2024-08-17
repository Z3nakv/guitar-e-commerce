// import { useState } from "react";

import { useContext } from "react";
import { filterRequestContext } from "../Context/FilterRequestContext";

export const useFiltersRequest = () => {

const { rangePrice, setRangePrice } = useContext( filterRequestContext );
   
    
    const priceRequest = (e) => {
        const value = e.target.value.replace('$','');
        
        setRangePrice( rangePrice => ( 
            {...rangePrice, [e.target.name] : value}
        ));
    }

    return { priceRequest, rangePrice }
}