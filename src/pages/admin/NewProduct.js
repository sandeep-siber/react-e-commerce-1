import { useState } from 'react';
import { useRouteLoaderData, useNavigate } from 'react-router-dom';

import {
  getAllCategories,
  checkDuplicateProductTitle,
  addProduct,
} from '../../lib/api';

import useHttp from '../../hooks/useHttp';

import ProductForm from '../../components/Products/ProductForm';
import PageHeading from '../../components/UI/PageHeading';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Button';

function NewProductPage() {
  const loadedCategories = useRouteLoaderData('loaded-categories');
  const [titleIsDuplicate, setTitleIsDuplicate] = useState();

  const navigate = useNavigate();

  const {
    sendRequest: addNewProduct,
    status,
    data: result,
    error,
  } = useHttp(addProduct, false);

  function checkDuplicateTitleHandler(newProductData) {
    let isDuplicate;
    async function checkDuplicate() {
      isDuplicate = await checkDuplicateProductTitle(newProductData);
      setTitleIsDuplicate(isDuplicate);
    }

    checkDuplicate();
  }

  function addNewProductHandler(newProduct) {
    addNewProduct(newProduct);
  }

  function closeHandler() {
    navigate('/admin/collections/all', { replace: true });
  }

  let message;
  if (status === 'pending') {
    message = <p>Saving Product...</p>;
  }
  if (status === 'error') {
    message = <p>{error}</p>;
  }

  if (status === 'completed') {
    message = (
      <>
        <p>Product Saved successfully!</p>
        <p>New Product Id: {result.productId}</p>
      </>
    );
  }

  return (
    <>
      <PageHeading>New Product Page</PageHeading>
      {message && (
        <Modal>
          {message}
          <Button onClick={closeHandler} disabled={status === 'pending'}>
            OK
          </Button>
        </Modal>
      )}
      <ProductForm
        loadedCategories={loadedCategories}
        onCheckDuplicateTitle={checkDuplicateTitleHandler}
        titleIsDuplicate={titleIsDuplicate}
        onSaveProduct={addNewProductHandler}
      />
    </>
  );
}

export default NewProductPage;

export async function loader() {
  return await getAllCategories();
}
