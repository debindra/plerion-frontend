import { useEffect, useState } from "react";
import "./App.css";
import ProductHeading from "./components/Organisms/ProductHeading";
import Loading from "./components/Atom/Loading";
import { toast } from "react-hot-toast";
import { getAllProducts, deleteProduct, saveProduct } from "./utils/api";
import Modal from "./components/Organisms/Modal";
import Product from "./components/Organisms/ProductList";
import Form from "./components/Organisms/Form";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const[products, setProducts] = useState([]);

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
 

  const handleFormSubmit = async (product) => {
    setLoading(true);    

    await saveProduct(product)

    setProducts([...products, product]);

    closeModal(); //Close the modal

    setLoading(false)

    toast.success("You have successfully added a new item.")
    setModalOpen(true);

  };

 

  const handleDeleteItem = async(id) => {

    setLoading(true)
    await deleteProduct(id);
    setProducts(products.filter(item => item.id !== id))
    setLoading(false)
    toast.success("You have successfully delete an item.")

  }

  if(loading) return <Loading />

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
              <Form onFormSubmit={handleFormSubmit}  onClose={closeModal}/>
          </div>
        </div>
      </Modal>
    </main>
  );
}

export default App;
