import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListPage from "./components/ProductListPage/ProductListPage";
import Navbar from "./Navbar";
import axios from "axios";
import ProductDetailView from "./components/ProductDetailView/ProductDetailView";

const App = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search

  const fetchData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar onSearch={setSearchQuery} /> {/* Pass setSearchQuery */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={<ProductListPage data={data} searchQuery={searchQuery} />}
          />
          <Route
            path="/products/:productId"
            element={<ProductDetailView data={data} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
