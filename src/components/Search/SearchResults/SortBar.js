import Button from '../../UI/Button';

import SlidersIcon from '../../UI/icons/SlidersIcon';

import classes from './SortBar.module.css';

function SortBar({ onShowFiltersModal, onSelectedSort, selected }) {
  function changeSelectionHandler(event) {
    const selectedSorting = event.target.value;
    onSelectedSort(selectedSorting);
  }

  return (
    <div className={classes['sortby-bar']}>
      <p>0 results for bakar</p>
      <p>
        <Button onClick={onShowFiltersModal}>
          <span>Filters & Sort by</span>
          <span className={classes.icon}>
            <SlidersIcon />
          </span>
        </Button>

        <select
          onChange={changeSelectionHandler}
          value={selected}
          className={classes['sortby-bar__dropdown']}
        >
          <option value='title-asc'>Title Ascending</option>
          <option value='title-desc'>Title Descending</option>
          <option value='price-asc'>Price Ascending</option>
          <option value='price-desc'>Price Descending</option>
          <option value='date-asc'>Date Ascending</option>
          <option value='date-desc'>Date Descending</option>
        </select>
      </p>
    </div>
  );
}

export default SortBar;
