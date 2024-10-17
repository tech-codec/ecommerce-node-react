import React from 'react'
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';


function ProductDetail({ product }) {

    const { addToCart } = useCart();

    const hanleonclick = (product) => {
        console.log("merci pour le produit ajouter")
        addToCart(product)
    }

    return (
        <div className='flex-wrap  banner_890:flex-nowrap flex justify-between gap-10'>
            <img src={product.image} alt={product.image} className='w-full banner_890:w-40p visible_filter:w-30p h-96' />
            <div className='w-full banner_890:w-59p visible_filter:w-69p flex flex-col'>

                <div className='flex justify-between mb-2'>
                    <h3 className='text-2xl banner_890:text-3xl font-semibold text-gray-800'>{product.name}</h3>
                    <Link to={"/cart"}>
                        <button className='w-40 banner_890:w-48  wd-wrap:w-96 shadow-lg bg-orange-600 flex items-center justify-center hover:bg-orange-700 text-white py-2 rounded-2xl' onClick={() => hanleonclick(product)}>
                            <span className='text-lg banner_890:text-xl md-wrap:text-xl'>Mon panier</span>
                        </button>
                    </Link>
                </div>

                <div className='mb-2'>
                    <span className='text-gray-500 text-sm block'>Prix de référence:</span>
                    <span className='text-gray-500 line-through text-sm block'> {product.old_price.toFixed(2)} FCFA </span>
                    <h3 className='text-gray-800 text-2xl banner_890:text-3xl font-semibold '> {product.new_price.toFixed(2)} FCFA </h3>
                </div>
                <div className='mb-2'>
                    <h2 className='text-gray-800 font-semibold text-xl'> description: </h2>
                    <div className="text-lg cursor-pointer text-gray-700 whitespace-normal mt-2 w-fullw-auto mb-8 banner_890:max-h-20 overflow-hidden overflow-ellipsis">
                        {product.description}
                    </div>
                </div>
                <button className='w-59p banner_890:w-40p  wd-wrap:w-30p shadow-lg bg-orange-600 flex items-center justify-center hover:bg-orange-700 text-white py-2 rounded-2xl mb-6 mt-4 banner_890:mt-28' onClick={() => hanleonclick(product)}>
                    <span className='text-lg md-wrap:text-xl'>Ajouter au panier</span>
                </button>
            </div>
        </div>
    )
}

export default ProductDetail