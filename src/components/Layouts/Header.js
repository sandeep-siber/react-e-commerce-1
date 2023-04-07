import { useState } from 'react';
import { NavLink, Link, useRouteLoaderData, Form } from 'react-router-dom';

import brandImage from '../../assets/brand.png';

import HeaderCartButton from './HeaderCartButton';
import HeaderCategories from './HeaderCategories';

import SearchIcon from '../UI/icons/SearchIcon';
import UserIcon from '../UI/icons/UserIcon';
import LockIcon from '../UI/icons/LockIcon';
import CheckIcon from '../UI/icons/CheckIcon';
import HeartIcon from '../UI/icons/HeartIcon';

import classes from './Header.module.css';

function Header({ onShowCart, onShowMobileNav, onShowSearch }) {
  const [productsDropdownIsOpen, setProductsDropdownIsOpen] = useState(false);
  const [adminDropdownIsOpen, setAdminDropdownIsOpen] = useState(false);
  const [userDropdownIsOpen, setUserDropdownIsOpen] = useState(false);

  const token = useRouteLoaderData('root');

  function showProductsDropdownHandler() {
    setProductsDropdownIsOpen(true);
  }

  function hideProductsDropdownHandler() {
    setProductsDropdownIsOpen(false);
  }

  function showAdminDropdownHandler() {
    setAdminDropdownIsOpen(true);
  }

  function hideAdminDropdownHandler() {
    setAdminDropdownIsOpen(false);
  }

  function showUserDropdownHandler() {
    setUserDropdownIsOpen(true);
  }

  function hideUserDropdownHandler() {
    setUserDropdownIsOpen(false);
  }

  return (
    <header className={classes['main-header']}>
      <div className={classes.toggle} onClick={onShowMobileNav}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={classes.brand}>
        <img src={brandImage} alt='Dairy' />
      </div>

      <nav className={classes['main-header__nav']}>
        <ul className={classes['main-header__item-list']}>
          <li className={classes['main-header__item']}>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Home
            </NavLink>
          </li>

          <li className={classes['main-header__item']}>
            <NavLink
              to='/about'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              About Us
            </NavLink>
          </li>

          <li
            onMouseEnter={showProductsDropdownHandler}
            onMouseLeave={hideProductsDropdownHandler}
            onClick={hideProductsDropdownHandler}
            className={`${classes['main-header__item']} ${classes.dropdown}`}
          >
            <NavLink
              to='/collections/all'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products
            </NavLink>
            <HeaderCategories
              onClose={hideProductsDropdownHandler}
              open={productsDropdownIsOpen}
            />
          </li>

          {token && (
            <li
              onMouseEnter={showAdminDropdownHandler}
              onMouseLeave={hideAdminDropdownHandler}
              className={`${classes['main-header__item']} ${classes.dropdown}`}
            >
              <NavLink
                to='/admin/collections/all'
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Admin
              </NavLink>
              <nav
                onClick={hideAdminDropdownHandler}
                className={`${classes['dropdown-menu']} ${
                  adminDropdownIsOpen && classes['dropdown-menu--open']
                }`}
              >
                <ul className={classes['dropdown-menu__list']}>
                  <li className={classes['dropdown-menu__item']}>
                    <Link to='/admin/collections/all'>Admin Products</Link>
                  </li>

                  <li className={classes['dropdown-menu__item']}>
                    <Link to='/admin/collections/all/products/new'>
                      Add Product
                    </Link>
                  </li>

                  <li className={classes['dropdown-menu__item']}>
                    <Link to='/admin/categories'>Admin Categories</Link>
                  </li>

                  <li className={classes['dropdown-menu__item']}>
                    <Link to='/admin/categories/new'>Add Category</Link>
                  </li>
                </ul>
              </nav>
            </li>
          )}

          <li
            onClick={onShowSearch}
            className={`${classes['main-header__item']} ${classes.icon} ${classes.mobile}`}
          >
            <div className={classes.container}>
              <span className={classes['main-header__icon']}>
                <SearchIcon />
              </span>
            </div>
          </li>

          <li
            className={`${classes['main-header__item']} ${classes.icon} ${classes.mobile}`}
          >
            <HeaderCartButton onClick={onShowCart} />
          </li>

          <li
            onMouseEnter={showUserDropdownHandler}
            onMouseLeave={hideUserDropdownHandler}
            className={`${classes['main-header__item']} ${classes.icon} ${classes.dropdown}`}
          >
            <Link to='/'>
              <span className={classes['main-header__icon']}>
                <UserIcon />
              </span>
            </Link>
            <nav
              onClick={hideUserDropdownHandler}
              className={`${classes['dropdown-menu']} ${classes['right-0']} ${
                userDropdownIsOpen && classes['dropdown-menu--open']
              }`}
            >
              <ul className={classes['dropdown-menu__list']}>
                {token && (
                  <li className={classes['dropdown-menu__item']}>
                    <Link to='/account'>
                      <span className={classes['dropdown__icon']}>
                        <UserIcon />
                      </span>
                      <span>My Account</span>
                    </Link>
                  </li>
                )}

                {token && (
                  <li
                    // onClick={logoutHandler}
                    className={`${classes['dropdown-menu__item']} ${classes['logout-action']}`}
                  >
                    <div className={classes.container}>
                      <span className={classes['dropdown__icon']}>
                        <LockIcon />
                      </span>

                      <Form action='/logout' method='post'>
                        <button>Logout</button>
                      </Form>
                    </div>
                  </li>
                )}

                {!token && (
                  <li className={classes['dropdown-menu__item']}>
                    <Link to='/auth?mode=login'>
                      <span className={classes['dropdown__icon']}>
                        <LockIcon />
                      </span>
                      <span>Sign In</span>
                    </Link>
                  </li>
                )}

                <li className={classes['dropdown-menu__item']}>
                  <Link to='/'>
                    <span className={classes['dropdown__icon']}>
                      <CheckIcon />
                    </span>
                    <span>Checkout</span>
                  </Link>
                </li>

                <li className={classes['dropdown-menu__item']}>
                  <Link to='/wishlist'>
                    <span className={classes['dropdown__icon']}>
                      <HeartIcon />
                    </span>
                    <span>Wishlist</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
