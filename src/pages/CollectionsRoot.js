import { Outlet, useParams } from 'react-router-dom';

function CollectionsRootLayout() {
  const params = useParams();

  return (
    <>
      <p>Collections Root Layout - {params.category}</p>
      <Outlet />
      {/* AllProductsPage or CategoryProductsPage */}
      {/* instead only CategoryProductsPage */}
      {/* in that Page ProductsList */}
    </>
  );
}
export default CollectionsRootLayout;
