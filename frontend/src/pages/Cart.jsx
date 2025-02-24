// src/Cart.js
//import { useCart } from '../context/CartContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { extractUploads } from '../utils/help';
import { useSelector } from 'react-redux';
import PayementButton from '../components/PayementButton';


const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useContext(CartContext)
  const apiUrl = import.meta.env.VITE_API_URL;
  const authState = useSelector(state => state.auth)
  const {isAuthenticated} = authState
  
  

  return (
    <div className="px-5p md:px-10p mt-5 mb-6">
      <div className='flex justify-between w-full gap-4 mb-6'>

        <div className='flex flex-col w-full cart-wrap:w-74p bg-white pt-6 px-5 pb-7'>
          <div className='border-b border-gray-300'>
            <h2 className='text-xl list_p_1406:text-2xl font-bold mb-4'> Votre panier</h2>
          </div>
          <div>
            {cart.map(item => {
              return (
                <div key={item._id} className='flex w-full mb-6 pb-5 gap-1 bg-white py-3 mt-2 border-b border-gray-200'>
                  <Link to={`/product/${item._id}`}>
                    <img src={apiUrl + extractUploads(item?.images[0])} alt={item.name} className='w-20 h-20 cart-img-360:w-28 cart-img-360:h-28 md:w-52 md:h-52' />
                  </Link>

                  <div className='w-full'>

                    <div className='flex justify-between gap-1 mb-3'>
                      <Link to={`/product/${item._id}`}>
                        <h3 className='text-xs grow md:text-sm list_p_1406:text-lg font-semibold text-gray-800'> {item.name} </h3>
                      </Link>
                      <p className='text-sm md:w-52 md:text-lg list_p_1406:text-xl font-semibold'> {item.new_price.toFixed(2)} €</p>
                    </div>

                    <div className='bg-gray-300 py-1 cart-img-360:py-2 px-2 w-20 md:w-28 rounded-xl mb-6'>
                      <p className='text-xs md:text-sm text-gray-700'>Quantité:</p>

                      <div className="flex items-center text-sm md:text-lg">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="px-2  bg-gray-300 rounded"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="px-2  bg-gray-300 rounded"
                        >
                          +
                        </button>
                      </div>

                    </div>

                    <div className='cursor-pointer text-xs md:text-sm'>
                      <span className='text-blue-600 hover:text-blue-900 hover:underline mr-2' onClick={() => removeFromCart(item._id)}>supprimer</span>
                      <Link to={`/product/${item._id}`}>
                        <span className='text-blue-600 hover:text-blue-900 hover:underline'>Afficher</span>
                      </Link>
                    </div>

                  </div>
                </div>
              )
            })}
          </div>

          <div className='hidden md:flex items-center justify-between font-semibold'>
            <button className='bg-orange-500 hover:bg-orange-400 py-2 px-4 md:px-6 rounded-3xl text-white text-xs md:text-sm list_p_1406:text-lg mt-2' onClick={() => clearCart()}>
              Vider le panier
            </button>

            <h1 className='text-sm text-end md:text-lg tlist_p_1406:ext-xl'> sous-total(<span>{getTotalItems()}</span>): <span>{getTotalPrice().toFixed(2)}</span> €</h1>


          </div>


          {/****vider le panier mobile */}
          <div className='font-semibold block md:hidden'>

            <div className='flex items-center text-sm md:text-lg justify-between'>
              <h1 className='list_p_1406:ext-xl'> sous-total(<span>{getTotalItems()}</span>): </h1>
              <h1 className='tlist_p_1406:ext-xl'> <span>{getTotalPrice().toFixed(2)}</span> €</h1>
            </div>

            <button className='bg-orange-500 hover:bg-orange-400 py-2 px-4 md:px-6 rounded-3xl text-white text-sm md:text-lg mt-2 w-full' onClick={() => clearCart()}>
              Vider le panier
            </button>

          </div>

        </div>

        <div className=' hidden cart-wrap:w-25p cart-wrap:block '>
          <div className='bg-white pt-3 pb-6 px-4'>
            <div className='flex  text-sm list_p_1406:text-base items-center justify-between border-b border-gray-200 p-3'>
              <p> Produits (<span>{getTotalItems()}</span>)</p>
              <p> <span>{getTotalPrice().toFixed(2)}</span> €</p>
            </div>
            <div className='flex text-lg list_p_1406:text-xl font-semibold items-center justify-between border-b border-gray-200 p-3'>
              <p> Total :</p>
              <p> <span>{getTotalPrice().toFixed(2)}</span> €</p>
            </div>
            <div className='w-full font-semibold border-b border-gray-200 p-3'>
              <PayementButton cartItems={cart} totalItems={getTotalItems()} />
            </div>
          </div>

        </div>
      </div>

      <div className='w-full cart-wrap:w-74p  bg-white p-9 '></div>

      <div className='font-semibold bg-white w-full fixed left-0 z-40 bottom-0 p-2  block cart-wrap:hidden'>

        <div className='flex items-center text-sm md:text-lg justify-between'>
          <h1 className='list_p_1406:ext-xl'> sous-total(<span>{getTotalItems()}</span>): </h1>
          <h1 className='tlist_p_1406:ext-xl'> <span>{getTotalPrice().toFixed(2)}</span> €</h1>
        </div>

        <PayementButton cartItems={cart} totalItems={getTotalItems()} />

      </div>


    </div>
  );
};

export default Cart;
