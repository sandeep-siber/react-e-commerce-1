import { Link } from 'react-router-dom';
import classes from './ShowcaseFour.module.css';

function ShowcaseFour({ items = [] }) {
  return (
    <section className={classes['showcase-four']}>
      {items.length === 0 && (
        <div className='centered'>
          <p>ShowcaseFour is empty</p>
        </div>
      )}
      <ul className={classes['showcase-4__list']}>
        {items.map((item, index) => (
          <li key={index} className={classes['showcase-4__item']}>
            <Link to={`/collections/all/products/${item.linkId}`}>
              <img src={item.imageUrl} alt={item.title} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ShowcaseFour;
