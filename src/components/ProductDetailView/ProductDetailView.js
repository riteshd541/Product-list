import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailView.css";

const ProductDetailView = ({ data }) => {
  const { productId } = useParams();

  // Find the corresponding product using productId and data array
  const product = data.find((item) => item.id === parseInt(productId));

  if (!product) {
    return (
      <div
        className="container my-4 "
        style={{ width: "50%", marginLeft: "20%" }}
      >
        <h1>Not Found</h1>
      </div>
    );
  }

  return (
    <div className="container my-4" style={{ width: "50%", marginLeft: "20%" }}>
      <h1 className="custom-h1">Product Detail View</h1>
      <div className="d-flex justify-content-center align-items-center">
        <img
          src={product.image}
          alt={product.title}
          className="img-fluid"
          style={{
            width: "100%",
            height: "300px",
          }}
        />
      </div>
      <h5 className="my-1">{product.title}</h5>
      <p className="my-1">Price: ${product.price}</p>
      <p className="my-2">{product.description}</p>
    </div>
  );
};

export default ProductDetailView;
