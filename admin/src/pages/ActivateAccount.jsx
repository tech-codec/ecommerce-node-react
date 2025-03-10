import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../utils/axiosConfig';
import { useTheme } from '../context/ThemeContext';
import ThemeToggleButton from '../components/ThemeToggleButton';
const ActivateAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const { theme } = useTheme();
 

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axios.get(`/auth/activate/${token}`);
        setMessage(response.data.message);
        toast.success(response.data.message);
        console.log("mon token 2 : "+ token)
        // Redirection vers la page de connexion après une activation réussie
        navigate('/login');
      } catch (error) {
        setMessage("Erreur lors de l'activation du compte.");
        toast.error("Le token est invalide");
        console.log('erreur activation: '+error)
      }
    };
    activateAccount();
  }, [token, navigate]);

  return (

    <div className={`w-full flex flex-col px-4 items-center h-screen justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}`}>
     <div className="flex justify-end mb-4">
        <ThemeToggleButton />
      </div>
     <div className="flex items-center justify-center my-5p">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Activation de compte</h1>
        <p>{message}</p>
      </div>
    </div>
    </div>
    
  );
};

export default ActivateAccount;
