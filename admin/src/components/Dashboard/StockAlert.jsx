import React from 'react';
import { extractUploads, truncateText } from '../../utils/truncateText';

const StockAlert = ({ products }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <div className="mt-6 p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Alertes de Stock</h2>
      <ul className="mt-4 space-y-2">
        {products?.map((product) => (
          <li key={product._id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm">
            <div className="flex items-center space-x-2">
              <img
                src={typeof product.images[0] === 'string'
                  ? apiUrl + extractUploads(product.images[0])
                  : product.images[0] instanceof File
                    ? URL.createObjectURL(product.images[0])
                    : "/uploads/images/no-image-product.jpg"}
                alt={product.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{truncateText(product.name, 95)}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Stock: {product.stock}
                </p>
              </div>
            </div>
            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${product.stock < 5 ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
              {product.stock < 5 ? "Rupture" : "Stock Faible"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockAlert;