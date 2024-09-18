import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Footer from '../modules/core/components/Footer.jsx';
import Navbar from '../modules/core/components/Navbar.jsx';

export function MainLayout() {
  return (
      <div className={'w-full'}>
        <Navbar/>
        <div>
          <div className={'w-full'}></div>
          <Outlet/>
        </div>
        <ToastContainer/>
        <Footer/>
      </div>
  );
}
