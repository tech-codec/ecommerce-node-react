import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import all_products from '../assets/products';
import all_categories from '../assets/categories';
import { useTheme } from '../context/ThemeContext';
import { FaPencil, FaRegEye } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import roles from '../assets/roles'
import { truncateText } from '../utils/truncateText';
import AddEditProductModal from '../components/Modals/ProductsModals/AddEditProductModal';
import ViewProductModal from '../components/Modals/ProductsModals/ViewProductModal';
import DeleteProductModal from '../components/Modals/ProductsModals/DeleteProductModal';
import formatNumberWithSeparators from '../utils/numberSeparator'

const Products = () => {
  const { theme } = useTheme()
  const [products, setProducts] = useState(all_products);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  console.log(roles)

  // Gestion des données filtrées
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);


  const paginatedProducts = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredProducts.slice(start, start + rowsPerPage);
  }, [filteredProducts, page, rowsPerPage]);

  // Gestion de la recherche et de la pagination
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0); // Réinitialiser la pagination lors de la recherche
  };

  // Fonctions de gestion des Produits
  const handleAdd = () => {
    setCurrentProduct({ id: null, image: [], name: '', category:null, new_price: null, old_price: null, description: ''});
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
    setCurrentProductId(id)
    setShowDeleteModal(true)
  }

  const handleDelete = (id) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    setShowDeleteModal(false)
  };

  const handleSave = (product) => {
    if (product.id) {
      setProducts(prevProducts => prevProducts.map(prod => (prod.id === product.id ? product : prod)));
    } else {
      setProducts(prevProducts => [...prevProducts, { ...product, id: prevProducts.length + 1 }]);
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
    <div className="w-full">


      <div className=' mb-8 flex items-center justify-between flex-wrap gap-2'>
        <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} `}>Tous les Produits</h2>
        <h4 className='text-base'><span className='text-gray-500 cursor-pointer'>Tableau de bord / </span><span className='text-purple-700'>Produits</span></h4>
      </div>
      <div className="flex justify-between mb-4 flex-wrap gap-3">
        <button className='px-3 py-2 rounded-md text-lg hover:bg-opacity-80 shadow-2xl text-white bg-green-700' onClick={handleAdd}>Ajouter un produit</button>
        <input value={search} className='px-3 py-2 text-gray-500 text-lg border border-gray-400 rounded-lg outline-none bg-transparent' placeholder="Recherche..." onChange={handleSearchChange} />
        <button className='px-3 py-2 rounded-md text-lg hover:bg-opacity-80 shadow-2xl text-white bg-blue-700' onClick={handleExport}>Exporter vers Excel</button>
      </div>

      <div className={` ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} overflow-x-auto rounded-md shadow-2xl text-gray-500`}>
        <table className='w-1400px xl:w-full'>
          <thead>
            <tr>
              <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>ID</th>
              <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>image</th>
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
            {paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{product.id}</td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}><img className='w-10 h-10 bg-repeat bg-center rounded-full' src={product.image[0]} alt="" /> </td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{truncateText(product.name, 35)}</td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{formatNumberWithSeparators(product.stock)}</td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{formatNumberWithSeparators(product.new_price)}</td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{formatNumberWithSeparators(product.old_price)}</td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{truncateText(product.description, 35)}</td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{product.category}</td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>
                  <button className="bg-transparent  px-2 py-1 m-1" onClick={() => handleEdit(product)}><span className='text-gray-500'><FaPencil /></span></button>
                  <button className="bg-transparent  px-2 py-1 m-1" onClick={() => handleShowDelete(product.id)}><span className='text-red-800'><RiDeleteBin6Line /></span></button>
                  <button className="bg-transparent  px-2 py-1 m-1" onClick={() => handleView(product)}><span className='text-gray-500'><FaRegEye /></span></button>
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
          <button className="bg-blue-700 flex items-center justify-between rounded-md hover:bg-opacity-80 px-4 mr-3 py-2" disabled={page === 0} onClick={() => setPage(page - 1)}><span><IoChevronBackSharp /></span>Précédent</button>
          <button className="bg-blue-700 flex items-center justify-between rounded-md hover:bg-opacity-80 px-4 py-2" disabled={(page + 1) * rowsPerPage >= filteredProducts.length} onClick={() => setPage(page + 1)}>Suivant <span><IoChevronForwardSharp /></span> </button>
        </div>

      </div>

      <AddEditProductModal
        show={showModal}
        product={currentProduct}
        onSave={handleSave}
        categories={all_categories}
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
        user={viewProduct}
        onClose={() => setShowViewModal(false)}
      />
    </div>
  );
};

export default Products;
