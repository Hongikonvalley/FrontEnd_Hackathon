import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="pb-16">
        <Outlet />
      </div>
    </div>
  );
}
