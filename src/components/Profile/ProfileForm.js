import React, { useState, useRef } from 'react';

import Button from '../UI/Button';

import classes from './ProfileForm.module.css';

const isEmpty = (value) => value.trim() === '';
const is10Chars = (value) => value.trim().length === 10;
const is5Chars = (value) => value.trim().length === 6;
const validEmail = (email) => email.includes('@');

const ProfileForm = (props) => {
  const userId = localStorage.getItem('userId');
  const userEmail = localStorage.getItem('userEmail');

  const [startEditing, setStartEditing] = useState(false);

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

  const startEditHandler = () => {
    if (startEditing) {
      setStartEditing(false);
      setFormInputValidity({
        name: true,
        mobile: true,
        pin: true,
        area: true,
        email: true,
      });
    } else {
      setStartEditing(true);
    }
  };

  const updateProfileHandler = () => {
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

    setStartEditing(false);
    props.onConfirm({
      userId: userId,
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

  let profile = {
    name: '',
    mobile: '',
    pin: '',
    area: '',
  };
  if (props.fetchInfo.fetchedUserProfile) {
    profile = {
      name: props.fetchInfo.fetchedUserProfile.name || '',
      mobile: props.fetchInfo.fetchedUserProfile.mobile || '',
      pin: props.fetchInfo.fetchedUserProfile.pin || '',
      area: props.fetchInfo.fetchedUserProfile.area || '',
    };
  }

  return (
    <form>
      <div className={classes.container}>
        <h2>Profile</h2>

        {props.updateInfo.updatStatus === 'pending' && <p>Updating...</p>}

        {props.updateInfo.updateError && <p>{props.updateInfo.updateError}</p>}

        {props.fetchInfo.fetchUserDetailsStatus === 'pending' && (
          <p>Loading profile...</p>
        )}

        {props.fetchInfo.fetchUserDetailsError && (
          <p>{props.fetchInfo.fetchUserDetailsError}</p>
        )}

        <div className={nameControlClasses}>
          <label htmlFor='name'>Your Name</label>
          <input
            type='text'
            id='name'
            disabled={!startEditing}
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
            disabled={!startEditing}
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
            disabled={!startEditing}
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
            disabled={!startEditing}
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
            disabled
            defaultValue={userEmail}
            ref={emailInputRef}
          />
          {!formInputsValidity.email && <p>Please enter valid email</p>}
        </div>

        <div className={classes.actions}>
          <Button type='button' onClick={startEditHandler}>
            {startEditing ? 'Cancel' : 'Edit'}
          </Button>

          <Button
            type='button'
            disabled={!startEditing}
            onClick={updateProfileHandler}
          >
            Update
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
