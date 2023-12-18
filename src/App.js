import logo from './logo.svg';
import './App.css';
import JoinGamePage from './components/JoinGamePage';
import HomePage from './components/HomePage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<HomePage/>}></Route>
        <Route path = "/joingame" element = {<JoinGamePage/>}></Route>
     </Routes>      
    </BrowserRouter>
  );
}

export default App;
