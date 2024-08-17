import { Route, Routes } from "react-router-dom";
import ProductPage from "./components/ProductPage/ProductPage.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";
import { useCart } from "./Hooks/useCart.js";
import Header from "./components/Header/Header.jsx";
import { LightDarkMode } from "./Context/LightDarkModeContext.jsx";
import { MdOutlineDarkMode } from "react-icons/md";
import CartMainPage from "./components/CartMainPage/CartMainPage.jsx";

function App() {
  const { cart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, cartTotal, isEmpty } = useCart();
  const { handleToggleTheme, theme } = LightDarkMode();

  return (
    <div data-theme={theme} className="new-body main_container" >

        <div className="light-dark-mode" onClick={handleToggleTheme}>
          <MdOutlineDarkMode className="toggle-button" />
        </div>

        <Header
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
        cartTotal={cartTotal}
        isEmpty={isEmpty}
        />

        <Routes>
          <Route path="/" element={<MainPage handleToggleTheme={handleToggleTheme} />}/>
          <Route path="api/store/product/:id" element={<ProductPage />}/>
          <Route path="api/store/cart" element={<CartMainPage />}/>
        </Routes>

        <footer className="bg-dark py-5" style={{alignSelf:'end'}}>
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
        </footer>

    </div>
  )
}

export default App;
