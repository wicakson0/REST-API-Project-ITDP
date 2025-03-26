import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/products/${id}`)
      .then((response) => {
        setProduct(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setError("Failed to load product data");
        setLoading(false);
      });
  }, [id, baseUrl]);

  if (loading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-lg text-red-500 font-semibold">{error}</p>
    );

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-extrabold mb-6 text-center">
          Product Detail
        </h1>

        <div className="flex flex-col items-center">
          <div className="form-control mb-6 w-full">
            <label className="block text-lg font-bold mb-2 text-center">
              Image
            </label>
            <img
              src={`${baseUrl}/assets/images/${product.image}`}
              alt={product.name}
              className="w-full h-auto rounded-lg border-2 border-gray-300"
            />
          </div>

          <form className="w-full">
            <div className="form-control mb-6">
              <label className="block text-lg font-bold mb-2">Name</label>
              <input
                type="text"
                className="input input-bordered text-lg font-semibold border-2 w-full"
                value={product.name}
                disabled
              />
            </div>

            <div className="form-control mb-6">
              <label className="block text-lg font-bold mb-2">Price</label>
              <input
                type="text"
                className="input input-bordered text-lg font-semibold border-2 w-full"
                value={product.price}
                disabled
              />
            </div>

            <div className="form-control mb-6">
              <label className="block text-lg font-bold mb-2">
                Description
              </label>
              <textarea
                className="textarea textarea-bordered text-lg font-semibold border-2 w-full"
                value={product.description}
                disabled
              />
            </div>
          </form>
          <button
            className="btn btn-info mt-6 w-full"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
