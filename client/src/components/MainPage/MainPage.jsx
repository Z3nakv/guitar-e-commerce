import Guitar from "../Guitar/Guitar.jsx";
import Aside from "../Aside/Aside.jsx";
import { useCart } from "../../Hooks/useCart.js";
import { RotatingLines } from "react-loader-spinner";
import useFilteredData from "../../Hooks/useFilteredData.js";
import OrderFilter from "../OrderFilter/OrderFilter.jsx";
import { useRef } from "react";
import { TiThMenu } from "react-icons/ti";
import "./MainPage.css";

const MainPage = ({ theme }) => {
  const { addToCart } = useCart();
  const { filterData, priceRequest, count, loading, setCount } =
    useFilteredData();
  const reference = useRef(null);
  const inputCheck = useRef(null);

  document.onclick = (e) => {
    if (e.target === inputCheck.current) {
      reference.current.classList.toggle("check");
      return;
    }
    if (
      reference.current.classList.contains("check") &&
      !reference.current.contains(e.target)
    ) {
      if (e.target !== reference.current) {
        reference.current.classList.remove("check");
        return;
      }
    }
  };

  return (
    <div className="new-body">
      <div className="menu-bar" ref={inputCheck}>
        <TiThMenu className="toggle_aside_button" />
      </div>

      <OrderFilter priceRequest={priceRequest} />

      <div className="main-container">
        <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>
          <ul className="row mt-5">
            {loading ? (
              <div className="loading-container">
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
              </div>
            ) : filterData && filterData.length > 0 ? (
              filterData.map((guitar) => (
                <Guitar guitar={guitar} addToCart={addToCart} />
              ))
            ) : (
              <h4>no hay productos.</h4>
            )}
          </ul>
        </main>

        <Aside
          priceRequest={priceRequest}
          reference={reference}
          theme={theme}
        />
      </div>

      <div className="button-container">
        <button
        className="btn"
          onClick={() => setCount((count) => count + 1)}
          disabled={count === 3 ? true : false}
        >
          {count === 3 ? "No More Data" : "More Data"}
        </button>
      </div>
    </div>
  );
};

export default MainPage;
