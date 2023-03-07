import { useRouteError, Link } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <section className='error'>
      <h3>Oops, {error?.message || 'looks like something went wrong'} :(</h3>
      <p>
        <Link to='/'>‹ Back to homepage</Link>
      </p>
    </section>
  );
};

export default ErrorBoundary;
