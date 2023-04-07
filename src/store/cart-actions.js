import { FIREBASE_DOMAIN } from '../lib/api';

import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        `${FIREBASE_DOMAIN}/cart/${cartData.userId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cartData.cart.items,
            totalQuantity: cartData.cart.totalQuantity,
            totalAmount: cartData.cart.totalAmount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed!');
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Send cart data successfully!',
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};

export const fetchCartData = (userId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${FIREBASE_DOMAIN}/cart/${userId}.json`);

      if (!response.ok) {
        throw new Error('Could fetch cart data!');
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
          totalAmount: cartData.totalAmount,
          userId: cartData.userId,
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          // message: 'Fetching cart data failed!',
          message: err.message + ' cart',
        })
      );
    }
  };
};
