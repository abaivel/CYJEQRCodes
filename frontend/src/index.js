import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
                  </Router>
    </React.StrictMode>
);


