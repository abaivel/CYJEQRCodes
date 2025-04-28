import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <Outlet />
    </div>
  );
}