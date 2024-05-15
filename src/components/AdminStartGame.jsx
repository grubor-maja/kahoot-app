import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';


function AdminStartGame({ username, handleDifficulty }) {
  const navigate = useNavigate();
  

  const handleClick = (difficulty) => {
    handleDifficulty(difficulty);
    navigate('/questions', { state: { difficulty } });
  };
  const handleClick2 = () => {
    navigate('/createquiz');
  }
  const explore = () => {
    navigate('/rooms', { state: { username } });
  };
  function logout() {
    const token = localStorage.getItem('token'); // Dobavljanje tokena iz lokalnog skladišta
    
    axios.post('http://127.0.0.1:8000/api/logout', null, {
      headers: {
        'Authorization': `Bearer ${token}` // Dodavanje tokena u zaglavlje zahteva
      }
    }) 
    .then(response => {
      console.log(response.data);
      navigate('/');
    })
    .catch(error => {
      console.error('Error logging out:', error);
    });
  }
  
  return (
    <div className="joinGameContainer">
      <h2 className="usernameLabel">Welcome Admin: {username}</h2>
      <br />
      <Button onClick={() => handleClick2()} title={'Napravi kviz'}></Button>
      <Button onClick={() => logout()} title={'Logout'}></Button>
      <Button onClick={() => explore()} title={'Explore'}></Button>

    </div>
  );
}

export default AdminStartGame;
