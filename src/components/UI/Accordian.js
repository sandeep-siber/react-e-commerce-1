import classes from './Accordian.module.css';

function Accordian({ children, title, opened }) {
  const titleClass = !opened
    ? classes['accordian__title']
    : classes['accordian__title-opened'];

  return (
    <div className={classes.accordian}>
      <input className={classes['accordian__toggle']} type='checkbox' />

      <h2 className={titleClass}>{title}</h2>

      <div className={classes['accordian__content']}>{children}</div>
    </div>
  );
}
export default Accordian;
