import { useEffect, useMemo, useContext } from "react";
import toast from 'react-hot-toast';
import { cartContext } from "../Context/CartContext";
import 'dotenv/config';

export const useCart = () => {

  const { cart, setCart } = useContext( cartContext )

  const url = import.meta.env.VITE_API_URL;

  const fetchCart = async () => {
    
    try {
      const response = await fetch(`${url}/api/store`);
      if(!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      if(result && result.cartData && result.cartData.length){
        setCart(result.cartData)
      }
    } catch (error) {
      console.log('Error fetching cart data: ', error);
    }
  }
  
  useEffect(() => {
    fetchCart();
  }, []);

const notify = (message) => toast.success(message,{
  position: 'bottom-right'
})

const deleted = (message) => toast.error(message,{
  position: 'bottom-right'
})

function addToCart( item ) {
    
    fetch('http://localhost:4000/api/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ guitar: item })
    })
    .then(response => response.json())
    .then(result => {
      if(!result) return;
      setCart(guitarCart => {
        const guitarExists = guitarCart.findIndex(guitar => {
          return guitar._id === result._id
        });

        if(guitarExists >= 0){
          return guitarCart.map(guitar => {
            if(guitar._id === result._id){
                return {...guitar, quantity: guitar.quantity + 1};
            }
            return guitar;
          })
        }else {
          return [...guitarCart, {...result, quantity: result.quantity || 1}];
        }
      })
      notify('Producto Agregado!')
    }
  )
}

function removeFromCart(id) {
  
    fetch(`http://localhost:4000/api/store/${id}`,{
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => 
      {
      setCart(guitarCart => {
        return guitarCart.filter(guitar => guitar._id !== result.response._id)
      })
      deleted('Producto eliminado!');
    })
  }

  function increaseQuantity(id) {
    
    fetch(`http://localhost:4000/api/store/increase/${id}`, {
      method: 'PUT'
      }
    )
    .then(response => response.json())
    .then(result => {
      if(!result.response) return;
      return setCart(guitarCart => {
        return guitarCart.map( guitar => {
          if(guitar._id === result.response._id){
            return {...guitar, quantity: result.response.quantity + 1}
          }
          return guitar;
        })})
    })
  }

  function decreaseQuantity(id) {
    fetch(`http://localhost:4000/api/store/decrease/${id}`, {
      method: 'PUT'
      }
    )
    .then(response => response.json())
    .then(result => {
      if(!result.response) return;
      return setCart(guitarCart => {
        return guitarCart.map( guitar => {
          if(guitar._id === result.response._id){
            return {...guitar, quantity: result.response.quantity - 1}
          }
          return guitar;
        })})
      })
  }

  function clearCart(e) {
    fetch(`http://localhost:4000/api/store`,{
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => {
      if(result.result.acknowledged){
        setCart([]);
        return;
      }
      console.log('something went wrong!');
    })
    deleted('Carrito eliminado!')
    console.log('clearcart');
  }

    const isEmpty = useMemo( () => cart.length === 0, [cart]);
    const cartTotal = useMemo( () => cart.reduce( (total, item ) => total + (item.quantity * item.price), 0), [cart] );

  return {
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};

// export default useCart;
