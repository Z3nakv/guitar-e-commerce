import React from 'react'
import './OrderFilter.css'

const OrderFilter = ({ priceRequest }) => {

  return (
    <form 
        onClick={priceRequest} 
        className='orderFilter-form'>
            <div>
                <label htmlFor="menor">Menor a Mayor</label>
                <input type="radio" id="menor" value={'menor'} name="priceOrder" />
            </div>
            <div>
                <label htmlFor="mayor">Mayor a Menor</label>
                <input type="radio" id="mayor" value={'mayor'} name="priceOrder" />
            </div>
        </form>
  )
}

export default OrderFilter