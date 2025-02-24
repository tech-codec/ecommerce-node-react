import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CreateCheckOutSuccess = () => {

  const { clearCart} = useContext(CartContext)
  return (
    <div className="flex items-center justify-center my-5p">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm">
        <h2 className="text-2xl font-semibold text-green-600">Paiement Réussi !</h2>
        <p className="text-gray-700 mt-2">Votre commande a été traitée avec succès.</p>
        <p className="text-gray-500 mt-1">Voulez-vous vider votre panier ?</p>

        <button
          onClick={() => clearCart()}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
        >
          Vider le panier
        </button>
      </div>
    </div>
  );
};

export default CreateCheckOutSuccess;
