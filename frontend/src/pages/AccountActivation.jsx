import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AccountActivation = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axios.get(`${apiUrl}/auth/activate/${token}`);
        setMessage(response.data.message);
        // Rediriger vers la page de login après 3 secondes
        setTimeout(() => {
          navigate('/signIn');
        }, 3000);
      } catch (error) {
        setMessage(error.response.data.error || 'Erreur lors de l\'activation du compte.');
      }
    };

    activateAccount();
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Activation de compte</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default AccountActivation;