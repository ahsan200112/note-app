import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Note } from '../pages';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Note />} />
    </Routes>
  </Router>
);

export default AppRoutes;
