import { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import ViewCategoryModal from '../components/Modals/CategoriesModals/ViewCategoryModal';
import { useTheme } from '../context/ThemeContext';
import { FaPencil, FaRegEye } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import DeleteCategoryModal from '../components/Modals/CategoriesModals/DeleteCategoryModal';
import roles from '../assets/roles'
import AddEditCategoryModal from '../components/Modals/CategoriesModals/AddEditCategoryModal';
import { useDispatch, useSelector } from 'react-redux';
import { extractUploads } from '../utils/truncateText';
import LoadingLoader from "../components/LoadingLoader"
import { addCategory, deleteCategory, editeCategory } from '../actions/categoryAction/category.action';

const Categories = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { theme } = useTheme()
  const categoryState = useSelector(state => state.categories)
  const {categoriesData, loading} = categoryState
  const dispatch = useDispatch()
  const [categories, setCategories] = useState(categoriesData);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [viewCategory, setViewCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  console.log(roles)

  // Gestion des données filtrées
  const filteredCategories = useMemo(() => {
    return categories.filter(category =>
      category.name.toLowerCase().includes(search.toLowerCase()) ||
      category.listMotCle.some(element => {
        element.toLowerCase().includes(search.toLowerCase())
      })
    );
  }, [categories, search]);


  const paginatedCategories = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredCategories.slice(start, start + rowsPerPage);
  }, [filteredCategories, page, rowsPerPage]);

  // Gestion de la recherche et de la pagination
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0); // Réinitialiser la pagination lors de la recherche
  };

  // Fonctions de gestion des Categories
  const handleAdd = () => {
    setCurrentCategory({ image: '', name: '', description: "", listMotCle: [] });
    setShowModal(true);
  };


  const handleEdit = (category) => {
    setCurrentCategory(category);
    setShowModal(true);
  };

  const handleView = (category) => {
    setViewCategory(category);
    setShowViewModal(true);
  };

  const handleShowDelete = (id) => {
    setCurrentCategoryId(id)
    setShowDeleteModal(true)
  }

  const handleDelete = (id) => {
    setCategories(prevCategories => prevCategories.filter(category => category._id !== id));
    dispatch(deleteCategory(id))
    setShowDeleteModal(false)
  };

 
  const handleSave = (categoryState, categoryFomdata) => {
    if (categoryState._id) {
      setCategories(prevCategories => prevCategories.map(c => (c._id === categoryState._id ? categoryState : c)));
      console.log("test pb: " + JSON.stringify(categoryState))
      dispatch(editeCategory(categoryState._id, categoryFomdata))
    } else {
      setCategories(prevCategories => [...prevCategories, categoryState]);
      dispatch(addCategory(categoryFomdata))
    }
    setShowModal(false);
    const { image } = categoryState
    console.log(`test pb2: et le id:${categoryState._id} " "  ${JSON.stringify(image)}`)
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(categories);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Categories');
    XLSX.writeFile(wb, 'categories.xlsx');
  };
  // Calcul de la plage des entrées visibles
  const start = page * rowsPerPage + 1;
  const end = Math.min((page + 1) * rowsPerPage, filteredCategories.length);

  return (
    loading
    ?
    <div className='px-3 md:px-8 flex items-center flex-col justify-center h-screen'>
      <LoadingLoader />
      <p className='text-xl text-gray-500 text-center mt-3 '>patienté quelque minutes le temps que les données chargent</p>
    </div>
    :
    <div className="w-full">
      <div className=' mb-8 flex items-center justify-between flex-wrap gap-2'>
        <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} `}>Tous les Catégories</h2>
        <h4 className='text-base'><span className='text-gray-500 cursor-pointer'>Tableau de bord / </span><span className='text-purple-700'>Categories</span></h4>
      </div>
      <div className="flex justify-between mb-4 flex-wrap gap-3">
        <button className='px-3 py-2 rounded-md text-lg hover:bg-opacity-80 shadow-2xl text-white bg-green-700' onClick={handleAdd}>Ajouter une Catégorie</button>
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
              <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Liste des mots clés</th>
              <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.map((category, index) => (
              <tr key={category.id}>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{start + index}</td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}><img className='w-10 h-10 bg-repeat bg-center rounded-full' src={typeof category.image === 'string' ? apiUrl + extractUploads(category.image) : category.image instanceof File ? URL.createObjectURL(category.image) : "/uploads/images/default-banner.jpg"} alt="imacategory" /> </td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{category.name}</td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{category.listMotCle.join(', ')}</td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>
                  <button className="bg-transparent  px-2 py-1 m-1" onClick={() => handleEdit(category)}><span className='text-gray-500'><FaPencil /></span></button>
                  <button className="bg-transparent  px-2 py-1 m-1" onClick={() => handleShowDelete(category._id)}><span className='text-red-800'><RiDeleteBin6Line /></span></button>
                  <button className="bg-transparent  px-2 py-1 m-1" onClick={() => handleView(category)}><span className='text-gray-500'><FaRegEye /></span></button>
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
            Affichage de {start} à {end} sur {filteredCategories.length} entrées
          </span>
        </div>
        <div className='flex items-center justify-between text-white'>
          <button className="bg-blue-700 flex items-center justify-between rounded-md hover:bg-opacity-80 px-4 mr-3 py-2" disabled={page === 0} onClick={() => setPage(page - 1)}><span><IoChevronBackSharp /></span>Précédent</button>
          <button className="bg-blue-700 flex items-center justify-between rounded-md hover:bg-opacity-80 px-4 py-2" disabled={(page + 1) * rowsPerPage >= filteredCategories.length} onClick={() => setPage(page + 1)}>Suivant <span><IoChevronForwardSharp /></span> </button>
        </div>

      </div>

      <AddEditCategoryModal
        show={showModal}
        category={currentCategory}
        onSave={handleSave}
        onClose={() => setShowModal(false)}
      />

      <DeleteCategoryModal
        show={showDeleteModal}
        currentUserId={currentCategoryId}
        onDelete={handleDelete}
        onClose={() => setShowDeleteModal(false)}
      />

      <ViewCategoryModal
        show={showViewModal}
        category={viewCategory}
        onClose={() => setShowViewModal(false)}
      />
    </div>
  );
};

export default Categories;
