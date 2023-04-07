import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './ShowcaseFade.module.css';

function ShowCaseFade({ items }) {
  const [checkedState, setCheckedState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCheckedState((prevState) => (prevState === 3 ? 0 : prevState + 1));
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  });

  function changeCheckedHandler(event) {
    const id = +event.target.id;
    setCheckedState(id);
  }

  return (
    <section className={classes['showcase-fade']}>
      <input
        type='radio'
        id='0'
        name='a'
        className={`${classes.check} ${classes.one}`}
        checked={checkedState === 0}
        onChange={changeCheckedHandler}
      />

      <input
        type='radio'
        id='1'
        name='a'
        className={`${classes.check} ${classes.two}`}
        checked={checkedState === 1}
        onChange={changeCheckedHandler}
      />

      <input
        type='radio'
        name='a'
        id='2'
        className={`${classes.check} ${classes.three}`}
        checked={checkedState === 2}
        onChange={changeCheckedHandler}
      />

      <input
        type='radio'
        name='a'
        id='3'
        className={`${classes.check} ${classes.four}`}
        checked={checkedState === 3}
        onChange={changeCheckedHandler}
      />

      {items.length > 0 ? (
        <div className={classes.images}>
          <div className={`${classes.image} ${classes['image-1']}`}>
            <img src={items[0].imageUrl} alt={items[0].title} />
            <Link
              to={`/collections/all/products/${items[0].id}`}
              className={classes['order-now']}
            >
              Order Now
            </Link>
          </div>

          <div className={`${classes.image} ${classes['image-2']}`}>
            <img src={items[1].imageUrl} alt={items[1].title} />
            <Link
              to={`/collections/all/products/${items[1].id}`}
              className={classes['order-now']}
            >
              Order Now
            </Link>
          </div>

          <div className={`${classes.image} ${classes['image-3']}`}>
            <img src={items[2].imageUrl} alt={items[2].title} />
            <Link
              to={`/collections/all/products/${items[2].id}`}
              className={classes['order-now']}
            >
              Order Now
            </Link>
          </div>

          <div className={`${classes.image} ${classes['image-4']}`}>
            <img src={items[3].imageUrl} alt={items[3].title} />
            <Link
              to={`/collections/all/products/${items[3].id}`}
              className={classes['order-now']}
            >
              Order Now
            </Link>
          </div>
        </div>
      ) : (
        <div className='centered'>
          <p>Items not loaded</p>
        </div>
      )}
    </section>
  );
}
export default ShowCaseFade;
