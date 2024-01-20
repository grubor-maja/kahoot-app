import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function StartGame({ username, handleDifficulty }) {
  const navigate = useNavigate();
  

  const handleClick = (difficulty) => {
    handleDifficulty(difficulty);
    navigate('/questions', { state: { difficulty } });
  };

  return (
    <div className="joinGameContainer">
      <h2 className="usernameLabel">Welcome {username}, choose quiz difficulty </h2>
      <br />
      <Button onClick={() => handleClick('easy')} title={'Easy'}></Button>
      <Button onClick={() => handleClick('medium')} title={'Medium'}></Button>
      <Button onClick={() => handleClick('hard')} title={'Hard'}></Button>
    </div>
  );
}

export default StartGame;
