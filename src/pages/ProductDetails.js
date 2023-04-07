import { useLoaderData } from 'react-router-dom';

import ProductDetails from '../components/Products/ProductDetails/ProductDetails';

import { getSingleProduct } from '../lib/api';

function ProductDetailsPage() {
  const productData = useLoaderData();

  return <ProductDetails product={productData} />;
}
export default ProductDetailsPage;

export async function loader({ request, params }) {
  const product = await getSingleProduct(params.productId);

  return product;
}
