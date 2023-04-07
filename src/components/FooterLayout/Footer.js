import SubscribeForm from '../UI/SubscribeForm';
import FooterAccordians from './FooterAccordians';

import classes from './Footer.module.css';
import FooterBottomPanel from './FooterBottomPanel';

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes['subscribe-form']}>
        <SubscribeForm label='For Offers & Updates' />
      </div>

      <div className={classes.accordian}>
        <FooterAccordians />
      </div>

      <FooterBottomPanel />
    </footer>
  );
}

export default Footer;
