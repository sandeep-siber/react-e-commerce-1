import { FIREBASE_DOMAIN } from '../lib/api';

import { uiActions } from './ui-slice';
import { favouriteActions } from './favourite-slice';

export const sendFavouriteData = (favouriteData) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending',
        message: 'Sending favourite data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        `${FIREBASE_DOMAIN}/favourites/${favouriteData.userId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify({
            items: favouriteData.favourites.items,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending favourite data failed!');
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Send favourite data successfully!',
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Sending favourite data failed!',
        })
      );
    }
  };
};

export const fetchFavouriteData = (userId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${FIREBASE_DOMAIN}/favourites/${userId}.json`
      );

      if (!response.ok) {
        throw new Error('Could fetch favourites data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      let favouriteData = await fetchData();
      if (!favouriteData || !favouriteData.items) {
        favouriteData = {
          items: [],
        };
      }

      dispatch(
        favouriteActions.replaceFavourite({
          items: favouriteData.items,
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: err.message + ' fav',
          // message: 'Fetching favourite data failed!',
        })
      );
    }
  };
};
