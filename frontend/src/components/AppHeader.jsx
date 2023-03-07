import { Link, NavLink } from 'react-router-dom';

const AppHeader = () => (
  <header className='app-header'>
    <h1>
      <Link to='/'>
        Task Tracker
      </Link>
    </h1>
    <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='about'>About</NavLink>
    </nav>
  </header>
);

export default AppHeader;
