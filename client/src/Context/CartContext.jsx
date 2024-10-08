import { createContext, useState } from "react";


export const cartContext = createContext();

export const CartDataProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    return (
        <cartContext.Provider value ={{
            cart,
            setCart
        }}>
            { children }
        </cartContext.Provider>
    )
}