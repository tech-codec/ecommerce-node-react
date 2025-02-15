import React from 'react';
import { extractUploads, truncateText } from '../../utils/truncateText';

const TopProducts = ({ products }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <div className="mt-6 p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Produits les Plus Vendus</h2>
      <div className="mt-4 flex justify-between">
        <span className="text-lg text-gray-900 dark:text-white font-bold">Produit</span>
        <span className="text-lg text-gray-900 dark:text-white font-bold">Ventes</span>
      </div>
      <ul className="mt-2 space-y-2">
        {products?.map((product) => (
          <li key={product._id} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={typeof product.images[0] === 'string'
                  ? apiUrl + extractUploads(product.images[0])
                  : product.images[0] instanceof File
                    ? URL.createObjectURL(product.images[0])
                    : "/uploads/images/no-image-product.jpg"}
                alt={product.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-gray-900 dark:text-white">
                {truncateText(product.name, 95)}
              </span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white">
              {product.sales}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopProducts;