import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import CustomNavbar from './components/Navigation/Navbar';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <CustomNavbar />
    <App />
    </Router>
  </React.StrictMode>,
);
