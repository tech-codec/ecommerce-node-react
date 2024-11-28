import React, { useState, useEffect, createRef } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import UserRolesSelect from '../../UserRolesSelect';
import { LuDownload } from 'react-icons/lu';
import { truncateText } from '../../../utils/truncateText';
import useWindowSize from '../../../utils/useWindwosSize';

const AddEditCategoryModal = ({ show, category, onSave, onClose }) => {
  const [formCategory, setFormCategory] = useState({ id: null, name: '', image:null, listMotCle: [] });

  const { theme } = useTheme()
  const [fileName, setFileName] = useState(null)
  const [newMotCle, setNewMotCle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [motClePerPage, setMotClePerPage] = useState(3);
  const { width, height } = useWindowSize();
  const fileInputRef = createRef();

  const truncaTextMocle = (motCle) => {
    if (width < 768) {
      return truncateText(motCle + "", 15)
    } else {
      return motCle
    }
  };

  const lenghttMocle = () => {
    if (width < 768) {
      setMotClePerPage(1)
    } else {
      setMotClePerPage(3)
    }
  };

  useEffect(() => {
    truncaTextMocle()
    lenghttMocle();
  }, [width, height]);

  useEffect(() => {
    if (category) {
      setFormCategory({
        id: category.id,
        name: category.name,
        image: category.image,
        listMotCle: category.listMotCle || []
      });
      setCurrentPage(1); // Reset pagination when a new category is loaded
    } else {
      setFormCategory({ id: null, name: '', image:null, listMotCle: [] });
      setCurrentPage(1); // Reset pagination when a new category is loaded
    }
  }, [category]);


  const handleAddMotCle = () => {
    if (newMotCle && !formCategory.listMotCle.includes(newMotCle)) {
      setFormCategory(prevState => ({
        ...prevState,
        listMotCle: [...prevState.listMotCle, newMotCle],
      }));
      setNewMotCle('');
      setCurrentPage(Math.ceil((formCategory.listMotCle.length + 1) / motClePerPage));
    }
  };

  const handleRemoveMotCle = (motCle) => {
    setFormCategory(prevState => ({
      ...prevState,
      listMotCle: prevState.listMotCle.filter(m => m !== motCle),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormCategory({ ...formCategory, [name]: value });
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImage = URL.createObjectURL(file);
      setFormCategory(prevState => ({
        ...prevState,
        image: newImage,
      }));
      setFileName(file.name);
    }
  };

  const handleRemoveImage = () => {
    setFormCategory(prevState => ({
      ...prevState,
      image: null,
    }));
    setFileName(null);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // const handleRolesChange = (roles) => {
  //   setFormUser((prevFormUser) => ({ ...prevFormUser, roles }));
  // };


  const handleSubmit = () => {
    onSave(formCategory);
  };




  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     // Faire quelque chose avec le fichier
  //     setFIleName(file.name)
  //     console.log(file.name);
  //   }
  // };


  if (!show) return null;


  // Pagination logic for mot-cle list
  const indexOfLastMotCle = currentPage * motClePerPage;
  const indexOfFirstMotCle = indexOfLastMotCle - motClePerPage;
  const currentMotCle = formCategory.listMotCle?.slice(indexOfFirstMotCle, indexOfLastMotCle);

  const totalPages = Math.ceil(formCategory.listMotCle?.length / motClePerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-5">
      <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} w-full sm:w-3/5 z-50 400m:p-4 rounded`}>
        <h2 className={`mb-4 hidden 400m:block ${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-semibold`}>{formCategory.id ? 'Editer la catégorie' : 'Ajouter une catégorie'}</h2>

        <form className="flex-wrap-reverse 1400m:flex-nowrap flex z-50    justify-between ">
          <div className="w-full 1400m:w-2/3 bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w'full grow">
                <label htmlFor='name' className="block mb-3 font-semibold text-gray-700" >Nom de la catégorie</label>
                <input type="text" value={formCategory.name} onChange={handleInputChange} name="name" className="w-full py-3 px-2 border-none rounded-lg outline-none bg-gray-200" placeholder="Entrer le nom" id="name" />
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

            <div className="mb-4">
              <label className="block mb-1">Mots-Clés</label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={newMotCle}
                  onChange={(e) => setNewMotCle(e.target.value)}
                  className="w-full py-3 px-2 border-none rounded-lg outline-none bg-gray-200"
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
                  disabled={currentPage === 1}
                >
                  Précédent
                </div>
                <div
                  onClick={nextPage}
                  className={`px-3 py-1 cursor-pointer rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                  disabled={currentPage === totalPages}
                >
                  Suivant
                </div>
              </div>

            </div>


            <div className=" flex items-center justify-center 1400m:justify-end 1400m:flex-wrap pt-3 gap-2">
              <button className="bg-gray-500  text-white px-4 py-2 mr-2 rounded-md" onClick={onClose} >Annuler</button>
              <button className="bg-blue-500  text-white px-4 py-2 rounded-md" onClick={handleSubmit} >Enregistrer</button>
            </div>

          </div>

          <div className="w-full hidden 1400m:block 1400m:w-1/3 bg-white h-96  rounded-xl shadow-sm p-5">

            <div className="flex items-center mb-4 ">
              {formCategory.image && (
                <img
                  src={formCategory.image}
                  alt="Catégorie"
                  className="max-w-full max-h-full object-cover"
                />
              )}
            </div>


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
            </div>

            {formCategory.image && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Supprimer l'image
              </button>
            )}

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

export default AddEditCategoryModal;
