import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import Connexion from './pages/Connexion';
import ListQRCodes from './pages/ListQRCodes';
import QRCode from './pages/QRCode';
import Profile from './pages/Profile';
import ListUsers from './pages/ListUsers';
import Link from './pages/Link';
import Fab from '@mui/material/Fab';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginLayout from './layouts/LoginLayout';
import MainLayout from './layouts/MainLayout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ChangePassword from './pages/ChangePassword';
import Error from './pages/Error';

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
const handleOpenHelp = () => {
    window.open('/documents/Manuel_utilisation_CYJE_QRCodes.pdf', '_blank');
  };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
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
                  <Route path="/change_password" element={<ChangePassword />} />
                  <Route path="/utilisateurs" element={<ListUsers />} />
                  <Route path="*" element={<Error/>}/>
                </Route>
                <Route path="/link/:sharelink" element={<Link/>}/>
            </Routes>
            
                  </Router>
                   <Fab onClick={handleOpenHelp} variant="extended" style={{position: 'fixed',bottom: 16,right: 16}}>
                      <QuestionMarkIcon sx={{ mr: 1 }} />
                      Besoin d'aide
                    </Fab>
                  </ThemeProvider>
);


