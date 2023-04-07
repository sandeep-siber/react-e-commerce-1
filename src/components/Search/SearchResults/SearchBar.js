import XMarkIcon from '../../UI/icons/XMarkIcon';
import SearchIcon from '../../UI/icons/SearchIcon';

import classes from './SearchBar.module.css';

function SearchBar({ onSearchKeyChange }) {
  return (
    <div className={classes['search-bar']}>
      <input type='text' placeholder='Search' onChange={onSearchKeyChange} />
      <button>
        <span className={classes.icon}>
          <XMarkIcon />
        </span>
      </button>
      <button>
        <span className={classes.icon}>
          <SearchIcon />
        </span>
      </button>
    </div>
  );
}

export default SearchBar;
