import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '../context/ThemeContext'
import { extractUploads } from '../utils/truncateText'
import { useEffect, useState } from 'react'
import { loadUser } from '../actions/authAction/auth.action'
import LoadingLoader from "../components/LoadingLoader";

function Profile() {
  const { theme } = useTheme()
  const apiUrl = import.meta.env.VITE_API_URL
  const dispatch = useDispatch();
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
        <p className='text-xl text-gray-500 text-center mt-3'>patienté quelques minutes le temps que les données chargent</p>
      </div>
    ) : (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between flex-wrap gap-2">
        <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Votre profil
        </h2>
        <h4 className="text-base">
          <span className="text-gray-500 cursor-pointer">Tableau de bord / </span>
          <span className="text-purple-700">Profil</span>
        </h4>
      </div>

      <div className="flex items-center justify-center">
        <div className="py-10 px-10 flex flex-col w-full max-w-3xl">
          <div className={`p-4 mb-6 ${theme === 'dark' ? 'bg-gray-700 border-gray-700' : 'bg-white border-white'} shadow-2xl rounded-2xl border flex flex-col items-center justify-center`}>
            <img
              className="w-40 h-40 rounded-full mb-4 transition-all hover:scale-105 cursor-pointer"
              src={`${apiUrl}${extractUploads(userProfile?.image)}`}
              alt="Profile"
            />
            <div className="text-gray-500 font-semibold text-lg">
              <span>{`${userProfile?.name} ${userProfile?.firstName}`}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-gray-500 pt-4 text-base gap-4">
            <span className="font-semibold">Email :</span>
            <span>{userProfile?.email}</span>
          </div>

          <div className="flex items-center justify-between text-gray-500 pt-4 text-base gap-4">
            <span className="font-semibold">Téléphone :</span>
            <span>{userProfile?.phoneNumber}</span>
          </div>

          <div className="flex items-center justify-between text-gray-500 pt-4 text-base gap-4">
            <span className="font-semibold">Nom utilisateur :</span>
            <span>{userProfile?.name}</span>
          </div>

          <div className="flex items-center justify-between text-gray-500 pt-4 text-base gap-4">
            <span className="font-semibold">Rôle(s) :</span>
            <div className="flex gap-2">
              {userProfile?.roles?.map(r => (
                <span key={r.name} className="bg-purple-100 text-purple-700 py-1 px-3 rounded-full text-sm">
                  {r.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col text-gray-500 text-base pt-4 gap-1 items-center justify-center">
            <span className="font-semibold ">Bio :</span>
            <div className={`text-center ${theme === 'dark' ? 'bg-gray-700 border-gray-700' : 'bg-white border-white'} rounded-2xl shadow-2xl border p-4`}>
              {userProfile?.bio || <span className="italic text-gray-400">Complétez votre bio...</span>}
            </div>
          </div>

        </div>
      </div>
    </div>)
  )
}

export default Profile
