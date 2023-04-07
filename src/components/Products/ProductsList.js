import ProductItem from './ProductItem/ProductItem';

import classes from './ProductsList.module.css';

function ProductsList(props) {
  const productsList = props.products.map((p) => (
    <ProductItem
      isAdmin={props.isAdmin}
      key={p.id}
      id={p.id}
      title={p.title}
      imageUrl={p.imageUrl}
      price={p.price}
      description={p.description}
      category={p.category}
      isFavourite={p.isFavourite}
    />
  ));

  function changeSelectionHandler(event) {
    const selectedSorting = event.target.value;
    props.onSelectedSort(selectedSorting);
  }

  return (
    <>
      <div className={classes.sorting}>
        <select onChange={changeSelectionHandler} value={props.selected}>
          <option value='title-asc'>Title Ascending</option>
          <option value='title-desc'>Title Descending</option>
          <option value='price-asc'>Price Ascending</option>
          <option value='price-desc'>Price Descending</option>
          <option value='date-asc'>Date Ascending</option>
          <option value='date-desc'>Date Descending</option>
        </select>
        <select>
          <option>2</option>
          <option>4</option>
        </select>
      </div>

      <ul className={classes['products-list']}>{productsList}</ul>
    </>
  );
}

export default ProductsList;
