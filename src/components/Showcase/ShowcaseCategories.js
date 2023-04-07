import { Link } from 'react-router-dom';
import classes from './ShowcaseCategories.module.css';

function ShowcaseCategories({ items: categories }) {
  if (!categories || categories.length === 0) {
    return (
      <div className='centered'>
        <p className={classes['loading-text']}>No categories found</p>
      </div>
    );
  }

  const listItems = categories.map((item) => (
    <li key={item.id} className={classes.item}>
      <Link to={'/collections/' + item.id}>
        <div className={classes['item__image']}>
          <img src={item.imageUrl} alt={item.title} />
        </div>
        <h3 className={classes['item__title']}>{item.title}</h3>
      </Link>
    </li>
  ));

  return (
    <section className={classes.categories}>
      <div className={classes.container}>
        <header>
          <h1>Feast on the Wonders of Taste & Happiness!</h1>
        </header>
        <article>
          <ul className={classes['category__list']}>{listItems}</ul>
        </article>
      </div>
    </section>
  );
}

export default ShowcaseCategories;
