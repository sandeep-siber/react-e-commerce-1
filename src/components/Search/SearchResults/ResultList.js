import { Link } from 'react-router-dom';
import classes from './ResultList.module.css';

function ResultList({ items }) {
  return (
    <ul className={classes['result__list']}>
      {items.map((item) => (
        <li key={item.id} className={classes['result__item']}>
          <Link to={`/collections/all/products/${item.id}`}>
            <div className={classes['result__image']}>
              <img src={item.imageUrl} alt={item.title} />
            </div>
            <div>
              <p>{item.title}</p>
              <p>
                <span>from Rs. {item.price}</span>
                <span className={classes['result__badge']}>In stock</span>
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ResultList;
