import classes from './Orders.module.css';

function Orders({ orders, status, error }) {
  const transformedOrders = [];

  for (const orderId in orders) {
    const order = orders[orderId];
    const date = new Date(order.date);
    const orderDate = date.toLocaleDateString('en-In');

    const orderHeader = (
      <header className={classes['order-header']}>
        <h4>Order #{orderId}</h4>
        <h4>{orderDate}</h4>
      </header>
    );

    const listItems = [];
    let sum = 0;
    const items = order.orderedItems;
    for (const item of items) {
      const listItem = (
        <li key={item.id} className={classes.item}>
          <div className={classes['item__image']}>
            <img src={item.imageUrl} alt={item.title} />
          </div>

          <div>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>
              <span>&#8377;. </span>
              <span>{item.price.toFixed(2)}</span>
            </p>
          </div>

          <div className={classes.quantity}>
            <span>X </span>
            <span>{item.quantity}</span>
          </div>

          <div className={classes.amount}>
            <p>{item.totalPrice.toFixed(2)}</p>
          </div>
        </li>
      );
      listItems.push(listItem);
      sum += item.totalPrice;
    }
    const orderItems = <ul>{listItems}</ul>;

    const orderFooter = (
      <footer className={classes['order-footer']}>
        <p>
          <span>&#8377;. </span>
          <span>{sum.toFixed(2)}</span>
        </p>
      </footer>
    );

    transformedOrders.push({
      orderHeader,
      orderItems,
      orderFooter,
    });
  }

  let orderContent;
  if (status === 'pending') {
    orderContent = (
      <div className='centered'>
        <p>Loading...</p>
      </div>
    );
  }

  if (status === 'error') {
    orderContent = (
      <div className='centered'>
        <p>{error}</p>
      </div>
    );
  }

  if (
    status === 'completed' &&
    (!transformedOrders || transformedOrders.length === 0)
  ) {
    orderContent = (
      <div className='centered'>
        <p>No Orders found</p>
      </div>
    );
  }

  if (status === 'completed' && transformedOrders.length > 0)
    orderContent = (
      <ul>
        {transformedOrders.map((order, index) => (
          <li key={index} className={classes.order}>
            <>{order.orderHeader}</>
            <>{order.orderItems}</>
            <>{order.orderFooter}</>
          </li>
        ))}
      </ul>
    );

  return (
    <section className={classes.container}>
      <h2>Orders History</h2>
      {orderContent}
    </section>
  );
}

export default Orders;
