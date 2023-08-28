import { useEffect, useState } from "react";
import "./App.css";
import ProductHeading from "./components/Organisms/ProductHeading";
import Loading from "./components/Atom/Loading";
import { toast } from "react-hot-toast";
import { getAllProducts, deleteProduct, saveProduct } from "./utils/api";
import Modal from "./components/Organisms/Modal";
// import Item from './components/Molecules/Item';
import Product from "./components/Organisms/ProductList";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(true);
  const[products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setLoading(true)
    const loadData = async () => {
      const rows = await getAllProducts();
      setProducts(rows.products);
      setLoading(false)
    };
    loadData();
  }, []);
  

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  

  const validateForm = () => {
    let errors = {};
    if (!product.name) {
      errors.name = "Name is required.";
    } else if (product.name.length < 3) {
      errors.name = "Name is too short";
    }

    //Description
    if (!product.description) {
      errors.description = "Product description is required.";
    } else if (product.description.length < 3) {
      errors.description = "product description is too short";
    }

    //Price validatin

    if (!product.price) {
      errors.price = "Price is required.";
    } else if (product.price < 0) {
      errors.price = "Price must be greater than zero.";
    }

    //Price validatin

    if (!product.image_url) {
      errors.image_url = "Product image url is required.";
    } else if (!isValidUrl(product.image_url)) {
      errors.image_url =
        "Invalid image url. Eg. http://example.com/images/productA.jpg";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidUrl = (urlString) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };

  const handleFormSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    if (validateForm()) {
      // Process the form data, e.g., make an API request
    
    setSubmitting(true);

    await saveProduct(product)

    setProducts([...products, product]);

    setProduct({
      name: '',
      description: '',
      price: '',
      image_url: '',
    }) //Reset the product object

    closeModal(); //Close the modal
    setLoading(false)

    toast.success("You have successfully added a new item.")

    }
    // setModalOpen(true);

  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));

    // setErrors(validateValues(product));
  };

  const handleDeleteItem = async(id) => {

    setLoading(true)
    await deleteProduct(id);
    setProducts(products.filter(item => item.id !== id))
    setLoading(false)
    toast.success("You have successfully delete an item.")

  }

  // if(loading) return <Loading />

  return (
    <main className="py-6 max-w-6xl m-auto container min-h-screen flex-col items-center justify-between">
      <ProductHeading onClickddNewbeerBtn={openModal} />

      <Product products={products} onDelClick={handleDeleteItem} />

      <Modal isOpen={modalOpen} onClose={closeModal}>
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add New Product
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="updateProductModal"
                onClick={closeModal}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form action="#" onSubmit={handleFormSubmit}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>

                  {/* <input
                    onChange={handleInputChange}
                    type="hidden"
                    name="productId"
                    value={new Date().valueOf()}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  /> */}
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
                  className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save product
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </main>
  );
}

export default App;
