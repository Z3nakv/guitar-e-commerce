import React from 'react';
import InputComponent from '../InputComponent';
import './Aside.css';

const Aside = ({ priceRequest, reference, theme }) => {

    return (
        <div ref={reference} className='form' data-theme={theme}>
            <form 
            onClick={priceRequest}
            >
                <div 
                className='form-container'
                >
    
                    <section>

                        <h4>Precio min:</h4>

                            <div className='input-container'>
                                <InputComponent htmlFor={'priceOne'} section={'minPrice'} value={'$250'} defaultChecked={'defaultChecked'} />
                                <InputComponent htmlFor={'priceTwo'} section={'minPrice'} value={'$300'} />
                                <InputComponent htmlFor={'priceThree'} section={'minPrice'} value={'$350'} />
                                <InputComponent htmlFor={'priceFour'} section={'minPrice'} value={'$400'} />
                                <InputComponent htmlFor={'priceFive'} section={'minPrice'} value={'$450'} />
                            </div>

                    </section>

                    <section>

                        <h4>Precio max:</h4>

                        <div className='input-container'>
                            <InputComponent htmlFor={'priceOne'} section={'maxPrice'} value={'$250'} />
                            <InputComponent htmlFor={'priceTwo'} section={'maxPrice'} value={'$300'} />
                            <InputComponent htmlFor={'priceThree'} section={'maxPrice'} value={'$350'} />
                            <InputComponent htmlFor={'priceFour'} section={'maxPrice'} value={'$400'} />
                            <InputComponent htmlFor={'priceFive'} section={'maxPrice'} value={'$450'} defaultChecked={'defaultChecked'} />
                        </div>

                    </section>

                    <section>

                        <h4>Color:</h4>

                        <div className='input-container'>
                            <InputComponent htmlFor={'All'} section={'color'} value={'All'} defaultChecked={'defaultChecked'} />
                            <InputComponent htmlFor={'colorRed'} section={'color'} value={'red'} />
                            <InputComponent htmlFor={'colorYellow'} section={'color'} value={'yellow'} />
                            <InputComponent htmlFor={'colorGreen'} section={'color'} value={'green'} />
                            <InputComponent htmlFor={'colorBlack'} section={'color'} value={'black'} />
                            <InputComponent htmlFor={'colorBlue'} section={'color'} value={'blue'} />
                        </div>
                        
                    </section>

                </div>
            </form>
        </div>
    )
}

export default Aside;
