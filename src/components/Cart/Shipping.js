import React from 'react';

import Button from '../UI/Button';
import Card from '../UI/Card';

import classes from './Shipping.module.css';

/* MAKE THIS PAGE VERY SMALL  */

const Shipping = (props) => {
  return (
    <div className={classes.shipping}>
      <h3>Ship to</h3>

      <Card className={classes.address}>
        <p>A Wing, Flat No. 20001, Empire Tower</p>
        <p>Main Road, Haveri</p>
        <p>PIN: 581110</p>
        <p>Contact: 9800012345</p>
        <Button>Edit </Button>
      </Card>

      <div className={classes['shipping__actions']}>
        <button className={classes.back} onClick={props.onBackToCart}>
          Back to Cart
        </button>
        <Button>ORDER NOW</Button>
      </div>
    </div>
  );
};

export default Shipping;
