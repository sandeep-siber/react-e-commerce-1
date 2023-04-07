import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart-slice';
import { favouriteActions } from '../../../store/favourite-slice';

import Card from '../../UI/Card';
import Button from '../../UI/Button';
import WishIcon from '../../UI/icons/WishIcon';
import WishFilledIcon from '../../UI/icons/WishFilledIcon';

import classes from './ProductItem.module.css';

function ProductItem(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const favourite = props.isFavourite === undefined ? false : props.isFavourite;

  const [isFavourite, setFavourite] = useState(favourite);

  const userId = localStorage.getItem('userId');

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: props.id,
        imageUrl: props.imageUrl,
        title: props.title,
        description: props.description,
        price: props.price,
        quantity: 1,
      })
    );
  };

  const productDetailHandler = () => {
    navigate({
      pathname: location.pathname + '/products/' + props.id,
    });
  };

  const editProductHandler = () => {
    const path = `/admin/collections/${props.category}/products/${props.id}/edit`;

    navigate({
      pathname: path,
    });
  };

  const deleteProductHandler = () => {};

  const toggleFavouriteHandler = (event) => {
    event.preventDefault();
    if (!userId) return;

    setFavourite((prvFavourite) => {
      const newFavourite = !prvFavourite;

      if (newFavourite) {
        dispatch(
          favouriteActions.addItemToFavourite({
            id: props.id,
            title: props.title,
            imageUrl: props.imageUrl,
            description: props.description,
            price: props.price,
            userId: userId,
            isFavourite: isFavourite,
          })
        );
      }

      if (!newFavourite) {
        dispatch(favouriteActions.removeItemFromFavourite(props.id));
      }

      return newFavourite;
    });
  };

  return (
    <li>
      <Card className={classes['product-item']}>
        <header className={classes['card__header']}>
          <h1 className={classes['product__title']}>{props.title}</h1>
        </header>

        <div className={classes['card__image']}>
          <img src={props.imageUrl} alt={props.title} />
          {userId && (
            <form onSubmit={toggleFavouriteHandler}>
              <button
                className={`${classes.wishlist} ${classes.icon}`}
                title='Add to Wishlist'
              >
                {/* {status === 'pending' && (
                  <span className={classes.fav}>Once moment!</span>
                )}
                {status === 'error' && (
                  <span className={classes.fav}>{error}</span>
                )} */}

                {isFavourite ? <WishFilledIcon /> : <WishIcon />}
              </button>
            </form>
          )}
        </div>

        <div className={classes['card__content']}>
          <h2 className={classes['product__price']}>
            <span>&#8377;</span>
            {props.price.toFixed(2)}
          </h2>
          <p className={classes['product__description']}>{props.description}</p>
        </div>

        {props.isAdmin && (
          <div className={classes['card__actions']}>
            <Button onClick={editProductHandler}>Edit</Button>
            <Button onClick={deleteProductHandler}>Delete</Button>
          </div>
        )}

        {!props.isAdmin && (
          <div className={classes['card__actions']}>
            <Button onClick={productDetailHandler}>Details</Button>
            <Button onClick={addToCartHandler}>Add to Cart</Button>
          </div>
        )}
      </Card>
    </li>
  );
}

export default ProductItem;

// useEffect(() => {
//   if (!userId) return;
//   const favouriteData = {
//     isFavourite: isFavourite,
//     userId: userId,
//     productId: props.id,
//     title: props.title,
//     imageUrl: props.imageUrl,
//     price: props.price,
//     description: props.description,
//     brand: props.brand,
//   };
//   sendRequest(favouriteData);
// }, [isFavourite]);
