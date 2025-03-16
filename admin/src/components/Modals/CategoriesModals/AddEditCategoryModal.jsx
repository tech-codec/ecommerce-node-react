import { useState, useEffect, createRef } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { LuDownload } from 'react-icons/lu';
import { extractUploads, truncateText } from '../../../utils/truncateText';
import useWindowSize from '../../../utils/useWindwosSize';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const AddEditCategoryModal = ({ show, category, onSave, onClose }) => {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
      _id: null,
      name: '',
      description: '',
      listMotCle: [],
      image: null,
    }
  });

  const { theme } = useTheme();
  const [localImage, setLocalImage] = useState(null);
  const [localListMotCle, setLocalListMotCle] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [newMotCle, setNewMotCle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [motClePerPage, setMotClePerPage] = useState(3);
  const { width, height } = useWindowSize();
  const fileInputRef = createRef();
  const apiUrl = import.meta.env.VITE_API_URL;
  const categoryState = useSelector(state => state.categories);
  const { categoriesData } = categoryState;

  const truncaTextMocle = (motCle) => {
    if (width < 768) {
      return truncateText(motCle + "", 15);
    } else {
      return motCle;
    }
  };

  const lenghttMocle = () => {
    if (width < 768) {
      setMotClePerPage(1);
    } else {
      setMotClePerPage(3);
    }
  };

  useEffect(() => {
    truncaTextMocle();
    lenghttMocle();
  }, [width, height]);

  useEffect(() => {
    if (category) {
      setValue('_id', category._id || null);
      setValue('name', category.name || '');
      setValue('description', category.description || "");
      setValue('image', category.image || null);
      setValue('listMotCle', category.listMotCle || []);
      setLocalListMotCle(category.listMotCle || []);
      setLocalImage(category.image || null);
      setCurrentPage(1);
    } else {
      setValue('_id', null);
      setValue('name', '');
      setValue('description', '');
      setValue('image', null);
      setValue('listMotCle', []);
      setLocalListMotCle([]);
      setLocalImage(null);
      setCurrentPage(1);
    }
  }, [category, setValue]);

  useEffect(() => {
    if (show) {
      setValue('_id', category._id || null);
      setValue('name', category.name || '');
      setValue('description', category.description || '');
      setValue('image', category.image || null);
      setValue('listMotCle', category.listMotCle || []);
      setLocalListMotCle(category.listMotCle || []);
      setLocalImage(category.image || null);
      setCurrentPage(1);
    }
  }, [show, category, setValue]);

  const handleAddMotCle = () => {
    if (newMotCle.length < 2 || newMotCle.length > 100) {
      alert("Chaque mot-clé doit contenir entre 2 et 100 caractères.");
      return;
    }

    if (localListMotCle.length >= 50) {
      alert("Vous ne pouvez pas ajouter plus de 50 mots-clés.");
      return;
    }
    if (newMotCle && !localListMotCle.includes(newMotCle)) {
      setLocalListMotCle([...localListMotCle, newMotCle]);
      setValue('listMotCle', [...localListMotCle, newMotCle]);
      setNewMotCle('');
      setCurrentPage(Math.ceil((localListMotCle.length + 1) / motClePerPage));
    }
  };

  const handleRemoveMotCle = (motCle) => {
    setLocalListMotCle(localListMotCle.filter(m => m !== motCle));
    setValue('listMotCle', localListMotCle.filter(m => m !== motCle));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLocalImage(file);
      setValue('image', file);
      setFileName(file.name);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const onSubmit = (data) => {
    console.log('Form data:', data);

    if (localListMotCle.length < 1) {
      alert("Vous devez ajouter au moins un mot-clé.");
      return;
    }

    const categoryData = new FormData();
    categoryData.append('_id', data._id);
    categoryData.append('name', data.name);
    categoryData.append('description', data.description);
    categoryData.append('listMotCle', JSON.stringify(data.listMotCle));

    if (data.image instanceof File) {
      categoryData.append('image', data.image);
    } else {
      categoryData.append('image', data.image);
    }

    onSave(data, categoryData);
  };

  const isUniqueName = (name) => {
    if (category._id) {
      const categoryExists = categoriesData.some((c) => c.name.toLowerCase() === name.toLowerCase() && c._id !== category._id);
      return !categoryExists || 'Le nom existe déjà';
    } else {
      const categoryExists = categoriesData.some((c) => c.name.toLowerCase() === name.toLowerCase());
      return !categoryExists || 'Le nom existe déjà';
    }
  };

  if (!show) return null;

  const indexOfLastMotCle = currentPage * motClePerPage;
  const indexOfFirstMotCle = indexOfLastMotCle - motClePerPage;
  const currentMotCle = localListMotCle?.slice(indexOfFirstMotCle, indexOfLastMotCle);

  const totalPages = Math.ceil(localListMotCle?.length / motClePerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-5">
      <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} w-full sm:w-3/5 z-50 400m:p-4 rounded`}>
        <h2 className={`mb-4 hidden 400m:block ${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-semibold`}>
          {getValues('_id') ? 'Editer la catégorie' : 'Ajouter une catégorie'}
        </h2>

        <form className="flex-wrap-reverse 1400m:flex-nowrap flex z-50 justify-between" onSubmit={handleSubmit(onSubmit)}>
          <input {...register('_id')} type='text' className='hidden' />

          <div className={`w-full 1400m:w-2/3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-xl shadow-sm p-5`}>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-full grow">
                <label htmlFor='name' className={`block mb-3 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Nom de la catégorie
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Entrer le nom"
                  className={`border p-2 w-full rounded-md ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200'} ${errors.name && 'border-red-500'}`}
                  id="name"
                  {...register('name', {
                    required: 'Le nom est requis',
                    minLength: { value: 3, message: 'Le nom doit contenir au moins 10 caractères' },
                    maxLength: { value: 150, message: 'Le nom ne peut pas dépasser 150 caractères' },
                    validate: isUniqueName
                  })}
                />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mb-4 1400m:hidden">
              <div className="w-full grow">
                <label className={`block mb-3 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Photo (png, jpg, jpeg)
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className={`w-full py-3 px-2 border-none rounded-lg outline-none ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200'}`}
                  id="image"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-full grow">
                <label htmlFor="description" className={`block mb-3 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Entrer une description"
                  id="description"
                  {...register('description', { maxLength: { value: 500, message: 'La description ne peut pas dépasser 500 caractères' } })}
                  className={`border p-2 w-full rounded-md ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200'} ${errors.description && 'border-red-500'}`}
                ></textarea>
                {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
              </div>
            </div>

            <div className="mb-4">
              <label className={`block mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Mots-Clés</label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={newMotCle}
                  onChange={(e) => setNewMotCle(e.target.value)}
                  className={`w-full py-3 px-2 border-none rounded-lg outline-none ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200'}`}
                  placeholder="Ajouter un mot-clé"
                />
                <button
                  type="button"
                  onClick={handleAddMotCle}
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Ajouter
                </button>
              </div>
              <ul>
                {currentMotCle?.map((motCle, index) => (
                  <li key={index} className="flex justify-between items-center mb-1">
                    {truncaTextMocle(motCle)}
                    <button
                      type="button"
                      onClick={() => handleRemoveMotCle(motCle)}
                      className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      Supprimer
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-center gap-3 mt-4">
                <div
                  onClick={prevPage}
                  className={`px-3 py-1 cursor-pointer rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                >
                  Précédent
                </div>
                <div
                  onClick={nextPage}
                  className={`px-3 py-1 cursor-pointer rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                >
                  Suivant
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center 1400m:justify-end 1400m:flex-wrap pt-3 gap-2">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 mr-2 rounded-md" onClick={onClose}>Annuler</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">{category._id ? "Mettre à jour" : "Enregistrer"}</button>
            </div>
          </div>

          <div className={`w-full hidden 1400m:w-1/3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} flex-col rounded-xl shadow-sm p-5 1400m:flex items-center justify-center`}>
            {localImage && (
              <img
                src={typeof localImage.image === 'string' ? apiUrl + extractUploads(localImage) : localImage instanceof File ? URL.createObjectURL(localImage) : apiUrl + extractUploads(localImage)}
                alt="Utilisateur"
                className="max-w-full max-h-full object-cover mb-3 h-72"
              />
            )}
            <div onClick={handleButtonClick} className={`w-full flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} justify-center flex-col border-2 border-dotted h-52 cursor-pointer ${theme === 'dark' ? 'border-purple-500' : 'border-violet-700'}`}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <span>{fileName}</span>
              <span className="text-6xl mb-4 mt-4"><LuDownload /></span>
              <span className="text-lg">png, jpeg, jpg</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditCategoryModal;