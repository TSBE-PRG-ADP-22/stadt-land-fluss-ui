import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Create from './pages/Create';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import GameResult from './pages/GameResult';
import RoundResult from './pages/RoundResult';
import NotFound from './pages/NotFound';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="create" element={<Create/>} />
        <Route path="lobby" element={<Lobby/>} />
        <Route path="game" element={<Game/>} />
        <Route path="results" element={<GameResult/>} />
        <Route path="round-result" element={<RoundResult/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
};


export default Router;
