import { createContext, useState } from "react";


export const filterRequestContext = createContext();

export const FilterDataProvider = ({ children }) => {

    const [rangePrice, setRangePrice] = useState({
        minPrice:'250', 
        maxPrice:'450', 
        color:'All',
        priceOrder:''
    });

    return (
        <filterRequestContext.Provider value ={{
            rangePrice,
            setRangePrice
        }}>
            { children }
        </filterRequestContext.Provider>
    )
}