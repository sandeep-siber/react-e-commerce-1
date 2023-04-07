import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { getLoggedUserId } from '../../utils/auth';
import useHttp from '../../hooks/useHttp';

import Modal from '../UI/Modal';
import Button from '../UI/Button';
import ArrowLeftLongIcon from '../UI/icons/ArrowLeftLongIcon';

import classes from './Cart.module.css';

import CartItem from './CartItem';
import Checkout from './Checkout';
import { sendOrderData } from '../../lib/api';

function Cart(props) {
  const dispatch = useDispatch();

  const {
    sendRequest: sendOrder,
    status,
    data: orderRecipt,
    error,
  } = useHttp(sendOrderData, false);

  const [isCheckout, setIsCheckout] = useState(false);
  const isSubmitting = status === 'pending';
  const didSubmit = status === 'completed';

  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const hasItems = items.length > 0;

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const cartItemAddHandler = (item, qty) => {
    dispatch(
      cartActions.addItemToCart({
        ...item,
        quantity: 1,
      })
    );
  };

  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  const backToCartHandler = () => {
    setIsCheckout(false);
  };

  const submitOrderHandler = async (userData) => {
    let userId = getLoggedUserId();
    if (!userId) userId = 'NON_REGISTERED';
    let userDetails = { userId, ...userData };
    const order = {
      user: userDetails,
      orderedItems: items,
    };

    sendOrder(order);
    dispatch(cartActions.clearCart());
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          imageUrl={item.imageUrl}
          title={item.title}
          description={item.description}
          price={item.price}
          quantity={item.quantity}
          amount={item.totalPrice}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <div className={classes.cart}>
      <div className={isCheckout ? classes.next : ''}>
        <div>
          {cartItems}
          <footer>
            <div className={classes['cart-actions']}>
              <button onClick={props.onClose}>
                <span className={classes.icon}>
                  <ArrowLeftLongIcon />
                </span>
                <span>CONTINUE SHOPPING</span>
              </button>
            </div>

            <div className={classes.checkout}>
              <div className={classes.total}>
                <span>Total</span>
                <span>{totalAmount.toFixed(2)}</span>
              </div>

              <div>
                {hasItems && (
                  <Button
                    className={classes['checkout-button']}
                    onClick={checkoutHandler}
                  >
                    PROCEED TO CHECKOUT
                  </Button>
                )}
              </div>
            </div>
          </footer>
        </div>

        <div>
          {isCheckout && (
            <Checkout
              onBackToCart={backToCartHandler}
              onConfirm={submitOrderHandler}
            />
          )}
          {/* <Shipping onBackToCart={backToCartHandler} /> */}
        </div>
      </div>
    </div>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order </p>
      <p>Order Receipt: {orderRecipt && orderRecipt.orderId}</p>
      <div className={classes.actions}>
        <Button onClick={props.onClose}>Close</Button>
      </div>
    </React.Fragment>
  );

  const errorModalContent = (
    <React.Fragment>
      <p>{error}</p>
      <div className={classes.actions}>
        <Button onClick={props.onClose}>Close</Button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && !error && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
      {error && errorModalContent}
    </Modal>
  );
}

export default Cart;
