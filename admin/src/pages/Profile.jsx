import avatar_image from '../assets/images/avatar_image.png'
import { useTheme } from '../context/ThemeContext'


function Profile() {

  const { theme } = useTheme()


  return (

    <div className='w-full'>
      <div className=' mb-8 flex items-center justify-between flex-wrap gap-2'>
        <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} `}>Votre profile</h2>
        <h4 className='text-base'><span className='text-gray-500 cursor-pointer'>Tableau de bord / </span><span className='text-purple-700'>Prolfile</span></h4>
      </div>
      <div className='flex items-center justify-center'>
        <div className="py-10 px-10 flex flex-col ">
          <div className={`p-4 mb-4 ${theme === 'dark' ? "bg-gray-700  border-gray-700" : "bg-white border-white"} shadow-2xl rounded-2xl border  flex flex-col items-center justify-center`}>
            <img className='w-36 h-36 rounded-full' src={avatar_image} alt="" />
            <div className='text-gray-500 font-semibold text-lg'><span>Emegni limogne varus</span></div>
          </div>
          <div className='flex items-center justify-start text-gray-500 text-base gap-4'>
            <span className='font-semibold'>Email : </span>
            <span>varus@gmail.com</span>
          </div>

          <div className='flex items-center text-gray-500 text-base gap-4'>
            <span className='font-semibold'>téléphone: </span>
            <span>+2376764523</span>
          </div>

          <div className='flex items-center text-gray-500 text-base gap-4'>
            <span className='font-semibold'>Nom d'utilisatuer: </span>
            <span>Jean</span>
          </div>

          <div className='flex items-center text-gray-500 text-base gap-4'>
            <span className='font-semibold'>Rôle(s): </span>
            <span>Admin</span>
          </div>

          <div className='flex  flex-col text-gray-500 text-base gap-1'>
            <span className='font-semibold'>Bio: </span>
            <div className={`sm:w-80 ${theme === 'dark' ? "bg-gray-700  border-gray-700" : "bg-white border-white"} rounded-2xl shadow-2xl border p-4 flex items-center justify-center`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet.
            </div>

          </div>
        </div>
      </div>

    </div>




  )
}

export default Profile