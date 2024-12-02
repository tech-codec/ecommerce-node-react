import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../utils/axiosConfig';

const ActivateAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
 

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
        setMessage(error.response.data.error);
        toast.error(error.response.data.error);
        console.log('erreur activation: '+error)
      }
    };
    activateAccount();
  }, [token, navigate]);

  return (
    <div className="activation-page">
      <h1>{message}</h1>
    </div>
  );
};

export default ActivateAccount;
