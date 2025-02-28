import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/authAction/auth.action';
import LoadingLoader from '../LoadingLoader';
import { Link } from 'react-router-dom';
import { IoEyeOff, IoEye } from "react-icons/io5";
import Modal from 'react-modal'; // Importer React Modal

// Configuration de la modale
Modal.setAppElement('#root'); // Permet de définir l'élément root pour l'accessibilité

function LogSignIn() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { error, loading } = auth;

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false); // État pour vérifier l'acceptation des cookies
  const [modalIsOpen, setModalIsOpen] = useState(false); // État pour gérer l'ouverture de la modale

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (!cookiesAccepted) {
      // Ouvre la modale si les cookies ne sont pas acceptés
      setModalIsOpen(true);
      return; // Empêche l'envoi immédiat si les cookies ne sont pas acceptés
    }

    // Si les cookies sont déjà acceptés, procéder normalement
    dispatch(login({ email, password }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCookiesAcceptance = () => {
    setCookiesAccepted(true);
    setModalIsOpen(false); // Ferme la modale
    dispatch(login({ email, password })); // Continue avec la connexion
  };

  const handleCookiesRejection = () => {
    setModalIsOpen(false); // Ferme la modale
    alert("Vous devez accepter les cookies pour pouvoir vous connecter.");
  };

  return (
    <div className='w-full lg:w-9/12 xl:w-3/5 bg-white mx-auto py-8 md:p-8 my-5p'>
       {
      error?.error &&
        <div className='px-3 py-4 mx-3 mb-2 text-white text-base bg-red-600 md:px-8 text-center break-words max-w-full'>
          {error?.error}
        </div>
      }
      {
        loading &&
        <div className='px-3 md:px-8 flex items-center justify-center'>
          <LoadingLoader />
        </div>
      }

      {/* Formulaire de connexion */}
      <form className="bg-white shadow-md rounded px-3 md:px-8 md:pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input type="email" name='email' value={email} onChange={onChange} className={`shadow appearance-none border ${error?.error.includes("email") && 'border-red-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="email" placeholder="Entrez votre email" />
          {error?.error.includes("email") && <p className="text-red-500 text-xs italic">{error?.error}</p>}
        </div>
        <div className="mb-6">
          <div className='flex items-center justify-between'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mot de passe
            </label>

            <Link to={'/forgot-password'}>
              <span className="inline-block align-baseline font-bold text-sm mb-2 text-blue-500 hover:text-blue-800">
                Mot de passe oublié?
              </span>
            </Link>
          </div>

          <div className="relative">
            <input name='password' value={password} onChange={onChange} className={`shadow appearance-none border ${error?.error.includes("passe") && 'border-red-500'} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="password" type={showPassword ? "text" : "password"} placeholder="Entrez le mot de passe" />
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer" onClick={togglePasswordVisibility}>
              {showPassword ? <IoEyeOff className="text-xl" /> : <IoEye className="text-xl" />}
            </span>
          </div>
          {error?.error.includes("passe") && <p className="text-red-500 text-xs italic">{error?.error}</p>}
        </div>
        <div className='mb-6'>
          <button className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Se connecter
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-4">
            <input id="default-checkbox" type="checkbox" value="" className="hover:cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
            <label htmlFor="default-checkbox" className="hover:cursor-pointer ms-2 text-sm font-medium text-gray-900">Rester connecté(e)</label>
          </div>
          <Link to={'/signUp'}>
            <span className="inline-block align-baseline mb-4 font-bold text-sm text-blue-500 hover:text-blue-800">
              Créer un compte
            </span>
          </Link>
        </div>
      </form>
      <p className="text-center px-3 text-gray-500 text-xs">
        Accédez à votre compte sans avoir à vous authentifier pendant 30 jours.
      </p>

      {/* Modale pour l'acceptation des cookies */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Confirmation des cookies"
        className="bg-white p-5 rounded shadow-md max-w-lg mx-auto mt-20"
      >
        <h2 className="text-xl font-semibold mb-4">Activer les cookies pour continuer</h2>
        <p className="mb-4">Pour vous connecter, veuillez désactiver votre bloqueur de publicités ou autoriser les cookies et scripts nécessaires à l'authentification.</p>
        
        <p className="mb-4 text-sm text-gray-600">
          Si vous essayez d'accéder à ce site via un navigateur tel que WhatsApp, il se peut que l'accès soit restreint. Utilisez un navigateur normal comme <strong>Chrome</strong> pour une expérience optimale.
        </p>

        <div className="flex justify-around">
          <button
            className="bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded"
            onClick={handleCookiesAcceptance}
          >
            Accepter
          </button>
          <button
            className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded"
            onClick={handleCookiesRejection}
          >
            Annuler
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default LogSignIn;
