import classes from './CartItem.module.css';

const CartItem = (props) => {
  const price = `Rs. ${props.price.toFixed(2)}`;
  const amount = `Rs. ${props.amount.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div className={classes['cart-item__image']}>
        <img src={props.imageUrl} alt={props.title} />
      </div>

      <div>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <p>{price}</p>

        <p className={classes.quantity}>
          <span>Quantity</span>
          <span>{props.quantity}</span>
          <button onClick={props.onAdd}>+</button>
          <button onClick={props.onRemove}>-</button>
        </p>

        <p>{amount}</p>
      </div>
    </li>
  );
};

export default CartItem;
