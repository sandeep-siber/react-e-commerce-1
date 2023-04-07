import { stringToBoolean } from '../utils/utils';
import { toggleFavourite } from '../lib/api';

export async function action({ request }) {
  const data = await request.formData();

  const isFavouriteString = data.get('isFavourite');
  const isFavourite = stringToBoolean(isFavouriteString);

  console.log(isFavouriteString);

  const favouriteData = {
    isFavourite: isFavourite,
    category: data.get('category'),
    productId: data.get('productId'),
  };

  const resData = await toggleFavourite(favouriteData);
  return resData;
}
