import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail'
import ListProductSameCategorie from '../components/ListProductSameCategorie';
import { useSelector } from 'react-redux';

export default function Product() {
  const { productId } = useParams();
  const productState = useSelector(state => state.products)
  const {productsData} = productState


  const product = productsData?.find(p => p._id === productId);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (

    <div className='px-5p md:px-10p mt-10'>
      <ProductDetail product={product} />
      <h2 className='mt-4 lg:mt-7 mb-6 text-gray-900 text-2xl lg:text-3xl font-semibold'>Produits de la même catégorie</h2>
      <ListProductSameCategorie products={productsData} category={product.category}/>
    </div>
  );
}
