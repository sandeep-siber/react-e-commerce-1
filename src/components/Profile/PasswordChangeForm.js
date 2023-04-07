import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Card from '../UI/Card';

import classes from '../../components/Auth/AuthForm.module.css';
import passClasses from './PasswordChange.module.css';

function PasswordChangeForm() {
  const [startChangePassword, setStartChangePassword] = useState(false);

  const newPasswordInputRef = useRef();
  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();

  const toggleChangePasswordHandler = () => {
    setStartChangePassword((prvState) => !prvState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDU9_Ti8XV_nwJzzt6H7-0lIFBWdMDlVhQ',
      {
        method: 'post',
        body: JSON.stringify({
          idToken: token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        console.log(res);
        navigate('/account', { replace: true });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Card className={passClasses.container}>
      <button
        type='button'
        className={passClasses['auth__button']}
        onClick={toggleChangePasswordHandler}
      >
        Click to Change Password
      </button>

      {startChangePassword && (
        <form className={classes.auth} onSubmit={submitHandler}>
          <div className={classes['form-control']}>
            <label htmlFor='new-password'>New Password</label>
            <input
              type='password'
              id='new-password'
              ref={newPasswordInputRef}
              autoFocus
            />
          </div>

          <div className={classes.actions}>
            <button>Change Password</button>
          </div>
        </form>
      )}
    </Card>
  );
}

export default PasswordChangeForm;
