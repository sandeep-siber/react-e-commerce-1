import React from 'react';
import { useCallback, useRef } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './SubscribeForm.module.css';

function SubscribeForm({ label }) {
  const emailEl = useRef();
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  if (state === 'idle') {
    if (data) {
      console.log(data && data);
      if (!data.isDuplicate) {
        emailEl.current.value = '';
      }
    }
  }

  const signupForNewsLetterHanlder = useCallback(
    (event) => {
      event.preventDefault();
      const enteredEmail = emailEl.current.value;
      console.log('submitting val: ', enteredEmail);
      fetcher.submit(
        { email: enteredEmail },
        { method: 'post', action: '/newsletter' }
      );
    },
    [fetcher]
  );

  return (
    <fetcher.Form
      className={classes['subscribe-form']}
      onSubmit={signupForNewsLetterHanlder}
    >
      <div className={classes['subscribe-form__container']}>
        <h2>{label}</h2>
        <input
          type='email'
          required
          placeholder='Enter Your E-Mail'
          ref={emailEl}
        />

        <button disabled={state === 'submitting'}>
          {state === 'submitting' ? 'Subscribing...' : 'SUBSCRIBE NOW'}
        </button>
      </div>
    </fetcher.Form>
  );
}

export default React.memo(SubscribeForm);
