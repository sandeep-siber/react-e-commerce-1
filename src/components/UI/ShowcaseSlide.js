import { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './ShowcaseSlide.module.css';

function ShowcaseSlide({ items, imageHeight, heading }) {
  const [index, setIndex] = useState(0);
  const customStyle = {
    height: `${imageHeight}rem`,
  };

  let sliderClasses = classes['showcase-list'];
  if (index === 2) {
    sliderClasses = `${classes['showcase-list']} ${classes['next-2-4']}`;
  }

  if (index === 4) {
    sliderClasses = `${classes['showcase-list']} ${classes['next-4-6']}`;
  }

  if (index === 6) {
    sliderClasses = `${classes['showcase-list']} ${classes['next-6-8']}`;
  }

  function nextClickHandler() {
    if (index === 8) {
      setIndex(0);
    }
    setIndex((prevIndex) => prevIndex + 2);
  }
  function prevClickHandler() {
    if (index === 0) {
      return;
    }
    setIndex((prevIndex) => prevIndex - 2);
  }

  return (
    <section className={classes['showcase-slide']}>
      <div className={classes.container}>
        <header>
          <h1>{heading}</h1>
        </header>

        <button className={classes['btn-prev']} onClick={prevClickHandler}>
          {'<'}
        </button>
        <button className={classes['btn-next']} onClick={nextClickHandler}>
          {'>'}
        </button>

        <article className={classes['slide-container']}>
          <ul className={sliderClasses}>
            {items.map((item, index) => (
              <li key={index} className={classes['showcase-item']}>
                <Link
                  to={!item.id ? '/' : `/collections/all/products/${item.id}`}
                >
                  <div
                    className={classes['showcase-image']}
                    style={customStyle}
                  >
                    <img src={item.imageUrl} alt={item.title} />
                  </div>
                  <div>
                    <p>{item.title}</p>
                    <p>
                      <span>from Rs. {item.price}</span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
export default ShowcaseSlide;
