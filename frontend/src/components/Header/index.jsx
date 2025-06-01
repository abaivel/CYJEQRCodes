import '../../style/Header.css';
import logo from '../../assets/images/white_logo_cyje2.png'
import logoDrawer from '../../assets/images/logowhite.png'
import { NavLink } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function Header() {
  const [isStaff, setIsStaff] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)

  useEffect(() => {
    fetch("/api/authorized/", {
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
          className={({ isActive }) => isActive ? "header_link active" : "header_link"}>
          Mes QR Codes
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
      <IconButton aria-label="delete" onClick={()=>setOpenDrawer(true)} className='header-icon-open-drawer'>
        <MenuIcon />
      </IconButton>
      <Drawer open={openDrawer} onClose={()=>setOpenDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={()=>setOpenDrawer(false)} className="header-drawer">
        <List>
          <ListItem>
            <img src={logoDrawer} alt="logo de CYJE" className='drawer_logo_cyje'/>
          </ListItem>
          <ListItem>
            <NavLink 
              to="/mesqrcodes" 
              className={({ isActive }) => isActive ? "header_link active" : "header_link"}>
              Mes QR Codes
            </NavLink>
          </ListItem>
          {isStaff &&
            <ListItem>
              <NavLink 
                to="/utilisateurs" 
                className={({ isActive }) => isActive ? "header_link active" : "header_link"}>
                Utilisateurs
              </NavLink>
            </ListItem>
          }
          <ListItem>
            <NavLink 
              to="/profil" 
              className={({ isActive }) => isActive ? "header_link active" : "header_link"}>
              Mon compte
            </NavLink>
          </ListItem>
        </List>
      </Box>
      </Drawer>
    </div>
  );
}

export default Header;