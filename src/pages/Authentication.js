import { json, redirect } from 'react-router-dom';

import { LOGIN_URL, SIGNUP_URL } from '../lib/api';
import AuthForm from '../components/Auth/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;

  const mode = searchParams.get('mode') || 'login';
  let url =
    mode === 'login'
      ? LOGIN_URL
      : mode === 'signup'
      ? SIGNUP_URL
      : 'Wrong Mode';

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode' }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
    returnSecureToken: true,
  };

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(authData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user' }, { status: 500 });
  }

  const resData = await response.json();

  const token = resData.idToken;
  const userId = resData.localId;
  const userEmail = resData.email;
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
  localStorage.setItem('userEmail', userEmail);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}

// for 3sec testing
// expiration.setMilliseconds(expiration.getMilliseconds() + 3000);
