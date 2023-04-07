import { useState, useEffect } from 'react';
import { Link, useRouteLoaderData, Form } from 'react-router-dom';

import useHttp from '../../hooks/useHttp';
import { getAllCategories } from '../../lib/api';

import Aside from '../UI/Aside';

import CheckIcon from '../UI/icons/CheckIcon';
import HeartIcon from '../UI/icons/HeartIcon';
import LockIcon from '../UI/icons/LockIcon';
import UserIcon from '../UI/icons/UserIcon';
import XMarkIcon from '../UI/icons/XMarkIcon';
import ChevronRightIcon from '../UI/icons/ChevronRightIcon';
import ChevronLeftIcon from '../UI/icons/ChevronLeftIcon';

import classes from './HeaderMobileNav.module.css';

function HeaderMobileNav({ onClose, categories }) {
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const [openSubmenuProducts, setOpenSubmenuProducts] = useState(false);
  const [openSubmenuAdmin, setOpenSubmenuAdmin] = useState(false);

  const {
    sendRequest,
    status,
    data: loadedCategories,
    error,
  } = useHttp(getAllCategories, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const token = useRouteLoaderData('root');

  const submenuClasses = openSubmenu ? classes.next : undefined;

  const submenuProductsClasses = `${classes.submenu} ${classes.products} ${
    openSubmenuProducts ? classes.show : undefined
  }`;

  const submenuAdminClasses = `${classes.submenu} ${classes.admin} ${
    openSubmenuAdmin ? classes.show : undefined
  }`;

  function subProductsHandler(event) {
    // if (!loadedCategories) {
    //   sendRequest();
    // }
    setOpenSubmenu(true);
    setOpenSubmenuProducts(true);
  }

  function subAdminHandler(event) {
    setOpenSubmenu(true);
    setOpenSubmenuAdmin(true);
  }

  function subProductsBackHandler() {
    setOpenSubmenu(false);
    setOpenSubmenuProducts(false);
  }

  function subAdminsBackHandler(event) {
    setOpenSubmenu(false);
    setOpenSubmenuAdmin(false);
  }

  // function signInHandler() {
  //   onClose();
  //   onShowAuthForm();
  // }

  // function logoutHandler() {
  // dispatch(authActions.logout());
  // navigate('/', { replace: true });
  // console.log('Logout...');
  // onClose();
  // }

  // function registerHandler() {
  //   alert('Register');
  // }

  // function wishlistHandler() {
  //   alert('Wishlist');
  // }

  let categoriesListItems;
  if (status === 'pending') {
    categoriesListItems = (
      <li className={classes['mobile-nav__item']}>
        <div className='centered'>
          <p>Loading...</p>
        </div>
      </li>
    );
  }

  if (status === 'error') {
    categoriesListItems = (
      <li className={classes['mobile-nav__item']}>
        <div className='centered'>
          <p>{error}</p>
        </div>
      </li>
    );
  }

  if (
    status === 'completed' &&
    (!loadedCategories || loadedCategories.length === 0)
  ) {
    categoriesListItems = (
      <li className={classes['mobile-nav__item']}>
        <div className='centered'>
          <p>No Categories found</p>
        </div>
      </li>
    );
  }

  if (status === 'completed') {
    categoriesListItems = loadedCategories.map((cat) => (
      <li
        key={cat.id}
        onClick={onClose}
        className={classes['mobile-nav__item']}
      >
        <Link to={`/collections/${cat.id}`}>{cat.title}</Link>
      </li>
    ));
  }

  return (
    <Aside onClose={onClose}>
      <nav className={classes['mobile-nav']}>
        <div className={submenuClasses}>
          <div>
            <ul className={classes['mobile-nav__item-list']}>
              <li
                onClick={onClose}
                className={`${classes['mobile-nav__item']} ${classes['close-btn']}`}
              >
                <div className={classes.container}>
                  <span className={classes.icon}>
                    <XMarkIcon />
                  </span>
                  <span>Close</span>
                </div>
              </li>

              <li className={classes['mobile-nav__item']}>
                <Link to='/' onClick={onClose}>
                  Home
                </Link>
              </li>

              <li className={classes['mobile-nav__item']}>
                <Link to='/about' onClick={onClose}>
                  About Us
                </Link>
              </li>

              <li
                onClick={subProductsHandler}
                className={`${classes['mobile-nav__item']} ${classes.sub} ${classes.products}`}
              >
                <div className={classes.container}>
                  <span>Products</span>
                  <span className={classes.icon}>
                    <ChevronRightIcon />
                  </span>
                </div>
              </li>

              {token && (
                <li
                  onClick={subAdminHandler}
                  className={`${classes['mobile-nav__item']} ${classes.sub} ${classes.admin}`}
                >
                  <div className={classes.container}>
                    <span>Admin</span>
                    <span className={classes.icon}>
                      <ChevronRightIcon />
                    </span>
                  </div>
                </li>
              )}
            </ul>

            <ul className={classes['mobile-nav__item-list']}>
              {token && (
                <li className={classes['mobile-nav__item']}>
                  <Link
                    to='/account'
                    onClick={onClose}
                    className={classes.container}
                  >
                    <span className={classes.icon}>
                      <UserIcon />
                    </span>
                    <span>My Account</span>
                  </Link>
                </li>
              )}

              {token && (
                <li
                  // onClick={onClose}
                  className={classes['mobile-nav__item']}
                >
                  <div className={classes.container}>
                    <span className={classes.icon}>
                      <LockIcon />
                    </span>

                    <Form method='post' action='/logout'>
                      <button>Logout</button>
                    </Form>
                  </div>
                </li>
              )}

              {!token && (
                <li className={classes['mobile-nav__item']}>
                  <Link
                    to='/auth?mode=login'
                    onClick={onClose}
                    className={classes.container}
                  >
                    <span className={classes.icon}>
                      <LockIcon />
                    </span>
                    <span>Sign In</span>
                  </Link>
                </li>
              )}

              <li className={classes['mobile-nav__item']}>
                <Link to='/' onClick={onClose} className={classes.container}>
                  <span className={classes.icon}>
                    <CheckIcon />
                  </span>
                  <span>Checkout</span>
                </Link>
              </li>

              <li onClick={onClose} className={classes['mobile-nav__item']}>
                <Link to='/wishlist' className={classes.container}>
                  <span className={classes.icon}>
                    <HeartIcon />
                  </span>
                  <span>Wishlist</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className={classes['submenu-container']}>
            <div className={submenuProductsClasses}>
              <ul className={classes['mobile-nav__item-list']}>
                <li
                  onClick={subProductsBackHandler}
                  className={`${classes['mobile-nav__item']} ${classes['back-btn']}`}
                  id='submenu-products-back'
                >
                  <div className={classes.container}>
                    <span className={classes.icon}>
                      <ChevronLeftIcon />
                    </span>
                    <span>Back</span>
                  </div>
                </li>

                <li onClick={onClose} className={classes['mobile-nav__item']}>
                  <Link to='/collections/all'>Products</Link>
                </li>

                {categoriesListItems}
              </ul>
            </div>

            <div onClick={subAdminsBackHandler} className={submenuAdminClasses}>
              <ul className={classes['mobile-nav__item-list']}>
                <li
                  className={`${classes['mobile-nav__item']} ${classes['back-btn']}`}
                >
                  <div className={classes.container}>
                    <span className={classes.icon}>
                      <ChevronLeftIcon />
                    </span>
                    <span>Back</span>
                  </div>
                </li>

                <li onClick={onClose} className={classes['mobile-nav__item']}>
                  <Link to='/admin/collections/all'>Admin Products</Link>
                </li>

                <li onClick={onClose} className={classes['mobile-nav__item']}>
                  <Link to='/admin/collections/all/products/new'>
                    Add Product
                  </Link>
                </li>

                <li onClick={onClose} className={classes['mobile-nav__item']}>
                  <Link to='/admin/categories'>Admin Categories</Link>
                </li>

                <li onClick={onClose} className={classes['mobile-nav__item']}>
                  <Link to='/admin/categories/new'> Add Category </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </Aside>
  );
}

export default HeaderMobileNav;
