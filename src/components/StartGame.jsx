import React, { Component } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StartGame({username}) {
    const navigate = useNavigate();
    const handleClick = () => {       
        navigate('/questions');
    }
    return ( 
        <>
        
        <div className = "joinGameContainer">
            <h2  className = "usernameLabel">Welcome {username} </h2><br />
        <button className = "buttonNext" onClick={handleClick}>Start game</button>
        </div>

 
        </>

     );
}

export default StartGame;