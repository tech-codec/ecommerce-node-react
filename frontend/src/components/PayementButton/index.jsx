import React from 'react'

import axios from "../../utils/axiosConfig"
import { useSelector } from 'react-redux'

const PayementButton = ({cartItems, totalItems}) => {
    const authState = useSelector(state => state.auth)
    const {user,isAuthenticated } = authState

    const handlePayement = async ()=>{

        const config = {
            headers:{
                'content-type' : 'application/json'
            }
        }

        console.log("mon user: ", user)

        const userId = user?._id

        try{

            if(userId || isAuthenticated){
                const res = await axios.post(`/stripe/create-checkout-session`, {cartItems, userId, totalItems}, config)
                if(res.data.url){
                    window.location.href = res.data.url   
                }
            }else{
                window.location.href = '/signIn'
            }
               
        }catch(error){
            console.log("l'erreur lors du payement: ", error)
        }

    }

    return (
        <button onClick={handlePayement} className='bg-orange-500 py-2 px-4 md:px-6 rounded-3xl hover:bg-orange-400 text-white text-sm md:text-lg mt-3  w-full'>
          Valider mon panier
        </button>
    )
}

export default PayementButton