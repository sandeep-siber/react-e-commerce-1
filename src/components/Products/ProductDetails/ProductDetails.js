import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart-slice';

import HeartIcon from '../../UI/icons/HeartIcon';
import Button from '../../UI/Button';
import classes from './ProductDetails.module.css';

function ProductDetail({ product }) {
  const enteredQuantity = useRef();
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    const quantity = +enteredQuantity.current.value;
    if (!quantity || quantity <= 0) {
      console.log(enteredQuantity.current.value, 'Wrong value');
      return;
    }

    dispatch(
      cartActions.addItemToCart({
        id: product.id,
        imageUrl: product.imageUrl,
        title: product.title,
        description: product.description,
        price: product.price,
        quantity: quantity,
      })
    );
  };

  return (
    <section className={classes['product-details']}>
      <h1>{product.title}</h1>

      <hr />

      <div className={classes['product-image']}>
        <img src={product.imageUrl} alt={product.title} />
      </div>

      <h2>
        <span>&#8377;</span>
        <span> </span>
        <span>{product.price.toFixed(2)}</span>
      </h2>

      <p>{product.description}</p>

      <div className={classes['product-actions']}>
        <input
          type='number'
          min='1'
          max='10'
          defaultValue='1'
          ref={enteredQuantity}
        />
        <Button className='button' onClick={addToCartHandler}>
          Add to Cart
        </Button>
        <button className={classes.wishlist}>
          <span className={classes.icon}>
            <HeartIcon />
          </span>
          <span> </span>
          <span>Wishlist</span>
        </button>
      </div>

      <p>{product.info}</p>
    </section>
  );
}
export default ProductDetail;
