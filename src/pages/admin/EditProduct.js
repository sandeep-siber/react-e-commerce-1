import {
  useLoaderData,
  useRouteLoaderData,
  useNavigate,
} from 'react-router-dom';
import { findProduct, updateProduct } from '../../lib/api';

import useHttp from '../../hooks/useHttp';

import ProductForm from '../../components/Products/ProductForm';
import PageHeading from '../../components/UI/PageHeading';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Button';

function EditProductPage() {
  const loadedCategories = useRouteLoaderData('loaded-categories');
  const foundProduct = useLoaderData();

  const navigate = useNavigate();

  const {
    sendRequest: updateProductData,
    status,
    data: result,
    error,
  } = useHttp(updateProduct, false);

  function updateProductHandler(productData) {
    const updatedProduct = {
      productId: foundProduct.productId,
      ...productData,
    };
    updateProductData(updatedProduct);
  }

  function closeHandler() {
    navigate('/admin/collections/all', { replace: true });
  }

  let message;
  if (status === 'pending') {
    message = <p>Updating Product...</p>;
  }
  if (status === 'error') {
    message = <p>{error}</p>;
  }

  if (status === 'completed') {
    message = (
      <>
        <p>Product updated successfully!</p>
        <p>
          Product: {result.title} in Category {result.category}
        </p>
      </>
    );
  }

  console.log(status);

  return (
    <>
      <PageHeading>Edit Product Page</PageHeading>
      {message && (
        <Modal>
          {message}
          <Button onClick={closeHandler} disabled={status === 'pending'}>
            OK
          </Button>
        </Modal>
      )}
      <ProductForm
        isEdit
        loadedCategories={loadedCategories}
        product={foundProduct}
        onSaveProduct={updateProductHandler}
      />
    </>
  );
}

export default EditProductPage;

export async function loader({ params }) {
  return await findProduct(params.category, params.productId);
}
