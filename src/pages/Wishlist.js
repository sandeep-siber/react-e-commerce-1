import PageHeading from '../components/UI/PageHeading';
import Wishlist from '../components/Wishlist/Wishlist';

import { useSelector } from 'react-redux/es/exports';

function WishlistPage() {
  const favourites = useSelector((state) => state.favourites);

  return (
    <>
      <PageHeading>Wishlist </PageHeading>
      <Wishlist items={favourites.items} />
    </>
  );
}

export default WishlistPage;
