import { useMemo } from "react";
import { useFiltersRequest } from "./useFiltersRequest.js";
import { useMainFetch } from './useMainFetch.js';

const useFilteredData = () => {
    const { mainData, count, loading, setCount } = useMainFetch();
    const { priceRequest, rangePrice } = useFiltersRequest();
    
    const filterData = useMemo(() => {
        const { minPrice, maxPrice, color, priceOrder } = rangePrice;
        return mainData
        .filter(guitar => guitar.price >= Number(minPrice) && guitar.price <= Number(maxPrice))
        .filter(guitar => color !== 'All' ? guitar.color === rangePrice.color : guitar)
        .sort((a, b) => {
            if(priceOrder !== ''){
                if(priceOrder === 'menor'){
                    return Number(a.price) - Number(b.price);
                }else{
                    return Number(b.price) - Number(a.price);
                }
            }
        })
    },[mainData, rangePrice]);

    return { filterData, priceRequest, count, loading, setCount };
}

export default useFilteredData;