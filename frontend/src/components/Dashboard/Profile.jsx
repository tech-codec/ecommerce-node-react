import { useDispatch, useSelector } from 'react-redux';
import { extractUploads } from '../../utils/help';
import { useEffect, useState } from 'react';
import { loadUser } from '../../actions/authAction/auth.action';
import LoadingLoader from "../LoadingLoader";


function Profile() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth);
  const { user, loading } = auth;

  const [userProfile, setUserProfile] = useState({ _id: null,
    name: "",
    firstName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    roles:[],
    image: null,})

   useEffect(() => {
      dispatch(loadUser());
    }, [dispatch]);

    useEffect(() => {
      setUserProfile(user);
    }, [user]);

  return (

    loading ? (
      <div className='px-3 md:px-8 flex items-center flex-col justify-center h-screen'>
        <LoadingLoader />
        <p className='text-xl text-gray-500 text-center mt-3'>Patientez quelques minutes le temps que les données chargent</p>
      </div>
    ) :(
      <div className='w-full p-2 md:p-6 rounded-lg shadow-md bg-gray-100'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Votre profil</h2>

      <div className='flex flex-col items-center text-center '>
        <div className='p-6 mb-4 bg-white shadow-lg rounded-2xl border flex flex-col items-center w-full max-w-md'>
          <img className='w-36 h-36 rounded-full border border-gray-300' 
               src={`${apiUrl}${extractUploads(userProfile?.image)}`} 
               alt='Profil' />
          <div className='text-gray-700 font-semibold text-lg mt-4'>{`${userProfile?.name} ${userProfile?.firstName !== undefined? userProfile?.firstName:""}`}</div>
        </div>

        <div className='w-full max-w-md text-gray-700 text-base space-y-4'>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-semibold'>Email :</span>
            <span>{userProfile?.email}</span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-semibold'>Téléphone :</span>
            <span>{userProfile?.phoneNumber}</span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-semibold'>Nom d'utilisateur :</span>
            <span>{userProfile?.name}</span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-semibold'>Rôle(s) :</span>
            <span>{userProfile?.roles?.map(r => r.name).join(', ')}</span>
          </div>
          <div className='pt-4'>
            <span className='font-semibold'>Bio :</span>
            <div className='mt-2 bg-gray-100 rounded-2xl shadow-md p-4 text-center'>
              {userProfile?.bio || "Aucune bio disponible."}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
    
  );
}

export default Profile;
