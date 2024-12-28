import { useSelector } from 'react-redux';
import { useTheme } from '../../../context/ThemeContext';

const ViewProductModal = ({ show, product, onClose }) => {

  const {theme} = useTheme()
  const categoryState = useSelector(state => state.categories)
  const {categoriesData} = categoryState

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 px-5 flex justify-center items-center">
      <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} w-550px p-4 rounded`}>
        <h2 className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-semibold`}>Visualiser le produit</h2>
        <p className='mb-2 text-gray-500'><strong>Nom:</strong> {product?.name}</p>
        <p className='mb-2 text-gray-500'><strong>stock:</strong> {product?.stock}</p>
        <p className='mb-2 text-gray-500'><strong>Nouveau prix:</strong> {product?.new_price}</p>
        <p className='mb-2 text-gray-500'><strong>Ancient prix:</strong> {product?.old_price}</p>
        <p className='mb-2 text-gray-500'><strong>Catégorie:</strong> {categoriesData.find(c => c._id === product.category)?.name}</p>
        <div className="flex justify-end mt-4">
          <button className="bg-gray-500 text-white px-4 py-2" onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;
