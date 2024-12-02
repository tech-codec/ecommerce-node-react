import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserRolesSelect from '../components/UserRolesSelect';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/authAction/auth.action';
import LoadingLoader from '../components/LoadingLoader'

function Register() {

  const auth = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roles: [],
    password: "",
    confirmPassword: ""
  })

  const { name, email, roles, password, confirmPassword } = formData

  const { error, success, loading } = auth

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRolesChange = (selectedRoles) => {
    setFormData({
      ...formData,
      roles: selectedRoles
    });
  };


  const onSumit = e => {
    e.preventDefault();
    console.log({ name, email, roles, password, confirmPassword })
    dispatch(register({ name, email, roles, password, confirmPassword }))
  }

  return (
    <div className='flex items-center justify-center md:h-screen my-3'>

      <div className='w-full mx-2 299bp:mx-8 md:w-550px bg-white py-8 md:p-8 my-5p'>
        {success?.message?.includes("Votre compte a été créé") &&
          <div className='px-3 md:px-8'>
            <div className='w-full text-white px-2 py-9 bg-green-500 flex items-center justify-center '>
              <span>{success.message}</span>
            </div>
          </div>
        }
        {
          loading &&
          <div className='px-3 md:px-8 flex items-center justify-center'>
            <LoadingLoader />
          </div>

        }
        <p className='text-center text-lg font-semibold text-gray-800 md:text-2xl'>Créer un compte</p>
        <form className="bg-white shadow-md rounded px-3 md:px-8 pt-6 pb-8 mb-4" onSubmit={onSumit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nom
            </label>
            <input type="text" value={name} name='name' onChange={handleChange} className={`shadow ${error?.name && "border-red-500"} border appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="name" placeholder="Entrez votre nom" />
            {error?.name != "" && <p className="text-red-500 text-xs italic">{error?.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input type="email" value={email} name='email' onChange={handleChange} className={`shadow ${error?.email && "border-red-500"} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="email" placeholder="Entrez votre email" />
            {error?.email != "" && <p className="text-red-500 text-xs italic">{error?.email}</p>}
          </div>

          <UserRolesSelect selectedRoles={roles} error={error} onChange={handleRolesChange} />

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Mot de passe
            </label>
            <input type="password" value={password} name='password' onChange={handleChange} className={`shadow ${error?.password && "border-red-500"} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="name" placeholder="Entrez le mot de passe" />
            {error?.password != "" && <p className="text-red-500 text-xs italic">{error?.password}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Confirmez le mot de passe
            </label>
            <input type="password" value={confirmPassword} name='confirmPassword' onChange={handleChange} className={`shadow ${error?.confirmPassword && "border-red-500"} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name`} placeholder="Entrez à nouveau le mot de passe" />
            {error?.confirmPassword != "" && <p className="text-red-500 text-xs italic">{error?.confirmPassword}</p>}
          </div>

          <div className="flex items-center">

            <label className="block text-gray-700 mb-4 text-sm font-bold" htmlFor="password">
              Avez-vous déjà un compte?
            </label>

            <Link to={'/signIn'}>
              <a className="inline-block align-baseline mb-4 font-bold text-sm text-blue-500 hover:text-blue-800 ml-2">
                Connectez-vous
              </a>
            </Link>

          </div>

          <div className="flex items-center mb-4">
            <input id="default-checkbox" type="checkbox" value="" className="hover:cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="default-checkbox" className="hover:cursor-pointer ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">{`j'accepte les conditions générales`}</label>
          </div>

          <div className='mb-6'>
            <button className="w-full bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>
              Créer mon compte
            </button>
          </div>

        </form>

      </div>

    </div>

  )
}

export default Register