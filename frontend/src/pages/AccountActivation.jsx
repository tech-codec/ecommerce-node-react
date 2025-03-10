import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "../utils/axiosConfig"
import { toast } from 'react-toastify';

const AccountActivation = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axios.get(`/auth/activate/${token}`);
        setMessage(response.data.message);
        toast.success(response.data.message)
        navigate('/signIn');
      } catch (error) {
        setMessage('Erreur lors de l\'activation du compte.');
        toast.error('Le token est invalide');
      }
    };

    activateAccount();
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center my-5p">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Activation de compte</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default AccountActivation;