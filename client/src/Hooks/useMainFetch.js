import { useEffect } from "react";
import { useContext } from "react";
import { mainFetchContext } from "../Context/MainFetchContext";
import 'dotenv/config';

export const useMainFetch = () => {

    const { mainData, count, setMainData, setLoading, loading, setCount } = useContext( mainFetchContext );
    const url = import.meta.env.VITE_API_URL || "https://localhost:4000";
    // console.log(import.meta.env.VITE_API_URL);
    
    const fetchMainData = async () => {
      console.log(url);
      
        // setLoading(true); 
        try {
          const response = await fetch(`${url}/api/store/main?limit=3&skip=${count * 3}`);
          if(!response.ok) throw new Error('Network response was not ok');
          const result = await response.json();
          
          if(result && result.mainPageData && result.mainPageData.length){
            setMainData(prevState => [...prevState, ...result.mainPageData]);
          }else{
            console.error('Invalid response structure: ', result);
          }
        } catch (error) {
          console.log('Error fetching main data: ', error);
        }finally {
          setLoading(false)
        }
      }

      useEffect(() => {
        if (count < 4 ) {
          fetchMainData();
        }
      },[count])

      return {
        count,
        mainData,
        loading,
        setCount
      }
}