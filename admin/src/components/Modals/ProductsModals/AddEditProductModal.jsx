import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { LuDownload } from 'react-icons/lu';
import { truncateText } from '../../../utils/truncateText';
import useWindowSize from '../../../utils/useWindwosSize';
import formatNumberWithSeparators from '../../../utils/numberSeparator';

const AddEditProductModal = ({ show, product, onSave, categories, onClose }) => {
  const [formProduct, setFormProduct] = useState({ id: null, image: [], name: '', category: null, new_price: null, old_price: null, description: '' });
  const [selectedCategory, setSelectedCategory] = useState('');
  const { theme } = useTheme()
  //const [fileName, setFIleName] = useState(null)
  const { width, height } = useWindowSize();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const fileInputRef = useRef();

  const truncaTextMocle = (motCle) => {
    if (width < 768) {
      return truncateText(motCle + "", 15)
    } else {
      return motCle
    }
  };


  useEffect(() => {
    truncaTextMocle()
  }, [width, height]);

  useEffect(() => {
    if (product) {
      setFormProduct({
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.image || [],
        new_price: product.new_price,
        old_price: product.old_price,
        stock: product.stock
      });
      setCurrentPhotoIndex(0);
    } else {
      setFormProduct({ id: null, image: [], name: '', category: null, new_price: null, old_price: null, description: '' });
    }
  }, [product]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormProduct({ ...formProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (formProduct.image.length + files.length > 4) {
      alert('Vous ne pouvez ajouter que 4 images maximum.');
      return;
    }
    setFormProduct((prevFormProduct) => ({
      ...prevFormProduct,
      image: [...prevFormProduct.image, ...files],
    }));
  };

  const handleRemovePhoto = (index) => {
    setFormProduct((prevFormProduct) => ({
      ...prevFormProduct,
      image: prevFormProduct.image.filter((_, i) => i !== index),
    }));
    if (currentPhotoIndex >= index) {
      setCurrentPhotoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    }
  };

  // const handleRolesChange = (roles) => {
  //   setFormUser((prevFormUser) => ({ ...prevFormUser, roles }));
  // };


  const handleSubmit = () => {
    onSave(formProduct);
  };


  const renderImagePreview = (image) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return image; // assuming image is a URL string
  };


  // const fileInputRef = createRef();

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     // Faire quelque chose avec le fichier
  //     setFIleName(file.name)
  //     console.log(file.name);
  //   }
  // };

  // const handleButtonClick = () => {
  //   fileInputRef.current.click();
  // };

  if (!show) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-5">
      <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} w-full sm:w-3/5 z-50 400m:p-4 rounded`}>
        <h2 className={`mb-4 hidden 400m:block ${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-semibold`}>{formProduct.id ? 'Editer la product' : 'Ajouter une product'}</h2>

        <form className="flex-wrap-reverse 1400m:flex-nowrap flex z-50    justify-between ">
          <div className="w-full 1400m:w-2/3 bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-full ">
                <label htmlFor='name' className="block mb-3 font-semibold text-gray-700" >Nom du produit</label>
                <input onChange={handleInputChange} type="text" value={product.name} name="name" className="w-full py-3 px-2 border-none rounded-lg outline-none bg-gray-200" placeholder="Entrer le nom" id="name" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-full">
                <label htmlFor='name' className="block mb-3 font-semibold text-gray-700" >Nouveau prix</label>
                <input type="number" value={formatNumberWithSeparators(product.new_price, '.')} name="name" className="w-full py-3 px-2 border-none rounded-lg outline-none bg-gray-200" placeholder="Entrer le nom" id="name" />
              </div>
              <div className="w-full">
                <label htmlFor='name' className="block mb-3 font-semibold text-gray-700" >Ancien Prix</label>
                <input type="number" value={formatNumberWithSeparators(product.old_price, '.')} name="name" className="w-full py-3 px-2 border-none rounded-lg outline-none bg-gray-200" placeholder="Entrer le nom" id="name" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-full">
                <label htmlFor='name' className="block mb-3 font-semibold text-gray-700" >Entrer le stock</label>
                <input type="number" value={formatNumberWithSeparators(product.stock, '.')} name="name" className="w-full py-3 px-2 border-none rounded-lg outline-none bg-gray-200" placeholder="Entrer le nom" id="name" />
              </div>
              <div className="w-full">
                <label className="block mb-3 font-semibold text-gray-700" htmlFor="category">
                  Catégorie
                </label>

                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-3 pl-2 border-none rounded-lg outline-none bg-gray-200 cursor-pointer"
                >
                  <option value={`${product.category !== null ? product.category : ''}`}>{`${product.category !== null ? product.category : 'Choisissez une catégorie'}`}</option>
                  {categories.filter(category => category.name !== product.category).map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>

              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mb-4 1400m:hidden">
              <div className="w'full grow">
                <label className="block mb-3 font-semibold text-gray-700" >Selectionner une image</label>
                <input type="file" onChange={handleFileChange} name="image" className="w-full py-3 px-2 border-none rounded-lg outline-none bg-gray-200" placeholder="Entrer votre Prénom" id="image" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w'full grow">
                <label htmlFor="description" className="block mb-3 font-semibold text-gray-700" >Description</label>
                <textarea type="text" name="description" className="w-full py-3 px-2 border-none rounded-lg outline-none bg-gray-200" placeholder="Entrer une description" id="description">

                </textarea>
              </div>

            </div>



            <div className=" flex items-center justify-center 1400m:justify-end 1400m:flex-wrap pt-3 gap-2">
              <button className="bg-gray-500  text-white px-4 py-2 mr-2 rounded-md" onClick={onClose} >Annuler</button>
              <button className="bg-blue-500  text-white px-4 py-2 rounded-md" onClick={handleSubmit} >Enregistrer</button>
            </div>

          </div>

          <div className="w-full hidden 1400m:block 1400m:w-1/3 bg-white h-96  rounded-xl shadow-sm p-5">


            <div className="mb-4">
              <label className="block mb-1">Photos</label>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                className="border p-2 w-full"
              />
              {formProduct.image.length > 0 && (
                <div className="mt-4">
                  <img
                    src={renderImagePreview(formProduct.image[currentPhotoIndex])}
                    alt="Selected"
                    className="w-full h-64 object-cover rounded mb-4"
                  />
                  <div className="flex flex-wrap">
                    {formProduct.image.map((photo, index) => (
                      <div
                        key={index}
                        className="relative mr-2 mb-2 cursor-pointer"
                        onClick={() => setCurrentPhotoIndex(index)}
                      >
                        <img
                          src={renderImagePreview(photo)}
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
            {/* {
              product.image[0] &&
              <div className="flex items-center mb-4 ">
                <img src={product.image[0]} className="w-full h-40 rounded-md" alt="" />
              </div>
            }


            <div onClick={handleButtonClick} className="w-full flex items-center text-gray-500 justify-center flex-col border-2 border-dotted h-52 cursor-pointer border-violet-700">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <span>{fileName}</span>
              <span className="text-6xl mb-4 mt-4"><LuDownload /></span>
              <span className="text-lg">png, jpeg, jpg, </span>
            </div> */}

          </div>

        </form>





        {/* <form className='text-gray-500'>
          <div className='md:flex items-center justify-between gap-3'>
            <div className="mb-4">
              <label htmlFor="name" className="block">Nom</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formUser.name}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md bg-gray-200"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="firstName" className="block">Prénom</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formUser.name}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md bg-gray-200"
              />
            </div>
          </div>


          <div className='md:flex items-center justify-between gap-3'>
            <div className="mb-4">
              <label htmlFor="email" className="block">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formUser.email}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md bg-gray-200"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tel" className="block">Numéro de téléphone</label>
              <input
                type='tel'
                name="phoneNumber"
                id="tel"
                value={formUser.email}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md bg-gray-200"
              />
            </div>
          </div>


          <div className="mb-4">
            <label htmlFor="userName" className="block">Nom d'utilisateur</label>
            <input
              type="text"
              name="userName"
              id="userName"
              value={formUser.email}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-md bg-gray-200"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Rôles</label>
            <UserRolesSelect
              roles={roles}
              selectedRoles={formUser.roles}
              onChange={handleRolesChange}
            />
          </div>
        </form>
        <div className="flex justify-end">
          <button className="bg-gray-500 text-white px-4 py-2 mr-2 rounded-md" onClick={onClose}>Annuler</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>Enregistrer</button>
        </div> */}
      </div>
    </div>
  );
};

export default AddEditProductModal;
