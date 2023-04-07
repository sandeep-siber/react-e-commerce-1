import { useEffect, useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigation,
  useLoaderData,
  useSubmit,
} from 'react-router-dom';

import { getLoggedUserId, getTokenDuration } from '../utils/auth';

import { useSelector, useDispatch } from 'react-redux';
import { sendCartData, fetchCartData } from '../store/cart-actions';
import {
  sendFavouriteData,
  fetchFavouriteData,
} from '../store/favourite-actions';

import Cart from '../components/Cart/Cart';
import HeaderMobileNav from '../components/Layouts/HeaderMobileNav';
import Header from '../components/Layouts/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Search from '../components/Search/RapidSearch/Search';
import Footer from '../components/FooterLayout/Footer';

import Notification from '../components/UI/Notification';
import Loading from '../components/UI/Loading';

let isInitial = true;
function RootLayout() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const [mobileNavIsShown, setMobileNavIsShown] = useState(false);
  const [searchIsShown, setSearchIsShown] = useState(false);

  const location = useLocation();
  const homeClass = location.pathname !== '/' ? '' : 'home';
  const isProductsPage = location.pathname.includes('collections');

  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  const dispatch = useDispatch();

  const token = useLoaderData();
  const userId = getLoggedUserId();

  const submit = useSubmit();

  const favourites = useSelector((state) => state.favourites);

  useEffect(() => {
    if (!token) return;
    if (token === 'EXPIRED') {
      submit(null, { method: 'post', action: '/logout' });
    }

    const tokenDuration = getTokenDuration();
    setTimeout(() => {
      submit(null, { method: 'post', action: '/logout' });
    }, tokenDuration);
  }, [token, submit]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed && userId) {
      dispatch(sendCartData({ userId: userId, cart: cart }));
    }
  }, [cart, dispatch, userId]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartData(userId));
    }
  }, [dispatch, userId]);

  // ..........
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (favourites.changed && userId) {
      dispatch(sendFavouriteData({ userId: userId, favourites: favourites }));
    }
  }, [favourites, dispatch, userId]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavouriteData(userId));
    }
  }, [dispatch, userId]);
  // ..........

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showMobileNavHandler = () => {
    setMobileNavIsShown(true);
  };

  const hideMobileNavHandler = () => {
    setMobileNavIsShown(false);
  };

  function showSearchHandler() {
    setSearchIsShown(true);
  }

  function hideSearchHandler() {
    setSearchIsShown(false);
  }

  const navigation = useNavigation();

  return (
    <>
      {mobileNavIsShown && <HeaderMobileNav onClose={hideMobileNavHandler} />}

      {cartIsShown && <Cart onClose={hideCartHandler} />}

      {searchIsShown && <Search onClose={hideSearchHandler} />}

      <Header
        onShowCart={showCartHandler}
        onShowMobileNav={showMobileNavHandler}
        onShowSearch={showSearchHandler}
      />

      {location.pathname !== '/' ? <Breadcrumb /> : null}

      <main className={homeClass}>
        {notification && userId && isProductsPage && (
          <Notification //Green Patthi
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}

        {navigation.state === 'loading' && (
          <div className='centered'>
            <Loading />
          </div>
        )}

        <Outlet />
      </main>

      <Footer />
    </>
  );
}
export default RootLayout;
