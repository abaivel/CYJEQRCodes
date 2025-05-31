import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import {useState, useEffect} from 'react';

export default function MainLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
      fetch("api/csrf/", {
        credentials: "include",
      });
      const checkAuth = async () => {
        const response = await fetch("http://localhost:8000/api/check-auth/", {
          credentials: "include",
        });
  
        const data = await response.json();
  
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
           window.location.replace('/');
        }
      };
  
      checkAuth();
    }, []);

  return (
    <div className="main-layout">
      {isAuthenticated != null && isAuthenticated &&
      <div>
        <Header />
        <Outlet />
      </div>
      }
    </div>
  );
}