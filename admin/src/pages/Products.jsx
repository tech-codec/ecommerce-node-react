import { useState, useMemo, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { FaPencil, FaRegEye } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';

import AddEditProductModal from '../components/Modals/ProductsModals/AddEditProductModal';
import ViewProductModal from '../components/Modals/ProductsModals/ViewProductModal';
import DeleteProductModal from '../components/Modals/ProductsModals/DeleteProductModal';
import LoadingLoader from "../components/LoadingLoader";

import { addProduct, deleteProduct, editeProduct, getAllProducts } from '../actions/productAction/product.action';
import { extractUploads, truncateText } from '../utils/truncateText';
import formatNumberWithSeparators from '../utils/numberSeparator';



const Products = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { theme } = useTheme();
  const dispatch = useDispatch();

  // État pour gérer les produits
  const productState = useSelector(state => state.products);
  const { productsData, loading } = productState;
  const [products, setProducts] = useState([]);

  // État pour gérer les modales
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // État pour gérer le produit actuel
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);

  // État pour gérer la recherche et la pagination
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const categoryState = useSelector(state => state.categories)
  const {categoriesData} = categoryState

  // Charger les produits lorsque le composant est monté
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Mettre à jour les produits locaux lorsque les données des produits changent
  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  // Filtrer les produits en fonction de la recherche
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  // Paginer les produits filtrés
  const paginatedProducts = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredProducts.slice(start, start + rowsPerPage);
  }, [filteredProducts, page, rowsPerPage]);

  // Gestion de la recherche
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0); // Réinitialiser la pagination lors de la recherche
  };

  // Gestion des produits
  const handleAdd = () => {
    setCurrentProduct({ images: [], name: '', stock: 0, category: '', new_price: 0, old_price: 0, description: '' });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleView = (product) => {
    setViewProduct(product);
    setShowViewModal(true);
  };

  const handleShowDelete = (id) => {
    setCurrentProductId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = (id) => {
    setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
    dispatch(deleteProduct(id));
    setShowDeleteModal(false);
  };

  const handleSave = (productState, productFormData) => {
    if (productState._id) {
      setProducts(prevProducts => prevProducts.map(prod => (prod._id === productState._id ? productState : prod)));
      dispatch(editeProduct(productState._id, productFormData));
    } else {
      setProducts(prevProducts => [...prevProducts, productState]);
      dispatch(addProduct(productFormData));
    }
    setShowModal(false);
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(products);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    XLSX.writeFile(wb, 'products.xlsx');
  };

  // Calcul de la plage des entrées visibles
  const start = page * rowsPerPage + 1;
  const end = Math.min((page + 1) * rowsPerPage, filteredProducts.length);

  return (
    loading ? (
      <div className='px-3 md:px-8 flex items-center flex-col justify-center h-screen'>
        <LoadingLoader />
        <p className='text-xl text-gray-500 text-center mt-3'>Patientez quelques minutes le temps que les données chargent</p>
      </div>
    ) : (
      <div className="w-full">
        <div className='mb-8 flex items-center justify-between flex-wrap gap-2'>
          <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Tous les Produits</h2>
          <h4 className='text-base'>
            <span className='text-gray-500 cursor-pointer'>Tableau de bord / </span>
            <span className='text-purple-700'>Produits</span>
          </h4>
        </div>
        <div className="flex justify-between mb-4 flex-wrap gap-3">
          <button className='px-3 py-2 rounded-md text-lg hover:bg-opacity-80 shadow-2xl text-white bg-green-700' onClick={handleAdd}>Ajouter un produit</button>
          <input 
            value={search} 
            className='px-3 py-2 text-gray-500 text-lg border border-gray-400 rounded-lg outline-none bg-transparent' 
            placeholder="Recherche..." 
            onChange={handleSearchChange} 
          />
          <button 
            className='px-3 py-2 rounded-md text-lg hover:bg-opacity-80 shadow-2xl text-white bg-blue-700' 
            onClick={handleExport}
          >
            Exporter vers Excel
          </button>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} overflow-x-auto rounded-md shadow-2xl text-gray-500`}>
          <table className='w-1400px xl:w-full'>
            <thead>
              <tr>
                <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>ID</th>
                <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Image</th>
                <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Nom</th>
                <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Stock</th>
                <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Nouveau Prix</th>
                <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Ancien Prix</th>
                <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Description</th>
                <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Catégorie</th>
                <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product, index) => (
                <tr key={product._id}>
                  <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{start + index}</td>
                  <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>
                    <img 
                      className='w-10 h-10 rounded-full' 
                      src={typeof product.images[0] === 'string' 
                        ? apiUrl + extractUploads(product.images[0]) 
                        : product.images[0] instanceof File 
                          ? URL.createObjectURL(product.images[0]) 
                          : "/uploads/images/no-image-product.jpg"} 
                      alt="product" 
                    />
                  </td>
                  <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{truncateText(product.name, 35)}</td>
                  <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{formatNumberWithSeparators(product.stock)}</td>
                  <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{formatNumberWithSeparators(product.new_price.toFixed(2), " ")} €</td>
                  <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{formatNumberWithSeparators(product.old_price.toFixed(2), " ")} €</td>
                  <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{truncateText(product.description, 35)}</td>
                  <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{categoriesData.find(c => c._id === product.category._id)?.name }</td>
                  <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>
                    <button className="bg-transparent px-2 py-1 m-1" onClick={() => handleEdit(product)}>
                      <span className='text-gray-500'><FaPencil /></span>
                    </button>
                    <button className="bg-transparent px-2 py-1 m-1" onClick={() => handleShowDelete(product._id)}>
                      <span className='text-red-800'><RiDeleteBin6Line /></span>
                    </button>
                    <button className="bg-transparent px-2 py-1 m-1" onClick={() => handleView(product)}>
                      <span className='text-gray-500'><FaRegEye /></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 gap-2 flex-wrap">
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            className="border border-gray-300 p-2 rounded-md bg-gray-300 shadow-2xl"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          <div>
            <span className="text-sm text-gray-700 font-semibold">
              Affichage de {start} à {end} sur {filteredProducts.length} entrées
            </span>
          </div>
          <div className='flex items-center justify-between text-white'>
            <button 
              className="bg-blue-700 flex items-center justify-between rounded-md hover:bg-opacity-80 px-4 mr-3 py-2" 
              disabled={page === 0} 
              onClick={() => setPage(page - 1)}
            >
              <span><IoChevronBackSharp /></span>Précédent
            </button>
            <button 
              className="bg-blue-700 flex items-center justify-between rounded-md hover:bg-opacity-80 px-4 py-2" 
              disabled={(page + 1) * rowsPerPage >= filteredProducts.length} 
              onClick={() => setPage(page + 1)}
            >
              Suivant <span><IoChevronForwardSharp /></span>
            </button>
          </div>
        </div>

        <AddEditProductModal
          show={showModal}
          product={currentProduct}
          onSave={handleSave}
          categories={categoriesData}
          onClose={() => setShowModal(false)}
        />

        <DeleteProductModal
          show={showDeleteModal}
          currentUserId={currentProductId}
          onDelete={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />

        <ViewProductModal
          show={showViewModal}
          product={viewProduct}
          onClose={() => setShowViewModal(false)}
        />
      </div>
    )
  );
};

export default Products;
