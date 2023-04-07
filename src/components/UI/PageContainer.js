import classes from './PageContainer.module.css';
function PageContainer({ children }) {
  return <div className={classes['page-container']}>{children}</div>;
}

export default PageContainer;
