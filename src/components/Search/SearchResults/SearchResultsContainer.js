import classes from './SearchResultsContainer.module.css';

function SearchResultsContainer({ children }) {
  return <div className={classes['search-results__container']}>{children}</div>;
}

export default SearchResultsContainer;
