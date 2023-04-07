import { sendEmailForSubscribe } from '../lib/api';

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  if (!email) return { message: 'Email not entered!' };

  const subscription = { email: email };
  try {
    const data = await sendEmailForSubscribe(subscription);
    return data;
  } catch (err) {
    throw Error('Server Error cannot submit');
  }
}
