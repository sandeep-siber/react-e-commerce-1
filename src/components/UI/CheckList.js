import classes from './CheckList.module.css';

function CheckList({
  items,
  type = 'checkbox',
  onClick,
  radioName,
  fieldName,
  // ..
  onSelectedSort,
  selected,
}) {
  function radioChangeHandler(event) {
    // const updatedItems = items.map((item) => {
    //   let isChecked = false;
    //   if (item.id === event.target.id) {
    //     isChecked = event.target.checked;
    //   }
    //   return {
    //     id: item.id,
    //     caption: item.caption,
    //     checked: isChecked,
    //     name: item.name,
    //   };
    // });

    const selectedSorting = event.target.value;
    onSelectedSort(selectedSorting);
  }

  function checkboxChangeHandler(event) {
    const checked = event.target.checked;
    if (checked) {
      // event.target.checked = false;
      // console.log('checked', event.target.checked);
    }
    onClick({
      id: event.target.id,
      fieldName: fieldName,
      fieldValue: event.target.name,
      checked: event.target.checked,
      caption: event.target.dataset.caption,
      target: event.target,
    });
  }

  const listItems = items.map((item, index) => (
    <li key={index}>
      <label htmlFor={item.id} className={classes.item}>
        <span>
          {type === 'checkbox' ? (
            <input
              type={type}
              id={item.id}
              name={item.name}
              checked={item.checked}
              onChange={checkboxChangeHandler}
              data-caption={item.caption}
            />
          ) : (
            <input
              type={type}
              id={item.id}
              name={radioName}
              data-caption={item.caption}
              value={item.value}
              // ..
              onChange={radioChangeHandler}
              defachecked={selected}
            />
          )}

          {item.caption}
        </span>

        <span></span>
      </label>
    </li>
  ));

  return <ul>{listItems}</ul>;
}
export default CheckList;
