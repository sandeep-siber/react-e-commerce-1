import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from 'react-router-dom';

import useInput from '../../hooks/useInput';
import Card from '../UI/Card';

import classes from './AuthForm.module.css';

const validEmail = (email) => email.includes('@');
const validPassword = (password) => password.trim().length > 5;

function AuthForm() {
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    // reset: resetEmailInput,
  } = useInput(validEmail);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    // reset: resetPasswordInput,
  } = useInput(validPassword);

  const comparePassword = (confirmPassword) => {
    const inputPassword = enteredPasswordIsValid && enteredPassword;
    return confirmPassword === inputPassword;
  };

  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    // reset: resetConfirmPasswordInput,
  } = useInput(comparePassword);

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  const data = useActionData();
  if (data) {
    console.log('data ', data);
    Object.values(data.error.errors).map((err) => console.log(err.message));
  }
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  let formIsValid = false;
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    if (isLogin) {
      formIsValid = true;
    } else if (confirmPasswordIsValid) {
      formIsValid = true;
    }
  }

  const emailInputClasses = !emailInputHasError
    ? classes['form-control']
    : `${classes['form-control']} ${classes['invalid']}`;

  const passwordInputClasses = !passwordInputHasError
    ? classes['form-control']
    : `${classes['form-control']} ${classes['invalid']}`;

  const confirmPasswordClasses = !confirmPasswordInputHasError
    ? classes['form-control']
    : `${classes['form-control']} ${classes['invalid']}`;

  return (
    <Card className={classes.wrapper}>
      <Form method='post' className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign up'}</h1>

        <div className={classes.errors}>
          {data && data.error && (
            <ul>
              {Object.values(data.error.errors).map((err) => (
                <li key={err}>{err.message}</li>
              ))}
            </ul>
          )}
        </div>

        {/* {data && data.error && <p>{data.error.message}</p>} */}

        <div className={emailInputClasses}>
          <label htmlFor='email'>E-Mail</label>
          <input
            name='email'
            type='email'
            id='email'
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailInputHasError && <p>Invalid email entered</p>}
        </div>

        <div className={passwordInputClasses}>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            id='password'
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />
          {passwordInputHasError && <p>Password must have min 6 chars</p>}
        </div>

        {!isLogin && (
          <div className={confirmPasswordClasses}>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
              value={confirmPassword}
            />
            {confirmPasswordInputHasError && (
              <p>Confirm password does not match </p>
            )}
          </div>
        )}

        <div className={classes.actions}>
          {!false && (
            <button disabled={!formIsValid || isSubmitting}>
              {isSubmitting
                ? 'Submitting...'
                : isLogin
                ? 'Login'
                : 'Create Account'}
            </button>
          )}

          {/* {isSubmitting && <p>Sending request...</p>} */}

          <Link
            to={`?mode=${isLogin ? 'signup' : 'login'}`}
            className={classes['toggle']}
          >
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
        </div>
      </Form>
    </Card>
  );
}
export default AuthForm;
