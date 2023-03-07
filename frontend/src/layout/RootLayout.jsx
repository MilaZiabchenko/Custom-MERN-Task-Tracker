import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';

const RootLayout = () => (
  <div className='full-screen'>
    <AppHeader />
    <main className='container'>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default RootLayout;
