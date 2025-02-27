import React, { useContext } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './ListProductSameCategorie.css'; // Ensure this is imported for custom styles
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { extractUploads } from '../../utils/help';
import { FaCartPlus, FaPlus } from 'react-icons/fa';

function ListProductSameCategorie({ products, category }) {
  const { addToCart } = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleOnClick = (product) => {
    console.log("merci pour le produit ajouter");
    addToCart(product);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5.25
    },
    desktop: {
      breakpoint: { max: 3000, min: 1500 },
      items: 4.25
    },
    laptop: {
      breakpoint: { max: 1500, min: 1024 },
      items: 3.25
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2.25, // Show 2.25 items
      partialVisibilityGutter: 15 // Adjust the gutter to your preference
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1.02, // Show 1.25 items
      partialVisibilityGutter: 15 // Adjust the gutter to your preference
    }
  };

  return (
    <div className="list-product-same-categorie-container mb-10">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px custom-carousel-item"
      >
        {products.filter(product => product.category._id === category._id).map((prd) => (
          <div key={prd._id} className="rounded-lg border bg-white py-4 px-4 shadow-lg transition-transform transform hover:scale-105">
            <Link to={`/product/${prd._id}`}>
              <img src={apiUrl + extractUploads(prd.images?.[0])} alt="" className="rounded-lg m-auto w-40 h-40 cursor-pointer hover:shadow-lg transition-shadow duration-200" />
            </Link>
            <Link to={`/product/${prd._id}`}>
              <div className="text-sm cursor-pointer text-gray-700 whitespace-normal mt-4 mb-8 text-center max-h-16 overflow-hidden overflow-ellipsis">
                {prd.description}
              </div>
            </Link>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-gray-400">
                  <span>Ancien prix:</span><span className="line-through"> {prd.old_price} €</span>
                </div>
                <span className="font-semibold text-lg text-gray-900">{prd.new_price} €</span>
              </div>
              <div className="w-12 cursor-pointer h-12 rounded-full bg-orange-500 hover:bg-orange-400 flex items-center justify-center relative" onClick={() => handleOnClick(prd)}>
                <div className="w-5 h-5">
                  <span className="text-xl text-white"><FaCartPlus /></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ListProductSameCategorie;