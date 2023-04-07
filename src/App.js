import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import RootLayout from './pages/Root';
import HomePage, { loader as showcaseItemsData } from './pages/Home';

import { action as logoutAction } from './pages/Logout';
import { checkAuthLoader, tokenLoader } from './utils/auth';
import { action as newsletterAction } from './pages/Newsletter';

import EditCategoryPage from './pages/admin/EditCategory';
import NewCategoryPage from './pages/admin/NewCategory';

import ErrorPage from './pages/Error';

const AboutPage = lazy(() => import('./pages/About'));
const ProductsPage = lazy(() => import('./pages/Products'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetails'));
const SearchResultsPage = lazy(() => import('./pages/SearchResultsTest'));
const AuthenticationPage = lazy(() => import('./pages/Authentication'));
const MyAccountsPage = lazy(() => import('./pages/MyAccounts'));
const WishlistPage = lazy(() => import('./pages/Wishlist'));

const AdminProductsPage = lazy(() => import('./pages/admin/AdminProducts'));
const NewProductPage = lazy(() => import('./pages/admin/NewProduct'));
const AdminCategoriesPage = lazy(() => import('./pages/admin/AdminCategories'));
const EditProductPage = lazy(() => import('./pages/admin/EditProduct'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage />, loader: showcaseItemsData },
      {
        path: 'about',
        element: (
          <Suspense fallback={<p className='text-center'>Loading...</p>}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'collections',
        children: [
          { index: true, element: <Navigate replace to='all' /> },
          {
            path: ':categoryId',
            children: [
              {
                index: true,
                element: (
                  <Suspense
                    fallback={<p className='text-center'>Loading...</p>}
                  >
                    <ProductsPage />
                  </Suspense>
                ),
              },
              {
                path: 'products/:productId',
                children: [
                  {
                    index: true,
                    element: (
                      <Suspense
                        fallback={<p className='text-center'>Loading...</p>}
                      >
                        <ProductDetailsPage />
                      </Suspense>
                    ),
                    loader: (meta) =>
                      import('./pages/ProductDetails').then((module) =>
                        module.loader(meta)
                      ),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'search',
        element: (
          <Suspense fallback={<p className='text-center'>Loading...</p>}>
            <SearchResultsPage />
          </Suspense>
        ),
      },
      {
        path: 'auth',
        element: (
          <Suspense fallback={<p className='text-center'>Loading...</p>}>
            <AuthenticationPage />
          </Suspense>
        ),
        action: (meta) =>
          import('./pages/Authentication').then((module) =>
            module.action(meta)
          ),
      },
      {
        path: 'account',
        element: (
          <Suspense fallback={<p className='text-center'>Loading...</p>}>
            <MyAccountsPage />
          </Suspense>
        ),
        loader: () =>
          import('./utils/auth').then((module) => module.checkAuthLoader()),
      },
      { path: 'checkout', element: <Navigate to='/' /> },
      {
        path: 'wishlist',
        element: (
          <Suspense fallback={<p className='text-center'>Loading...</p>}>
            <WishlistPage />
          </Suspense>
        ),
        loader: () =>
          import('./utils/auth').then((module) => module.checkAuthLoader()),
      },

      {
        path: 'newsletter',
        action: newsletterAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
      {
        path: 'admin',
        loader: checkAuthLoader,
        children: [
          { index: true, element: <Navigate replace to='collections' /> },
          {
            path: 'collections',
            children: [
              { index: true, element: <Navigate replace to='all' /> },
              {
                path: ':category',
                id: 'loaded-categories',
                loader: (meta) =>
                  import('./pages/admin/NewProduct').then((module) =>
                    module.loader(meta)
                  ),
                children: [
                  {
                    index: true,
                    element: (
                      <Suspense
                        fallback={<p className='text-center'>Loading...</p>}
                      >
                        <AdminProductsPage />
                      </Suspense>
                    ),
                    loader: (meta) =>
                      import('./pages/admin/AdminProducts').then((module) =>
                        module.loader(meta)
                      ),
                  },
                  {
                    path: 'products/:productId',
                    children: [
                      {
                        path: 'edit',
                        element: (
                          <Suspense
                            fallback={<p className='text-center'>Loading...</p>}
                          >
                            <EditProductPage />
                          </Suspense>
                        ),
                        loader: (meta) =>
                          import('./pages/admin/EditProduct').then((module) =>
                            module.loader(meta)
                          ),
                      },
                      { path: 'delete', action: () => {} },
                    ],
                  },
                  {
                    path: 'products/new',
                    element: (
                      <Suspense
                        fallback={<p className='text-center'>Loading...</p>}
                      >
                        <NewProductPage />
                      </Suspense>
                    ),
                  },
                ],
              },
            ],
          },
          {
            path: 'categories',
            children: [
              {
                index: true,
                element: (
                  <Suspense
                    fallback={<p className='text-center'>Loading...</p>}
                  >
                    <AdminCategoriesPage />
                  </Suspense>
                ),
              },
              {
                path: ':categoryId',
                children: [
                  {
                    path: 'edit',
                    element: (
                      <Suspense
                        fallback={<p className='text-center'>Loading...</p>}
                      >
                        <EditCategoryPage />
                      </Suspense>
                    ),
                  },
                  { path: 'delete', action: () => {} },
                ],
              },
              {
                path: 'new',
                element: (
                  <Suspense
                    fallback={<p className='text-center'>Loading...</p>}
                  >
                    <NewCategoryPage />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// import AboutPage from './pages/About';
// import ProductsPage from './pages/Products';
// import ProductDetailsPage, {
//   loader as productDetailLoader,
// } from './pages/ProductDetails';
// import SearchResultsPage from './pages/SearchResultsTest';
// import AuthenticationPage, {
//   action as authAction,
// } from './pages/Authentication';
// import MyAccountsPage from './pages/MyAccounts';
// import WishlistPage from './pages/Wishlist';

// admin
// import AdminProductsPage, {
//   loader as adminProductsLoader,
// } from './pages/admin/AdminProducts';
// import NewProductPage, {
//   loader as loadedCategories,
// } from './pages/admin/NewProduct';
// import EditProductPage, {
//   loader as editProductLoaderData,
// } from './pages/admin/EditProduct';
// import AdminCategoriesPage from './pages/admin/AdminCategories';
