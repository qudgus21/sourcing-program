import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Login } from '../pages';
import Init from './Init';

const AppRoutes = () => (
  <Router>
    <Init>
        <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        </Routes>
    </Init>
  </Router>
);

export default AppRoutes;