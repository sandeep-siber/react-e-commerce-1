import React, { useState, useEffect, useRef } from 'react';

import Button from '../UI/Button';
import ArrowLeftLongIcon from '../UI/icons/ArrowLeftLongIcon';

import useHttp from '../../hooks/useHttp';
import { getUserProfile } from '../../lib/api';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const is10Chars = (value) => value.trim().length === 10;
const is5Chars = (value) => value.trim().length === 6;
const validEmail = (email) => email.includes('@');

const Checkout = (props) => {
  const userId = localStorage.getItem('userId');
  const userEmail = localStorage.getItem('userEmail');

  const {
    sendRequest: fetchUserDetails,
    status,
    data: userDetails,
    error,
  } = useHttp(getUserProfile, false);

  const [formInputsValidity, setFormInputValidity] = useState({
    name: true,
    mobile: true,
    pin: true,
    area: true,
    email: true,
  });

  const nameInputRef = useRef();
  const mobileInputRef = useRef();
  const pinInputRef = useRef();
  const areaInputRef = useRef();
  const emailInputRef = useRef();

  useEffect(() => {
    if (!userId) return;

    fetchUserDetails(userId);
  }, [userId, fetchUserDetails]);

  const profile = {
    name: userDetails ? userDetails.name : '',
    mobile: userDetails ? userDetails.mobile : '',
    pin: userDetails ? userDetails.pin : '',
    area: userDetails ? userDetails.area : '',
    email: userEmail,
    userId: userId,
  };

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredMobile = mobileInputRef.current.value;
    const enteredPin = pinInputRef.current.value;
    const enteredArea = areaInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredMobileIsValid = is10Chars(enteredMobile);
    const enteredPinIsValid = is5Chars(enteredPin);
    const enteredAreaIsValid = !isEmpty(enteredArea);
    const enteredEmailIsValid = validEmail(enteredEmail);

    const formIsValid =
      enteredNameIsValid &&
      enteredMobileIsValid &&
      enteredPinIsValid &&
      enteredAreaIsValid &&
      enteredEmailIsValid;

    setFormInputValidity({
      name: enteredNameIsValid,
      mobile: enteredMobileIsValid,
      pin: enteredPinIsValid,
      area: enteredAreaIsValid,
      email: enteredEmailIsValid,
    });

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      mobile: enteredMobile,
      pin: enteredPin,
      area: enteredArea,
      email: enteredEmail,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;
  const mobileControlClasses = `${classes.control} ${
    formInputsValidity.mobile ? '' : classes.invalid
  }`;
  const pinControlClasses = `${classes.control} ${
    formInputsValidity.pin ? '' : classes.invalid
  }`;
  const areaControlClasses = `${classes.control} ${
    formInputsValidity.area ? '' : classes.invalid
  }`;
  const emailControlClasses = `${classes.control} ${
    formInputsValidity.email ? '' : classes.invalid
  }`;

  if (status === 'pending') {
    return (
      <div className='centered'>
        <p>Loading...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className='centered'>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <form onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          defaultValue={profile.name}
          ref={nameInputRef}
        />
        {!formInputsValidity.name && <p>Please enter valid name</p>}
      </div>

      <div className={mobileControlClasses}>
        <label htmlFor='mobile'>Mobile</label>
        <input
          type='text'
          id='mobile'
          defaultValue={profile.mobile}
          ref={mobileInputRef}
        />
        {!formInputsValidity.mobile && <p>Please enter valid mobile</p>}
      </div>

      <div className={pinControlClasses}>
        <label htmlFor='pin'>PIN Code</label>
        <input
          type='text'
          id='pin'
          defaultValue={profile.pin}
          ref={pinInputRef}
        />
        {!formInputsValidity.pin && <p>Please enter valid pincode</p>}
      </div>

      <div className={areaControlClasses}>
        <label htmlFor='area'>Area</label>
        <input
          type='text'
          id='area'
          defaultValue={profile.area}
          ref={areaInputRef}
        />
        {!formInputsValidity.area && <p>Please enter valid area</p>}
      </div>

      <div className={emailControlClasses}>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          id='email'
          defaultValue={userEmail}
          disabled
          ref={emailInputRef}
        />
        {!formInputsValidity.email && <p>Please enter valid email</p>}
      </div>

      <div className={classes.actions}>
        <button
          type='button'
          className={classes.back}
          onClick={props.onBackToCart}
        >
          <span className={classes.icon}>
            <ArrowLeftLongIcon />
          </span>
          <span>Back to Cart</span>
        </button>

        <Button type='submit' className={classes.submit}>
          Confirm
        </Button>
      </div>
    </form>
  );
};

export default Checkout;
