import { useRouteError } from 'react-router-dom';
import Header from '../components/Layouts/Header';

function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <Header />
      <main>
        <h1>Error </h1>
        <p>Could not find url</p>
        <p>{error.message}</p>
      </main>
    </>
  );
}

export default ErrorPage;
