import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className='error'>
    <h3>Oops, looks like that page was not found:(</h3>
    <p>
      <Link to='/'>‹ Back to homepage</Link>
    </p>
  </section>
);

export default NotFound;
