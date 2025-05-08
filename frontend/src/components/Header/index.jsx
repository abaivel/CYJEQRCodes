import '../../style/Header.css';
import logo from '../../assets/images/white_logo_cyje2.png'
import { NavLink } from 'react-router-dom'
import React, { useRef, useEffect, useState } from 'react';

function Header() {
  const [isStaff, setIsStaff] = useState(false)

  useEffect(() => {
    fetch("http://localhost:8000/api/authorized/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.is_staff) {
          setIsStaff(true);
        } else {
          setIsStaff(false);
        }
      });
  }, []);

  return (
    <div className="header_container">
      <img src={logo} alt="logo de CYJE" className='header_logo_cyje'/>
      <div className='header_menu'>
        <NavLink 
          to="/mesqrcodes" 
          className={({ isActive }) => isActive ? "header_link active" : "header_link"}
        >
          Mes QR Codes
        </NavLink>
        <NavLink 
          to="/stats" 
          className={({ isActive }) => isActive ? "header_link active" : "header_link"}
        >
          Statistiques
        </NavLink>
        {isStaff &&
          <NavLink 
            to="/utilisateurs" 
            className={({ isActive }) => isActive ? "header_link active" : "header_link"}
          >
            Utilisateurs
          </NavLink>
        }
        <NavLink 
          to="/profil" 
          className={({ isActive }) => isActive ? "header_link active" : "header_link"}
        >
          Mon compte
        </NavLink>
      </div>
    </div>
  );
}

export default Header;