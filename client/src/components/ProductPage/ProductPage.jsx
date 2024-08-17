import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../Hooks/useCart';
import {RotatingLines} from 'react-loader-spinner';
import './ProductPage.css';


const ProductPage = () => {
  const { id } = useParams();
  const [guitarProduct, setGuitarProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:4000/api/store/product/${id}`)
    .then(response => response.json())
    .then(result => {
      setGuitarProduct(result.guitarInCart)
      setLoading(false)
    })
  },[])

  const handleClickIncrease = () => {
    if( quantity >= 5 ) return;
    setQuantity( prevState => prevState + 1)
  }

  const handleClickDecrease = () => {
    if( quantity <= 1 ) return;
    setQuantity( prevState => prevState - 1)
  }

  if (loading) return (<div className="loading-container" >
    <RotatingLines
    visible={true}
    height="96"
    width="96"
    color="grey"
    strokeWidth="5"
    animationDuration="0.75"
    ariaLabel="rotating-lines-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />
    <h4>Cargando...</h4>
  </div> )
  
  return (
    <div className='new-body product_page_container'>
      <div
      className='product_page_container-sub'
      >
        <div
        className='product_page_container-image'
        >
          <img
          className='img-fluid'
          src={ `/img/${guitarProduct.image}.png` }
          alt={guitarProduct.name} />
        </div>

        <div className='product_page_container-details'>

          <h1>{guitarProduct.name}</h1>

          <div>
            <p>{guitarProduct.description}</p>
          </div>

          <div className='product_page_container-price'>
            <p className='fw-black text-primary fs-3'>${guitarProduct.price}</p>
            <div>
              <button onClick={handleClickDecrease} className='btn btn-dark'>-</button>
              <span>{quantity}</span>
              <button onClick={handleClickIncrease} className='btn btn-dark'>+</button>
            </div>
          </div>

          <button
          className='btn'
          onClick={() => addToCart( {...guitarProduct, quantity: quantity || guitarProduct.quantity} )}
          >
            Add To Cart
          </button>

        </div>
      </div>

      
    </div>
  )
}

export default ProductPage;
