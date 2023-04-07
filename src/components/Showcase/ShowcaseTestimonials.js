import { useState } from 'react';
import { Link } from 'react-router-dom';

import StarIcon from '../UI/icons/StarIcon';

import classes from './ShowcaseTestimonials.module.css';
function ShowcaseTestimonials({ items }) {
  const [slide, setSlide] = useState(0);

  function nextClickHandler() {
    const length = (items.length - 1) * -100;
    if (slide === length) {
      return;
    }
    setSlide((prevSlide) => prevSlide - 100);
  }

  function prevClickHandler() {
    if (slide === 0) {
      return;
    }
    setSlide((prevSlide) => prevSlide + 100);
  }

  const style = {
    transform: `translateX(${slide}%)`,
  };

  return (
    <section className={classes.testimonials}>
      <h2 className={classes['testimonials__title']}>WHAT THEY ARE SAYING</h2>

      <div className={classes['testimonials__container']}>
        <div className={classes.left} onClick={prevClickHandler}>
          <span>{'<'}</span>
        </div>
        <div className={classes.right} onClick={nextClickHandler}>
          <span>{'>'}</span>
        </div>

        <ul className={classes['testimonials__list']} style={style}>
          {items.map((item, index) => (
            <li key={index} className={classes['testimonials__item']}>
              <Link to={'/'}>
                <p>
                  <span className={classes.icon}>
                    <StarIcon />
                  </span>
                  <span className={classes.icon}>
                    <StarIcon />
                  </span>
                  <span className={classes.icon}>
                    <StarIcon />
                  </span>
                  <span className={classes.icon}>
                    <StarIcon />
                  </span>
                  <span className={classes.icon}>
                    <StarIcon />
                  </span>
                </p>

                <h2>{item.buyer}</h2>

                <p>{item.remark}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export default ShowcaseTestimonials;
