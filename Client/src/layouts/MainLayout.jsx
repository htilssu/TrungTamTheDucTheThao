import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Footer from '../modules/core/components/Footer.jsx';
import Navbar from '../modules/core/components/Navbar.jsx';

export function MainLayout() {
  return (
      <div className={'w-full overflow-hidden min-h-screen'}>

        < div className="fixed top-0 left-0 w-screen z-10">
          <Navbar/>
        </div>

        <div className={'mt-20'}>
          <div className={'w-full'}></div>
          <Outlet/>
        </div>
        <ToastContainer/>;
        <Footer/>;
      </div>
  );
}
