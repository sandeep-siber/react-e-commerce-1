import { useNavigate, useLocation, useLoaderData } from 'react-router-dom';

import { getProducts } from '../../lib/api';
import { sortList } from '../../utils/utils';

import PageContainer from '../../components/UI/PageContainer';
import ProductsList from '../../components/Products/ProductsList';

function AdminProductsPage() {
  const loadedProducts = useLoaderData();

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const selectedSort = queryParams.get('sort') || 'title-asc';

  function changeSortingHandler(selected) {
    const selectedSorting = selected;
    navigate({
      pathname: location.pathname,
      search: `?sort=${selectedSorting}`,
    });
  }

  if (!loadedProducts || loadedProducts.length === 0) {
    return (
      <div className='centered'>
        <p>No Products found</p>
      </div>
    );
  }

  const sortedProducts = sortList(loadedProducts, selectedSort);

  return (
    <PageContainer>
      <ProductsList
        products={sortedProducts}
        onSelectedSort={changeSortingHandler}
        selected={selectedSort}
        isAdmin
      />
    </PageContainer>
  );
}
export default AdminProductsPage;

export async function loader({ request, params }) {
  const categoryId = params.category;
  const loadedProducts = await getProducts(categoryId);
  return loadedProducts;
}
