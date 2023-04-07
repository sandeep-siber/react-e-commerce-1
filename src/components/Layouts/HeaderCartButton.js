import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import CartIcon from '../UI/icons/CartIcon';

import classes from './HeaderCartButton.module.css';

function HeaderCartButton(props) {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const [isButtonHighlighted, setIsButtonHighlighted] = useState(false);

  const buttonClasses = `${classes.button} ${
    isButtonHighlighted ? classes.bump : ''
  }`;

  useEffect(() => {
    if (cartQuantity.length === 0) {
      return;
    }

    setIsButtonHighlighted(true);

    const timer = setTimeout(() => {
      setIsButtonHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartQuantity]);

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
}

export default HeaderCartButton;
