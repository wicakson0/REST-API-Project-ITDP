import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ id, name, price, description, image, refreshProducts }) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const imageUrl = `${baseUrl}/assets/images/${image}`;
  const navigate = useNavigate();

  function deleteData(id) {
    axios
      .delete(`http://localhost:8000/api/products/${id}`)
      .then((response) => {
        console.log("Product deleted:", response.data);
        refreshProducts(); // Refresh the product list after deleting
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  }

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={imageUrl} alt={name} />
      </figure>
      <div className="card-body">
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
          onClick={() => navigate(`products/${id}`)}
        >
          <h2 className="card-title">{name}</h2>
        </button>
        <p>{description}</p>
        <p>{price}</p>
        <div className="card-actions justify-start">
          <button className="btn btn-primary" onClick={() => deleteData(id)}>
            Delete
          </button>
          <button className="btn btn-info">Edit</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
