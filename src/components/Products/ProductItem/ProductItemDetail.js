import React from 'react';

import Button from '../../UI/Button';
import WishIcon from '../../UI/icons/WishIcon';

import classes from './ProductItemDetail.module.css';

const ProductItemDetail = (props) => {
  return (
    <section className={classes.centered}>
      <h1>Alphonso Mango Pulp (Sweetened)</h1>
      <hr />
      <div className={classes.image}>
        <img
          src='https://cdn.shopify.com/s/files/1/0563/8792/8258/products/alphonso-mango-pulp-sweetened-pulp-chitale-agro-595337_600x.jpg?v=1649931278'
          alt='<%= product.title %>'
        />
      </div>
      <h2>Rs. 50</h2>
      <p>Net Weight 500g</p>

      <div className={classes.quantity}>
        <input type='number' min='1' max='5' step='1' defaultValue='1' />
        <Button>Add to Cart</Button>
      </div>
      <br />
      <p className={classes.wishlist}>
        <span className={classes.icon} title='Add to Wishlist'>
          <WishIcon />
        </span>
        <span>Wishlist</span>
      </p>

      <p>
        <span>Product Type: Pulp</span>
      </p>
      <p>
        Made from best varieties of handpicked mangoes. It is widely consumed
        for it's 100% natural taste that contains no preservatives, added
        colours or flavours. It has a shelf life of 6 months.
      </p>
    </section>
  );
};

export default ProductItemDetail;
