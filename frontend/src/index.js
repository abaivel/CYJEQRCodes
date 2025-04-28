import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import Connexion from './pages/Connexion';
import ListQRCodes from './pages/ListQRCodes';
import QRCode from './pages/QRCode';
import Profile from './pages/Profile';
import ListUsers from './pages/ListUsers';
import Link from './pages/Link';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginLayout from './layouts/LoginLayout';
import MainLayout from './layouts/MainLayout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      light: '#c2c9e4',
      main: '#1e3a84',
      dark: '#000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#eda02c',
      dark: '#d89024',
      contrastText: '#fff',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline />
        <Router>
            <Routes>
                 {/* Routes sans header */}
                <Route element={<LoginLayout />}>
                  <Route path="/" element={<Connexion />} />
                </Route>
                {/* Routes avec header */}
                <Route element={<MainLayout />}>
                  <Route path="/mesqrcodes" element={<ListQRCodes />} />
                  <Route path="/qrcode/:idQRCode" element={<QRCode />} />
                  <Route path="/profil" element={<Profile />} />
                  <Route path="/utilisateurs" element={<ListUsers />} />
                  {/* Ajoute ici toutes tes autres pages avec header */}
                </Route>
                <Route path="/link/:sharelink" element={<Link/>}/>
            </Routes>
            
                  </Router>
                  </ThemeProvider>
    </React.StrictMode>
);


