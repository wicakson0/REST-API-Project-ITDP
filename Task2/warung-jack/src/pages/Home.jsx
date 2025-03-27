import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  function loadData() {
    axios
      .get(`${baseUrl}/api/products?page=${currentPage}`)
      .then((response) => {
        setProducts(response.data.data);
        setLastPage(response.data.last_page);
      })
      .catch((error) => console.error("Error fetching data:", error));
    console.log(products);
  }

  function handleDelete() {
    if (products.length === 1 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else {
      loadData();
    }
  }

  useEffect(() => {
    loadData();
  }, [currentPage]);

  useEffect(() => {
    console.log("Fetched Products:", products);
  }, [products]);

  return (
    <>
      <div className="flex justify-between mb-4">
        <p className="text-3xl">Product List</p>
        <button
          className="btn btn-outline btn-info"
          onClick={() => navigate("/products/insert")}
        >
          Add Product
        </button>
      </div>
      <div className="flex flex-wrap justify-start gap-1">
        {products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            description={product.description}
            image={product.image}
            name={product.name}
            price={product.price}
            refreshProducts={loadData}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <div className="btn-group">
          <button
            className="btn btn-outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            « Prev
          </button>
          <button className="btn btn-active">
            Page {currentPage} of {lastPage}
          </button>
          <button
            className="btn btn-outline"
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next »
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
