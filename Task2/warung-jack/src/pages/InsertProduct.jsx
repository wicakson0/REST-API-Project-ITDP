import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function InsertProduct() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && ["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
  //     setFormData({ ...formData, image: file });
  //     setPreview(URL.createObjectURL(file));
  //     setErrors({ ...errors, image: "" });
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Invalid Image",
  //       text: "Only JPG, PNG, or WEBP images are allowed!",
  //     });
  //     e.target.value = null; // Reset file input
  //   }
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
    setErrors({ ...errors, image: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      await axios.post(`${baseUrl}/api/products`, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product added successfully!",
      });

      setFormData({ name: "", price: "", description: "", image: null });
      setPreview(null);
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add product. Please try again!",
        });
      }
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-extrabold mb-6 text-center">
          Insert New Product
        </h1>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="form-control mb-6">
            <label className="block text-lg font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered text-lg font-semibold border-2 w-full"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name[0]}</p>
            )}
          </div>

          <div className="form-control mb-6">
            <label className="block text-lg font-bold mb-2">Price</label>
            <input
              type="number"
              name="price"
              className="input input-bordered text-lg font-semibold border-2 w-full"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price[0]}</p>
            )}
          </div>

          <div className="form-control mb-6">
            <label className="block text-lg font-bold mb-2">Description</label>
            <textarea
              name="description"
              className="textarea textarea-bordered text-lg font-semibold border-2 w-full"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description[0]}</p>
            )}
          </div>

          <div className="form-control mb-6">
            <label className="block text-lg font-bold mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              className="file-input file-input-bordered w-full"
              onChange={handleImageChange}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image[0]}</p>
            )}
          </div>

          {preview && (
            <div className="mb-6 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-64 h-64 object-cover rounded-lg border-2"
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full">
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default InsertProduct;
