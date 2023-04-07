import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Modal from '../../UI/Modal';
import { getAllProducts } from '../../../lib/api';
import { saveSearchKey, getSearchKeys } from '../../../store/search-keys';

import SearchIcon from '../../UI/icons/SearchIcon';
import SlidersIcon from '../../UI/icons/SlidersIcon';
import XMarkIcon from '../../UI/icons/XMarkIcon';
import FireIcon from '../../UI/icons/FireIcon';

import classes from './Search.module.css';

function Search({ onClose }) {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKeys, setSearchKeys] = useState([]);
  const searchTerm = useRef();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getAllProducts();
      setLoadedProducts(fetchedProducts);
    }

    fetchProducts();
  }, []);

  const searchProducts = useCallback(
    (searchText) => {
      if (!searchText) {
        setFilteredProducts([]);
        return;
      }
      // const fetchedProducts = await getAllProducts();
      setFilteredProducts(
        loadedProducts.filter((p) => {
          const title = p.title.toUpperCase();
          const searchKey = searchText.toUpperCase();

          return title.includes(searchKey);
        })
      );
    },
    [loadedProducts]
  );

  useEffect(() => {
    const keys = getSearchKeys();
    if (!keys) {
      return;
    }
    searchProducts(keys[0]);
    setSearchKeys(keys);
  }, [searchProducts]);

  function searchChangeHandler(event) {
    searchProducts(event.target.value);
  }

  function searchClickHandler() {
    const newKey = searchTerm.current.value;
    saveSearchKey(newKey);
    // localStorage.removeItem('searchKeys');
  }

  function searchPageShowHandler() {
    navigate('/search');
    onClose();
  }

  function resultItemClickHandler(resultItemId) {
    navigate({
      pathname: '/collections/all/products/' + resultItemId,
    });
    onClose();
  }

  console.log(location);

  return (
    <Modal onClose={onClose}>
      <div className={classes.search}>
        <div className={classes['search__input']}>
          <div className={classes.container}>
            <input
              type='text'
              placeholder='Search'
              ref={searchTerm}
              onChange={searchChangeHandler}
            />

            <button onClick={searchClickHandler}>
              <span className={classes.icon}>
                <SearchIcon />
              </span>
            </button>

            <button onClick={searchPageShowHandler}>
              <span className={classes.icon}>
                <SlidersIcon />
              </span>
            </button>

            <button onClick={onClose}>
              <span className={classes.icon}>
                <XMarkIcon />
              </span>
            </button>
          </div>
        </div>

        <div className={classes.result}>
          <ul className={classes['search__keys']}>
            {searchKeys.map((key) => (
              <li key={key} onClick={searchProducts.bind(null, key)}>
                <span className={classes.icon}>
                  <FireIcon />
                </span>
                <span>{key}</span>
              </li>
            ))}
          </ul>

          <ul className={classes['result__list']}>
            {filteredProducts.map((result) => (
              <li
                key={result.id}
                className={classes['result__item']}
                onClick={resultItemClickHandler.bind(null, result.id)}
              >
                <div className={classes['result__image']}>
                  <img src={result.imageUrl} alt={result.title} />
                </div>
                <div>
                  <p>{result.title}</p>
                  <p>
                    {result.description}
                    <span className={classes['result__badge']}>
                      {result.availability ? 'In stock' : 'Out of stock'}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
export default Search;
