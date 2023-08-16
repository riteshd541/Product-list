import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductListPage.css";
import ProductDetailView from "../ProductDetailView/ProductDetailView";
import ProductFilter from "../ProductFilter/ProductFilter";

const ProductListPage = ({ data, searchQuery }) => {
  const categories = [...new Set(data.map((product) => product.category))];
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({
    category: "All",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    const filteredProducts = data.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredProducts);
  }, [searchQuery, data]);

  // Additional useEffect to update filtered data on component mount
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleFilterChange = (filters) => {
    setAppliedFilters(filters);
  };

  const filteredDataWithFilters = filteredData.filter((product) => {
    const categoryFilter =
      !appliedFilters.category || product.category === appliedFilters.category;

    const minPriceFilter =
      isNaN(appliedFilters.minPrice) ||
      product.price >= appliedFilters.minPrice;

    const maxPriceFilter =
      isNaN(appliedFilters.maxPrice) ||
      product.price <= appliedFilters.maxPrice;

    return categoryFilter && minPriceFilter && maxPriceFilter;
  });

  const productsToRender =
    appliedFilters.category === "All" &&
    appliedFilters.minPrice === "" &&
    appliedFilters.maxPrice === ""
      ? data
      : filteredDataWithFilters;

  return (
    <div className="container my-4 mb-4">
      <ProductFilter
        categories={categories}
        onFilterChange={handleFilterChange}
      />
      <div className="row">
        {productsToRender.map((item, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div
              className="container p-3 d-flex flex-column"
              style={{ height: "100%", boxShadow: "2px 2px 10px Silver" }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "300px",
                  }}
                />
              </div>
              <h5 className="my-1">{item.title}</h5>
              <p className="my-1">Price: ${item.price}</p>
              <Link
                to={`/products/${item.id}`}
                onClick={() => handleProductClick(item)}
                className="product-link"
              >
                View Product Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && <ProductDetailView product={selectedProduct} />}
    </div>
  );
};

export default ProductListPage;
