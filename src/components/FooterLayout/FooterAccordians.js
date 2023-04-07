import { Link } from 'react-router-dom';

import Accordian from '../UI/Accordian';
import SubscribeForm from '../UI/SubscribeForm';

import classes from './FooterAccordians.module.css';

function FooterAccordians() {
  return (
    <ul className={classes['accordian__list']}>
      <li className={classes['accordian__item']}>
        <Accordian title='Contact'>
          <p>In case of any issues get in touch with us on</p>
          <p>M: +91-9500000000</p>
          <p>M: +91-7000000000</p>
          <p>E: shoponline@demoecommerce.in</p>
        </Accordian>
      </li>

      <li className={classes['accordian__item']}>
        <Accordian title='Registered Office'>
          <p>Ecommerce Demo Application</p>
          <p>Adress: 777, Demo Peth</p>
          <p>Pune, Maharastra</p>
          <p>India-400000.</p>
        </Accordian>
      </li>

      <li className={classes['accordian__item']}>
        <Accordian title='Quick Links'>
          <p>
            <Link to='/privacy-policy'>Privacy Policy </Link>
          </p>

          <p>
            <Link to='/shipping-policy'>Shipping Policy</Link>
          </p>
          <p>
            <Link to='/terms-conditions'>Terms and Conditions</Link>
          </p>

          <p>
            <Link to='/stores'>Store Locator</Link>
          </p>
        </Accordian>
      </li>

      <li className={classes['accordian__item']}>
        <Accordian title='Payment Providers'>
          <img
            src='https://cdn.shopify.com/s/files/1/0563/8792/8258/files/Visa.png?v=1629367759'
            alt=''
          />
          <img
            src='https://cdn.shopify.com/s/files/1/0563/8792/8258/files/Mastercard.png?v=1629367759'
            alt=''
          />
          <img
            src='https://cdn.shopify.com/s/files/1/0563/8792/8258/files/UPI.png?v=1629367759'
            alt=''
          />
          <img
            src='https://cdn.shopify.com/s/files/1/0563/8792/8258/files/Razarpay.png?v=1629367759'
            alt=''
          />
          <img
            src='https://cdn.shopify.com/s/files/1/0563/8792/8258/files/Gpay.png?v=1629367759'
            alt=''
          />
          <img
            src='https://cdn.shopify.com/s/files/1/0563/8792/8258/files/American_Express.png?v=1629367759'
            alt=''
          />
          <img
            src='https://cdn.shopify.com/s/files/1/0563/8792/8258/files/Amazon_Pay.png?v=1629367759'
            alt=''
          />
          <img
            src='https://cdn.shopify.com/s/files/1/0563/8792/8258/files/Diners_Card.png?v=1629367759'
            alt=''
          />
          <img
            src='https://cdn.shopify.com/s/files/1/0563/8792/8258/files/Phone_Pay.png?v=1629367759'
            alt=''
          />
        </Accordian>
      </li>

      <li
        className={`${classes['accordian__item']} ${classes['subscribe-form']}`}
      >
        <Accordian title='Offers & Updates'>
          <SubscribeForm label='For Offers & Updates' />
        </Accordian>
      </li>
    </ul>
  );
}

export default FooterAccordians;
