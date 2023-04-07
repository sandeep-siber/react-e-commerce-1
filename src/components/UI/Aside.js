import { Fragment } from 'react';
import ReactDom from 'react-dom';

import classes from './Aside.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const AsideOverlay = (props) => {
  return (
    <div className={classes.aside}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Aside = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <AsideOverlay>{props.children}</AsideOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Aside;
