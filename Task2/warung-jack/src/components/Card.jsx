import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Card({ id, name, price, description, image, handleDelete }) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const imageUrl = `${baseUrl}/assets/images/${image}`;
  const navigate = useNavigate();

  function deleteData() {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "blue",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${baseUrl}/api/products/${id}`)
          .then(() => {
            handleDelete();
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Product Successfully Deleted",
            });
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to delete the product.",
            });
          });
      }
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
          <button
            className="btn btn-info"
            onClick={() => navigate("/products/update/" + id)}
          >
            Edit
          </button>
        </div>
        <div className="absolute bottom-2 right-2">
          <p>{id}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
