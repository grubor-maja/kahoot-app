
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JoinGamePage from './components/JoinGamePage';
import HomePage from './components/HomePage';
import QuestionsPage from './components/QuestionsPage';
import StartGame from './components/StartGame';
import ResultsPage from './components/ResultsPage';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [result, setResult] = useState(0);
  const [timeLeftMultiplier, setTimeLeftMultiplier] = useState(10); // Dodajte timeLeftMultiplier
  const [difficultyVariable, setDifficultyVariable] = useState('');
  const handleResult = (newResult) => {
    setResult(newResult);
  };

  const resetResult = () => {
    setResult(0);
  };
  const handleDifficulty = (newDifficluty) => {
    setDifficultyVariable(newDifficluty);
  };

  const handleUsername = (newUsername) => {
    setUsername(newUsername);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/joingame" element={<JoinGamePage onUsernameSubmit={handleUsername} />} />
        <Route path="/startgame" element={<StartGame username={username} handleDifficulty = {handleDifficulty} />} />
        <Route
          path="/questions"
          element={<QuestionsPage handleResult={handleResult} result={result} timeLeftMultiplier={timeLeftMultiplier} difficulty={difficultyVariable} />}
        />
        <Route
          path="/results"
          element={<ResultsPage username={username} result={result} resetResult={resetResult} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;