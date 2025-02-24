import { useSelector } from 'react-redux';
import { extractUploads } from '../../utils/help';


function Profile() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const auth = useSelector(state => state.auth);
  const { user } = auth;

  return (
    <div className='w-full p-2 md:p-6 rounded-lg shadow-md bg-gray-100'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Votre profil</h2>

      <div className='flex flex-col items-center text-center '>
        <div className='p-6 mb-4 bg-white shadow-lg rounded-2xl border flex flex-col items-center w-full max-w-md'>
          <img className='w-36 h-36 rounded-full border border-gray-300' 
               src={`${apiUrl}${extractUploads(user.image)}`} 
               alt='Profil' />
          <div className='text-gray-700 font-semibold text-lg mt-4'>{`${user.name} ${user.firstName !== undefined? user.firstName:""}`}</div>
        </div>

        <div className='w-full max-w-md text-gray-700 text-base space-y-4'>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-semibold'>Email :</span>
            <span>{user.email}</span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-semibold'>Téléphone :</span>
            <span>{user.phoneNumber}</span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-semibold'>Nom d'utilisateur :</span>
            <span>{user.name}</span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-semibold'>Rôle(s) :</span>
            <span>{user.roles.map(r => r.name).join(', ')}</span>
          </div>
          <div className='pt-4'>
            <span className='font-semibold'>Bio :</span>
            <div className='mt-2 bg-gray-100 rounded-2xl shadow-md p-4 text-center'>
              {user.bio || "Aucune bio disponible."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
