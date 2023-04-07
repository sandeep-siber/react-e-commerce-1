import CheckList from '../../UI/CheckList';
import XMarkIcon from './XMarkIcon';
import Button from '../../UI/Button';

import classes from './FiltersForm.module.css';
import accoridanClasses from '../../UI/Accordian.module.css';

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
        <li className={accoridanClasses.accordian}>
          <input
            type='checkbox'
            className={accoridanClasses['accordian__toggle']}
          />

          <h2 className={accoridanClasses['accordian__title']}>Category</h2>

          <div className={accoridanClasses['accordian__content']}>
            <div className={classes['filters__container']}>
              <CheckList
                fieldName='category'
                items={checkLists.categoriesCheckList}
                onClick={onChecklistClick}
              />
            </div>
          </div>
        </li>

        <li className={accoridanClasses.accordian}>
          <input
            type='checkbox'
            className={accoridanClasses['accordian__toggle']}
          />

          <h2 className={accoridanClasses['accordian__title']}>Brand</h2>
          <div className={accoridanClasses['accordian__content']}>
            <div className={classes['filters__container']}>
              <CheckList
                fieldName='brands'
                items={checkLists.brandsCheckList}
                onClick={onChecklistClick}
              />
            </div>
          </div>
        </li>

        <li className={accoridanClasses.accordian}>
          <input
            type='checkbox'
            className={accoridanClasses['accordian__toggle']}
          />

          <h2 className={accoridanClasses['accordian__title']}>Price</h2>
          <div className={accoridanClasses['accordian__content']}>
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
          </div>
        </li>

        <li className={accoridanClasses.accordian}>
          <input
            type='checkbox'
            className={accoridanClasses['accordian__toggle']}
          />

          <h2 className={accoridanClasses['accordian__title']}>Avalaibility</h2>
          <div className={accoridanClasses['accordian__content']}>
            <CheckList
              fieldName='availability'
              items={checkLists.availabilityCheckList}
              onClick={onChecklistClick}
            />
          </div>
        </li>

        <li className={classes.sort}>
          <h2 className={classes.title}>Sort by</h2>
          <div className={classes.content}>
            <CheckList
              items={sortCheckList}
              type='radio'
              radioName='sorting'
              onSelectedSort={onSelectedSort}
              selected={selected}
            />
          </div>
        </li>
      </ul>

      <p className={classes['filter-form--action']}>
        <Button onClick={onShowResults}>SHOW (3) RESULTS</Button>
      </p>
    </div>
  );
}

export default FiltersForm;
