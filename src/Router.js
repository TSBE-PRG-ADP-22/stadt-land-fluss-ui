import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Create from './pages/Create';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import Results from './pages/Results';
import NotFound from './pages/NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="create" element={<Create/>} />
        <Route path="lobby" element={<Lobby/>} />
        <Route path="game" element={<Game/>} />
        <Route path="results" element={<Results/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
};


export default Router;
