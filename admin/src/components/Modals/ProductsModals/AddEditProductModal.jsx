import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { extractUploads, truncateText } from '../../../utils/truncateText';
import NumberFormat from '../../NumberFormat';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';

const AddEditProductModal = ({ show, product, onSave, categories, onClose }) => {
  const { register, control, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
      _id: null,
      name: '',
      description: '',
      category: '',
      new_price: 0,
      old_price: 0,
      stock: 0,
      email: '',
      images: [],
    }
  });
  const { theme } = useTheme();
  const [localImages, setLocalImages] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const fileInputRef = useRef();
  const apiUrl = import.meta.env.VITE_API_URL;
  const productState = useSelector(state => state.products);
  const { productsData } = productState;

  useEffect(() => {
    if (product) {
      setValue('_id', product._id || null);
      setValue('name', product.name || '');
      setValue('category', product.category._id);
      setValue('description', product.description || '');
      setValue('new_price', product.new_price || 0);
      setValue('old_price', product.old_price || 0);
      setValue('stock', product.stock || 0);
      setValue('images', product.images || []);
      setLocalImages(product.images || []);
      setCurrentPhotoIndex(0);
    } else {
      setValue('_id', null);
      setValue('name', '');
      setValue('category', '');
      setValue('description', '');
      setValue('new_price', 0);
      setValue('old_price', 0);
      setValue('stock', 0);
      setValue('images', []);
      setLocalImages([]);
    }
  }, [product, setValue]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (localImages.length + files.length > 4) {
      alert('Vous ne pouvez ajouter que 4 images maximum.');
      return;
    }
    setLocalImages([...localImages, ...files]);
    setValue('images', [...localImages, ...files]);
  };

  const handleRemovePhoto = (index) => {
    if (localImages.length <= 1) {
      alert("Vous ne pouvez pas supprimer la dernière image restante.");
      return;
    }
    const updatedImages = localImages.filter((_, i) => i !== index);
    setLocalImages(updatedImages);
    setValue('images', updatedImages);
    if (currentPhotoIndex >= index) {
      setCurrentPhotoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    }
  };

  const onSubmit = (data) => {
    console.log('Form data vérify:  ', data);
    const productData = new FormData();
    productData.append('_id', data._id);
    productData.append('name', data.name);
    productData.append('description', data.description);
    productData.append('new_price', data.new_price);
    productData.append('old_price', data.old_price);
    productData.append('stock', data.stock);
    productData.append('category', data.category);
    data.images.forEach((image) => {
      productData.append('images', image);
    });
    onSave(data, productData);
  };

  const isUniqueName = (name) => {
    if (product._id) {
      const productExists = productsData.some((p) => p.name.toLowerCase() === name.toLowerCase() && p._id !== product._id);
      return !productExists || 'Le nom existe déjà';
    } else {
      const productExists = productsData.some((p) => p.name.toLowerCase() === name.toLowerCase());
      return !productExists || 'Le nom existe déjà';
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-5">
      <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} w-full sm:w-3/5 z-50 400m:p-4 rounded`}>
        <h2 className={`mb-4 hidden 400m:block ${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-semibold`}>{getValues('_id') ? 'Editer le produit' : 'Ajouter un produit'}</h2>
        <form className="flex-wrap-reverse 1400m:flex-nowrap flex z-50 justify-between" onSubmit={handleSubmit(onSubmit)}>
          <input {...register('_id')} type='text' className='hidden' />
          <div className={`w-full 1400m:w-2/3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-xl shadow-sm p-5`}>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-full">
                <label htmlFor='name' className={`block mb-3 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Nom du produit</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  {...register('name', {
                    required: 'Le nom est requis',
                    minLength: { value: 3, message: 'Le nom doit contenir au moins 3 caractères' },
                    maxLength: { value: 1050, message: 'Le nom ne peut pas dépasser 1050 caractères' },
                    validate: isUniqueName
                  })}
                  className={`w-full py-2 px-2 border rounded-lg outline-none ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200'} ${errors.name && 'border-red-500'}`}
                />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-full">
                <label htmlFor='new_price' className={`block mb-3 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Nouveau prix</label>
                <Controller
                  name="new_price"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <NumberFormat
                      {...field}
                      className={`w-full py-2 px-2 border rounded-lg outline-none ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200'} ${errors.new_price && 'border-red-500'}`}
                      placeholder="Entrer le prix"
                      id="new_price"
                    />
                  )}
                />
                {errors.new_price && <span className="text-red-500 text-xs italic">Ce champ est requis.</span>}
              </div>

              <div className="w-full">
                <label htmlFor='old_price' className={`block mb-3 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Ancien Prix</label>
                <Controller
                  name="old_price"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <NumberFormat
                      {...field}
                      className={`w-full py-2 px-2 border rounded-lg outline-none ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200'} ${errors.old_price && 'border-red-500'}`}
                      placeholder="Entrer le prix"
                      id="old_price"
                    />
                  )}
                />
                {errors.old_price && <span className="text-red-500 text-xs italic">Ce champ est requis.</span>}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-full">
                <label htmlFor='stock' className={`block mb-3 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Entrer le stock</label>
                <Controller
                  name="stock"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <NumberFormat
                      {...field}
                      className={`w-full py-2 px-2 border rounded-lg outline-none ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200'} ${errors.stock && 'border-red-500'}`}
                      placeholder="Entrer le stock"
                      id="stock"
                    />
                  )}
                />
                {errors.stock && <span className="text-red-500 text-xs italic">Ce champ est requis.</span>}
              </div>

              <div className="w-full">
                <label className={`block mb-3 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="category">
                  Catégorie
                </label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className={`w-full py-3 pl-2 border-none rounded-lg outline-none ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200'} cursor-pointer ${errors.category && 'border-red-500'}`}
                      id="category"
                    >
                      <option value="">{getValues('category') === '' ? 'Choisissez une catégorie' : categories.find(c => c._id === getValues('category'))?.name}</option>
                      {categories
                        .filter(category => category._id !== getValues('category'))
                        .map((cat) => (
                          <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                  )}
                />
                {errors.category && <span className="text-red-500 text-xs italic">Ce champ est requis.</span>}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mb-4 1400m:hidden">
              <div className="w-full grow">
                <label className={`block mb-3 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Sélectionner une image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  name="images"
                  className={`w-full py-3 px-2 border-none rounded-lg outline-none ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200'}`}
                  placeholder="Entrer votre Prénom"
                  id="image"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-full grow">
                <label htmlFor="description" className={`block mb-3 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                <textarea
                  name="description"
                  id="description"
                  {...register('description', { required: 'La description est requise', minLength: { value: 10, message: 'La description doit contenir au moins 10 caractères' }, maxLength: { value: 1024, message: 'La description ne peut pas dépasser 1024 caractères' } })}
                  className={`border p-2 w-full rounded-md ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200'} ${errors.description && 'border-red-500'}`}
                ></textarea>
                {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
              </div>
            </div>

            <div className="flex items-center justify-center 1400m:justify-end 1400m:flex-wrap pt-3 gap-2">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 mr-2 rounded-md" onClick={onClose}>Annuler</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">{product?._id ? "Mettre à jour" : "Enregistrer"}</button>
            </div>
          </div>

          <div className={`w-full hidden 1400m:block 1400m:w-1/3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} h-96 rounded-xl shadow-sm p-5`}>
            <div className="mb-4">
              <label className={`block mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Photos</label>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                className={`border p-2 w-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}
              />
              {localImages?.length > 0 && (
                <div className="mt-4">
                  <img
                    src={typeof localImages[currentPhotoIndex] === 'string' ? apiUrl + extractUploads(localImages[currentPhotoIndex]) : URL.createObjectURL(localImages[currentPhotoIndex])}
                    alt="Selected"
                    className="w-full h-64 object-cover rounded mb-4"
                  />
                  <div className="flex flex-wrap">
                    {localImages.map((photo, index) => (
                      <div
                        key={index}
                        className="relative mr-2 mb-2 cursor-pointer"
                        onClick={() => setCurrentPhotoIndex(index)}
                      >
                        <img
                          src={typeof photo === 'string' ? apiUrl + extractUploads(photo) : URL.createObjectURL(photo)}
                          alt={`photo-${index}`}
                          className={`w-14 h-14 object-cover rounded ${index === currentPhotoIndex ? 'border-4 border-blue-500' : ''}`}
                        />
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemovePhoto(index);
                          }}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          &times;
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditProductModal;