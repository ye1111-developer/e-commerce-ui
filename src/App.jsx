import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import { Products } from "./components/Products";
import { Details } from "./components/Details";
export const ProductContext = createContext(null);
function App() {
  const [products, setProducts] = useState([]);
  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      <Routes>
        <Route path="/" element={<Products />}></Route>
        <Route path="/detail/:userId" element={<Details />}></Route>
      </Routes>
    </ProductContext.Provider>
  );
}

export default App;
