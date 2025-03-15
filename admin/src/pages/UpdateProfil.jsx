import { useTheme } from "../context/ThemeContext"
import { LuDownload } from "react-icons/lu";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserRolesSelect from "../components/UserRolesSelect";
import { extractUploads } from "../utils/truncateText";
import { updateUser } from "../actions/userAction/user.action";

function UpdateProfil() {
  const { theme } = useTheme();
  const auth = useSelector(state => state.auth);
  const userState = useSelector(state => state.user);
  const [fileName, setFileName] = useState(null);
  const [userForm, setUserForm] = useState({ _id: null, name: '', firstName: "", email: '', phoneNumber: "", roles: [], bio: "", image: null });
  const { user } = auth;
  const dispatch = useDispatch();
  const { error } = userState;
  const fileInputRef = createRef();
  const apiUrl = import.meta.env.VITE_API_URL;
 

  useEffect(() => {
    if (user) {
      setUserForm({
        _id: user._id || null,
        name: user.name || "",
        firstName: user.firstName,
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        roles: Array.isArray(user.roles) ? user.roles.map(r => r._id) : [],
        bio: user.bio || "",
        image: user.image || null
      });
    }
  }, [user]);

  useEffect(() => {
    setUserForm(prevUser => ({
      ...prevUser,
      image: user.image
    }));
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserForm(prevState => ({
        ...prevState,
        image: file, // We store the file object here
      }));
      setFileName(file.name);
    }
  };

  const handleRolesChange = (roles) => {
    setUserForm((prevFormUser) => ({ ...prevFormUser, roles }));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleReset = () => {
    if (user) {
      setUserForm({
        _id: user._id || null,
        name: user.name || "",
        firstName: user.firstName,
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        roles: Array.isArray(user.roles) ? user.roles.map(r => r._id) : [],
        bio: user.bio || "",
        image: user.image || null
      });
    }
  };

  const handleSave = () => {
    const userData = new FormData();
    userData.append('name', userForm.name);
    userData.append('firstName', userForm.firstName);
    userData.append('phoneNumber', userForm.phoneNumber);
    userData.append('email', userForm.email);
    userData.append('bio', userForm.bio);
    userData.append('roles', JSON.stringify(userForm.roles));

    if (userForm.image instanceof File) {
      userData.append('image', userForm.image); // On ajoute l'image si c'est un fichier
    } else {
      userData.append('image', userForm.image);
    }
    dispatch(updateUser(user._id, userData));
  };

  return (
    <div className="w-full">
      <div className='mb-8 flex items-center justify-between flex-wrap gap-2'>
        <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Paramètre du compte</h2>
        <h4 className='text-base'><span className='text-gray-500 cursor-pointer'>Tableau de bord / </span><span className='text-purple-700'>Paramètre du compte</span></h4>
      </div>

      <div className="flex-wrap-reverse 1400m:flex-nowrap flex justify-between gap-10">
        <div className={`w-full 1400m:w-2/3 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} rounded-xl shadow-sm p-10`}>
          <input name="_id" className="hidden" />
          <div className="flex items-center flex-wrap md:flex-nowrap justify-between gap-4 mb-4">
            <div className="w'full grow">
              <label htmlFor="name" className="block mb-3 font-semibold">Nom</label>
              <input type="text" onChange={handleInputChange} value={userForm.name} name="name" className={`border py-3 px-2 w-full rounded-md ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} ${error?.name && 'border-red-500'}`} placeholder="Entrer votre Nom" id="name" />
              {error?.name && <p className="text-red-500 text-xs italic">{error.name}</p>}
            </div>
            <div className="w'full grow">
              <label htmlFor="firstName" className="block mb-3 font-semibold">Prénom</label>
              <input type="text" onChange={handleInputChange} value={userForm.firstName} name="firstName" className={`border py-3 px-2 w-full rounded-md ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} ${error?.firstName && 'border-red-500'}`} placeholder="Entrer votre Prénom" id="firstName" />
              {error?.firstName && <p className="text-red-500 text-xs italic">{error.firstName}</p>}
            </div>
          </div>

          <div className="flex items-center flex-wrap md:flex-nowrap justify-between gap-4 mb-4">
            <div className="w'full grow">
              <label htmlFor="email" className="block mb-3 font-semibold">Email</label>
              <input type="email" onChange={handleInputChange} value={userForm.email} name="email" className={`border py-3 px-2 w-full rounded-md ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} ${error?.email && 'border-red-500'}`} placeholder="Entrer votre Email" id="email" />
              {error?.email && <p className="text-red-500 text-xs italic">{error.email}</p>}
            </div>

            <div className="w'full grow">
              <label htmlFor="phoneNumber" className="block mb-3 font-semibold">Numéro téléphone</label>
              <input type="tel" onChange={handleInputChange} value={userForm.phoneNumber} name="phoneNumber" className={`w-full py-3 px-2 border-none rounded-lg outline-none ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`} placeholder="Entrer votre Numéro de téléphone" id="phoneNumber" />
            </div>
          </div>

          <div className="mb-2 400m:mb-4">
            <UserRolesSelect
              selectedRoles={userForm.roles}
              onChange={handleRolesChange}
            />
          </div>
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="w'full grow">
              <label htmlFor="bio" className="block mb-3 font-semibold">Votre Bio</label>
              <textarea type="text" onChange={handleInputChange} value={userForm.bio} cols={3} rows={3} name="bio" className={`w-full py-3 px-2 border-none rounded-lg outline-none ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`} placeholder="Entrer votre bio" id="bio"></textarea>
            </div>
          </div>

          <div className="flex justify-end flex-wrap gap-2">
            <button className="bg-gray-500 text-white px-4 py-2 mr-2 rounded-md" onClick={handleReset}>Annuler</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSave}>Enregistrer</button>
          </div>
        </div>

        <div className={`w-full 1400m:w-1/3 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} h-96 rounded-xl shadow-sm p-10`}>
          <div className="flex items-center mb-4">
            <img
              src={typeof userForm.image === 'string' ? apiUrl + extractUploads(userForm.image) : userForm.image instanceof File ? URL.createObjectURL(userForm.image) : apiUrl + extractUploads(user.image)}
              className="w-16 h-16 rounded-full"
              alt=""
            />
            <span className="ml-2">{userForm.name + " " + userForm.firstName}</span>
          </div>

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
      </div>
    </div>
  );
}

export default UpdateProfil;