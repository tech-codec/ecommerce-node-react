import { LuDownload } from "react-icons/lu";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/userAction/user.action";
import { extractUploads } from "../../utils/help";

function UpdateProfil() {
    const auth = useSelector((state) => state.auth);
    const userState = useSelector((state) => state.user);
    const [userForm, setUserForm] = useState({
        _id: null,
        name: "",
        firstName: "",
        email: "",
        phoneNumber: "",
        bio: "",
        image: null,
    });
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
                firstName: user.firstName || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                bio: user.bio || "",
                image: user.image || null,
            });
        }
    }, [user]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUserForm((prevState) => ({
                ...prevState,
                image: file,
            }));
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleReset = () => {
        if (user) {
            setUserForm({
                _id: user._id || null,
                name: user.name || "",
                firstName: user.firstName || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                bio: user.bio || "",
                image: user.image || null,
            });
        }
    };

    const handleSave = () => {
        const userData = new FormData();
        userData.append("name", userForm.name);
        userData.append("firstName", userForm.firstName);
        userData.append("phoneNumber", userForm.phoneNumber);
        userData.append("email", userForm.email);
        userData.append("bio", userForm.bio);

        if (userForm.image instanceof File) {
            userData.append('image', userForm.image); // On ajoute l'image si c'est un fichier
        }
        dispatch(updateUser(user._id, userData));
    };

    return (
        <div className="w-full p-4 lg:p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Paramètre du compte</h2>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-2/3 bg-white p-4 lg:p-6 rounded-lg shadow">
                    <label className="block mb-2 font-semibold">Nom</label>
                    <input type="text" name="name" onChange={handleInputChange} value={userForm.name} className="w-full p-3 border rounded-lg mb-1" placeholder="Entrer votre Nom" />
                    {error?.name && <p className="text-red-500 text-xs italic mb-4">{error.name}</p>}

                    <label className="block mb-2 font-semibold">Prénom</label>
                    <input type="text" name="firstName" onChange={handleInputChange} value={userForm.firstName} className="w-full p-3 border rounded-lg mb-1" placeholder="Entrer votre Prénom" />
                    {error?.firstName && <p className="text-red-500 text-xs italic mb-4">{error.firstName}</p>}

                    <label className="block mb-2 font-semibold">Email</label>
                    <input type="email" name="email" onChange={handleInputChange} value={userForm.email} className="w-full p-3 border rounded-lg mb-1" placeholder="Entrer votre Email" />
                    {error?.email && <p className="text-red-500 text-xs italic mb-4">{error.email}</p>}

                    <label className="block mb-2 font-semibold">Numéro de téléphone</label>
                    <input type="tel" name="phoneNumber" onChange={handleInputChange} value={userForm.phoneNumber} className="w-full p-3 border rounded-lg mb-4" placeholder="Entrer votre Numéro de téléphone" />

                    <label className="block mb-2 font-semibold">Bio</label>
                    <textarea name="bio" onChange={handleInputChange} value={userForm.bio} className="w-full p-3 border rounded-lg mb-4" placeholder="Entrer votre bio"></textarea>

                    <div className="flex justify-end gap-2">
                        <button className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-md" onClick={handleReset}>Annuler</button>
                        <button className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-md" onClick={handleSave}>Enregistrer</button>
                    </div>
                </div>

                <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow">
                    <div className="flex flex-col items-center">
                        <img
                            src={userForm.image instanceof File ? URL.createObjectURL(userForm.image) : `${apiUrl}${extractUploads(user.image)}`}
                            className="w-24 h-24 rounded-full mb-4"
                            alt=""
                        />
                        <button onClick={handleButtonClick} className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-md flex items-center gap-2">
                            <LuDownload /> Télécharger une image
                        </button>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfil;
