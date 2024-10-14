import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ProductAndCategoryContext } from '../context/ProductAndCategoryContext';
import ProductDetail from '../components/ProductDetail'
import ListProductSameCategorie from '../components/ListProductSameCategorie';

export default function Product() {
  const { productId } = useParams();
  const {allProductContext} = useContext(ProductAndCategoryContext)

  const product = allProductContext.find(p => p.id === parseInt(productId));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (

    <div className='px-5p md:px-10p mt-10'>
      <ProductDetail product={product} />
      <h2 className='mt-4 mb-6 text-gray-900 text-xl font-semibold'>Produits de la même catégorie</h2>
      <ListProductSameCategorie products={allProductContext} category={product.category}/>
    </div>
  );
}
