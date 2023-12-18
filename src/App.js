import logo from './logo.svg';
import './App.css';
import JoinGamePage from './components/JoinGamePage';
import HomePage from './components/HomePage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import QuestionsPage from './components/QuestionsPage';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');

  const handleUsername = (newUsername) => {
    setUsername(newUsername);
  };
  return (

    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<HomePage/>}></Route>
        <Route path = "/joingame" element = {<JoinGamePage onUsernameSubmit = {handleUsername}/>}></Route>
        <Route path = "/questions" element = {<QuestionsPage username = {username}/>}></Route>
     </Routes>      
    </BrowserRouter>
  );
}

export default App;
