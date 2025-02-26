import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../actions/authAction/auth.action'
import { Link } from 'react-router-dom'
import LoadingLoader from '../LoadingLoader'

const LogForgotPassword = () => {

    const [formData, setFormData] = useState({
        email: ""
    })



    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const { email } = formData

    const auth = useSelector(state => state.auth)

    const {error, loading} = auth
    

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(forgotPassword({ email }))
    }

    return (
        <div className='w-full flex items-center py-8 justify-center my-5p' onSubmit={onSubmit}>

            <form className='w-full md-wrap:w-1/2 bg-white py-5 px-5'>
                {
                loading &&
                    <div className='flex mb-2 w-full items-center justify-center font-semibold text-lg'>
                        <LoadingLoader />
                    </div>

                }
                <div className='flex w-full items-center justify-center font-semibold text-lg text-gray-500 mb-5'>
                    <p>Saisissez votre adresse email pour réinitialiser votre mot de passe.</p>
                </div>
                <div className='w-full mb-5'>
                    <input name='email' type='email' value={email} onChange={onChange} className={`w-full bg-gray-300 text-gray-500 border ${error?.error?.includes("L'utilisateur avec cet") && "border-red-500"} mb-1  py-3 px-3 text-lg shadow-lg outline-none rounded-3xl`} placeholder='Entrez votre email' />
                    {error?.error?.includes("L'utilisateur avec cet") && <p className="text-red-500 text-xs italic">{error.error}</p>}
                </div>
                <div className='w-full text-white font-semibold items-center justify-center flex'>
                    <Link to={"/signIn"}>
                        <button className='py-2 px-4 shadow-lg mr-3 bg-orange-500 hover:bg-orange-400 rounded-3xl'>
                            Se connecter
                        </button>
                    </Link>

                    <button type='submit' className='py-2 px-4 bg-orange-500 hover:bg-orange-400 shadow-lg rounded-3xl'>
                        Envoyer
                    </button>
                </div>
            </form>

        </div>
    )
}

export default LogForgotPassword