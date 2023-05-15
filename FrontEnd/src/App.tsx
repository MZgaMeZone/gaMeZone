import * as React from "react";
import logo from "./logo.svg";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import "./App.css";
import TimeStopGame from "./components/Games/StopWatch/timeStop";
import GameStarter from "./components/gameStart";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={ <TimeStopGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
