import { useTheme } from "../context/ThemeContext"
import user_image from "../assets/images/avatar_image.png"
import { LuDownload } from "react-icons/lu";
import { createRef, useState } from "react";

function UpdateProfil() {

  const { theme } = useTheme()
  const [fileName, setFIleName] = useState(null)

  const fileInputRef = createRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Faire quelque chose avec le fichier
      setFIleName(file.name)
      console.log(file.name);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full">
      <div className=' mb-8 flex items-center justify-between flex-wrap gap-2'>
        <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} `}>Paramètre du compte</h2>
        <h4 className='text-base'><span className='text-gray-500 cursor-pointer'>Tableau de bord / </span><span className='text-purple-700'>Paramètre du compte</span></h4>
      </div>

      <form className="flex-wrap-reverse 1400m:flex-nowrap flex  justify-between gap-10 ">
        <div className="w-full 1400m:w-2/3 bg-white rounded-xl shadow-sm p-10">

          <div className="flex items-center flex-wrap md:flex-nowrap justify-between gap-4 mb-4">
            <div className="w'full grow">
              <label htmlFor="lastName" className="block mb-3 font-semibold text-gray-700" >Nom</label>
              <input type="text" name="lastName" className="w-full py-3 px-2 border-none rounded-lg outline-none bg-gray-200" placeholder="Entrer votre Nom" id="firstName" />
            </div>
            <div className="w'full grow">
              <label htmlFor="firstName" className="block mb-3 font-semibold text-gray-700" >Prénom</label>
              <input type="text" name="firstName" className="w-full py-3 px-2 border-none rounded-lg outline-none bg-gray-200" placeholder="Entrer votre Prénom" id="firstName" />
            </div>

          </div>


          <div className="flex items-center flex-wrap md:flex-nowrap justify-between gap-4 mb-4">
            <div className="w'full grow">
              <label htmlFor="userName" className="block mb-3 font-semibold text-gray-700" >Nom d'utilisateur</label>
              <input type="text" name="userName" className="w-full py-3 px-2 border-none rounded-lg outline-none bg-gray-200" placeholder="Entrer votre Nom d'itulisateur" id="userName" />
            </div>
            <div className="w'full grow">
              <label htmlFor="email" className="block mb-3 font-semibold text-gray-700" >Email</label>
              <input type="email" name="email" className="w-full py-3 px-2 border-none rounded-lg outline-none bg-gray-200" placeholder="Entrer votre Email" id="email" />
            </div>

          </div>

          <div className="flex items-center flex-wrap md:flex-nowrap justify-between gap-4 mb-4">
            <div className="w'full grow">
              <label htmlFor="phoneNumber" className="block mb-3 font-semibold text-gray-700" >Numéro téléphone</label>
              <input type="tel" name="phoneNumber" className="w-full py-3 px-2 border-none rounded-lg outline-none bg-gray-200" placeholder="Entrer votre Numéro de téléphone" id="phoneNumber" />
            </div>
            <div className="w'full grow">
              <label htmlFor="firstName" className="block mb-3 font-semibold text-gray-700" >Prénom</label>
              <input type="text" name="firstName" className="w-full py-3 px-2 border-none rounded-lg outline-none bg-gray-200" placeholder="Entrer votre Prénom" id="firstName" />
            </div>

          </div>

          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="w'full grow">
              <label htmlFor="bio" className="block mb-3 font-semibold text-gray-700" >Votre Bio</label>
              <textarea type="text" cols={3} rows={5} name="bio" className="w-full py-3 px-2 border-none rounded-lg outline-none bg-gray-200" placeholder="Entrer votre bio" id="bio">

              </textarea>
            </div>

          </div>

          <div className=" flex justify-end flex-wrap gap-2">
            <button className="bg-gray-500  text-white px-4 py-2 mr-2 rounded-md" >Annuler</button>
            <button className="bg-blue-500  text-white px-4 py-2 rounded-md" >Enregistrer</button>
          </div>

        </div>

        <div className="w-full 1400m:w-1/3 bg-white h-96  rounded-xl shadow-sm p-10">
          <div className="flex items-center mb-4 ">
            <img src={user_image} className="w-16 h-16 rounded-full" alt="" />
            <span className="ml-2">jean augustin</span>
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

        </div>

      </form>
    </div>
  )
}

export default UpdateProfil