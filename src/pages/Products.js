import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import useHttp from '../hooks/useHttp';
import { getProducts } from '../lib/api';
import { sortList } from '../utils/utils';

import PageContainer from '../components/UI/PageContainer';
import ProductsList from '../components/Products/ProductsList';

function ProductsPage() {
  const {
    sendRequest,
    status,
    data: loadedProducts,
    error,
  } = useHttp(getProducts, true);

  const favourites = useSelector((state) => state.favourites);

  const navigate = useNavigate();
  const location = useLocation();

  const params = useParams();
  const categoryId = params.categoryId;

  const queryParams = new URLSearchParams(location.search);
  const selectedSort = queryParams.get('sort') || 'title-asc';

  useEffect(() => {
    sendRequest(categoryId);
  }, [sendRequest, categoryId]);

  function changeSortingHandler(selected) {
    const selectedSorting = selected;
    navigate({
      pathname: location.pathname,
      search: `?sort=${selectedSorting}`,
    });
  }

  if (status === 'pending') {
    return (
      <div className='centered'>
        <p>Loading...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className='centered'>
        <p>{error}</p>
      </div>
    );
  }

  if (
    status === 'completed' &&
    (!loadedProducts || loadedProducts.length === 0)
  ) {
    return (
      <div className='centered'>
        <p>No Products found</p>
      </div>
    );
  }

  if (favourites.items && favourites.items.length > 0) {
    for (const favourite of favourites.items) {
      const index = loadedProducts.findIndex((p) => p.id === favourite.id);
      const updatedProduct = loadedProducts[index];
      if (updatedProduct) {
        updatedProduct.isFavourite = true;
        loadedProducts[index] = updatedProduct;
      }
    }
  }

  const sortedProducts = sortList(loadedProducts, selectedSort);

  return (
    <PageContainer>
      <ProductsList
        products={sortedProducts}
        onSelectedSort={changeSortingHandler}
        selected={selectedSort}
      />
    </PageContainer>
  );
}

export default ProductsPage;
