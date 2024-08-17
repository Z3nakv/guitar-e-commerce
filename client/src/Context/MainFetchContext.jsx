import { createContext, useState } from "react";


export const mainFetchContext = createContext();

export const MainDataProvider = ({ children }) => {

    const [mainData, setMainData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);

    return (
        <mainFetchContext.Provider value ={{
            mainData,
            setMainData,
            loading,
            setLoading,
            count,
            setCount
        }}>
            { children }
        </mainFetchContext.Provider>
    )
}