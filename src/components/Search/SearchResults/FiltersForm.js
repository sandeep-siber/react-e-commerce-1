import CheckList from '../../UI/CheckList';
import Button from '../../UI/Button';
import Accordian from '../../UI/Accordian';

import XMarkIcon from '../../UI/icons/XMarkIcon';

import classes from './FiltersForm.module.css';

function FiltersForm({
  open,
  onHideFiltersModal,
  onShowResults,

  checkLists,
  filters,
  onChecklistClick,
  onFilterRemove,

  sortCheckList,
  onSelectedSort,
  selected,
}) {
  function priceRangeHandler(event) {
    console.log(event.target.id, event.target.value);
  }

  return (
    <div
      className={`${classes['filters-form']} ${
        open ? classes.open : undefined
      }`}
    >
      <header className={classes['filters-header']}>
        <button className={classes.btn} onClick={onHideFiltersModal}>
          <span className={classes.icon}>
            <XMarkIcon />
          </span>
        </button>
        <span>Selected filters</span>
      </header>

      <div className={classes['filter-tags']}>
        <ul>
          {filters.map((item, index) => (
            <li key={index}>
              <span>
                {item.fieldName}: {item.caption}
              </span>

              <button
                className={`${classes.btn} ${classes.icon}`}
                onClick={onFilterRemove.bind(null, {
                  id: item.id,
                  fieldName: item.fieldName,
                })}
              >
                <XMarkIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ul>
        <li>
          <Accordian title='Category'>
            <CheckList
              fieldName='category'
              items={checkLists.categoriesCheckList}
              onClick={onChecklistClick}
            />
          </Accordian>
        </li>

        <li>
          <Accordian title='Brand'>
            <CheckList
              fieldName='brands'
              items={checkLists.brandsCheckList}
              onClick={onChecklistClick}
            />
          </Accordian>
        </li>

        <li>
          <Accordian title='Price'>
            <div className={classes['filter__price']}>
              <input
                type='number'
                min='10.00'
                max={checkLists.priceRange.to}
                step='10'
                defaultValue={checkLists.priceRange.from}
                onBlur={priceRangeHandler}
                id='priceRange.from'
              />
              <span> - </span>
              <input
                type='number'
                min='10.00'
                max={checkLists.priceRange.to}
                step='10'
                defaultValue={checkLists.priceRange.to}
                onBlur={priceRangeHandler}
                id='priceRange.to'
              />
            </div>
          </Accordian>
        </li>

        <li>
          <Accordian title='Avalaibility'>
            <CheckList
              fieldName='availability'
              items={checkLists.availabilityCheckList}
              onClick={onChecklistClick}
            />
          </Accordian>
        </li>

        <li>
          <Accordian title='Sort by' opened>
            <CheckList
              items={sortCheckList}
              type='radio'
              radioName='sorting'
              onSelectedSort={onSelectedSort}
              selected={selected}
            />
          </Accordian>
        </li>
      </ul>

      <p className={classes['filter-form--action']}>
        <Button onClick={onShowResults}>SHOW (3) RESULTS</Button>
      </p>
    </div>
  );
}

export default FiltersForm;
