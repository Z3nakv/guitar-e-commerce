import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header({
  cart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  clearCart,
  cartTotal,
  isEmpty,
}) {
  // console.log(cart);

  return (
    <header className="py-5 header new-body">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="/">
              
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                style={{ cursor: "pointer" }}
                src="/img/carrito.png"
                alt="imagen carrito"
              />
              <div
                style={{
                  fontSize: "1rem",
                  color: "white",
                  background: "orange",
                  width: "1rem",
                  height: "1.5rem",
                  textAlign: "center",
                  borderRadius: ".3rem",
                  position: "absolute",
                  top: "-1rem",
                  right: "-.25rem",
                }}
              >
                {cart.length}
              </div>

              <div
                id="carrito"
                // className="bg-white p-3"
              >
                {isEmpty ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((guitar) => (
                          <tr key={guitar._id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${guitar.image}.png`}
                                alt="imagen guitarra"
                              />
                            </td>
                            <td style={{ paddingTop: "1.5rem" }}>
                              {guitar.name}
                            </td>
                            <td
                              style={{ paddingTop: "1.5rem" }}
                              className="fw-bold"
                            >
                              ${guitar.price}
                            </td>
                            <td
                              style={{ paddingTop: "1.5rem" }}
                              className="flex align-items-start gap-4"
                            >
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => decreaseQuantity(guitar._id)}
                              >
                                -
                              </button>
                              <span
                                style={{
                                  marginLeft: ".5rem",
                                  marginRight: ".5rem",
                                }}
                              >
                                {guitar.quantity}
                              </span>
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => increaseQuantity(guitar._id)}
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                style={{ paddingTop: "1rem" }}
                                className="btn"
                                type="button"
                                onClick={() => removeFromCart(guitar._id)}
                              >
                                <FaTrashAlt
                                className="trash_icon"
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="text-end">
                      Total pagar: <span className="fw-bold">${cartTotal}</span>
                    </p>
                  </>
                )}
                {cart.length > 0 && (
                  <Link to={"api/store/cart"}>
                    <button
                      className="btn w-100 mt-3 p-2"
                      style={{ background: "orange" }}
                      onMouseEnter={({ target }) =>
                        (target.style.opacity = ".5")
                      }
                      onMouseLeave={({ target }) =>
                        (target.style.opacity = "1")
                      }
                      onClick={() => {}}
                    >
                      Comprar
                    </button>
                  </Link>
                )}
                <button
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
