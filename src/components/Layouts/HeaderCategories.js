import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import useHttp from '../../hooks/useHttp';
import { getAllCategories } from '../../lib/api';

import classes from './HeaderCategories.module.css';

function HeaderCategories({ onClose, open }) {
  const {
    sendRequest,
    status,
    data: loadedCategories,
    error,
  } = useHttp(getAllCategories, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const containerClasses = `${classes['categories-container']} ${
    open ? classes.open : ''
  }`;

  if (status === 'pending') {
    return (
      <div className={containerClasses}>
        <p className={classes['loading-text']}>Loading...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={containerClasses}>
        <p className={classes['loading-text']}>{error}</p>
      </div>
    );
  }

  if (
    status === 'completed' &&
    (!loadedCategories || loadedCategories.length === 0)
  ) {
    return (
      <div className={containerClasses}>
        <p className={classes['loading-text']}>No categories found</p>
      </div>
    );
  }

  const listItems = loadedCategories.map((item) => (
    <li key={item.id} className={classes.item}>
      <Link to={'/collections/' + item.id}>
        <div className={classes['item__image']}>
          <img src={item.imageUrl} alt={item.title} />
        </div>
        <h3 className={classes['item__title']}>{item.title}</h3>
      </Link>
    </li>
  ));

  return (
    <div className={containerClasses} onClick={onClose}>
      <ul className={classes['category__list']}>{listItems}</ul>
    </div>
  );
}

export default HeaderCategories;
