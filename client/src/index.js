import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Summary from './components/Summary';
import Employees  from './components/Employees';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="/dashboard?id=:empid" element={<Dashboard />} />
  <Route path="summary" element={<Summary />} />
  <Route path="/summary?id=:empid" element={<Summary />} />
  <Route path="/employees" element={<Employees />} />
  <Route path="/employees?id=:empid" element={<Employees />} />
        </Routes>
      </BrowserRouter>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
