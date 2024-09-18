import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Footer from '../modules/core/components/Footer.jsx';

export function MainLayout() {
  return (
    <div className={"w-full"}>
      {/*add thanh NavBar*/}

      <div className={"mt-24"}>
        <div className={"w-full"}></div>
        <Outlet />
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}
