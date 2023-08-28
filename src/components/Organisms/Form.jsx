import React, { useState } from "react";
import { isValidUrl } from "../../utils/common";
import RequiredField from "../Atom/RequiredField";

function Form({ onFormSubmit, onClose }) {
  const validateForm = () => {
    let errors = {};
    if (!product.name) {
      errors.name = "Name is required.";
    } else if (product.name.length < 3) {
      errors.name = "Name is too short";
    }

    //Description validation
    if (!product.description) {
      errors.description = "Product description is required.";
    } else if (product.description.length < 3) {
      errors.description = "product description is too short";
    }

    //Price validation

    if (!product.price) {
      errors.price = "Price is required.";
    } else if (product.price < 0) {
      errors.price = "Price must be greater than zero.";
    }

    //Image url validatin

    if (!product.image_url) {
      errors.image_url = "Product image url is required.";
    } else if (!isValidUrl(product.image_url)) {
      errors.image_url =
        "Invalid image url. Eg. http://example.com/images/productA.jpg";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  
  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  }); //Set default product value 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));

  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onFormSubmit(product);

      setProduct({
        name: "",
        description: "",
        price: "",
        image_url: "",
      }); //after successfully submitted a form, then reset the product object
    }
  };

  return (
    <>
      <form action="#" onSubmit={formSubmitHandler}>
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
              <RequiredField />
            </label>
            <input
              onChange={handleInputChange}
              type="hidden"
              name="id"
              id="id"
              value={new Date().valueOf()}

            />
            <input
              onChange={handleInputChange}
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            {errors.name ? (
              <p className="error text-red-600">{errors.name}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
              <RequiredField />
            </label>
            <input
              onChange={handleInputChange}
              type="number"
              name="price"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            {errors.price ? (
              <p className="error text-red-600">{errors.price}</p>
            ) : null}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
              <RequiredField />
            </label>
            <textarea
              onChange={handleInputChange}
              id="description"
              name="description"
              rows="5"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            ></textarea>

            {errors.description ? (
              <p className="error text-red-600">{errors.description}</p>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="image_url"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Image URL
              <RequiredField />
            </label>
            <input
              type="text"
              onChange={handleInputChange}
              name="image_url"
              id="image_url"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            {errors.image_url ? (
              <p className="error text-red-600">{errors.image_url}</p>
            ) : null}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add product
          </button>

          <a href='#' onClick={onClose} className="text-black     font-medium rounded-lg text-sm  text-center hover:underline">
            Cancel
          </a>
        </div>
      </form>
    </>
  );
}

export default Form;
