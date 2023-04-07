import { Link } from 'react-router-dom';

import classes from './Wishlist.module.css';

function wishList({ items }) {
  return (
    <ul className={classes['wish__list']}>
      {items.map((item) => (
        <li key={item.id} className={classes['wish__item']}>
          <Link to={`/collections/all/products/${item.id}`}>
            <div className={classes['wish__image']}>
              <img src={item.imageUrl} alt={item.title} />
            </div>
            <div>
              <p>{item.title}</p>
              <p>
                <span>from Rs. {item.price}</span>
                <span className={classes['wish__badge']}>In stock</span>
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default wishList;
