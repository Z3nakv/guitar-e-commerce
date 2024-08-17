import { Link } from "react-router-dom"

export default function Guitar({guitar, addToCart}) {

    const { _id, name, image, description, price } = guitar;

    return (
        <li key={_id} className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div 
            className="col-4"
            
            >
                <Link to={`api/store/product/${_id}`}>
                    <img className="img-fluid" src={`/img/${image}.png`} alt="imagen guitarra" />
                </Link>
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button 
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(guitar)}
                >Agregar al Carrito</button>
            </div>
        </li>
    )
}
