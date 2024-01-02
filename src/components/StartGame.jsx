import React, { Component } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function StartGame({username}) {
    const navigate = useNavigate();
    const handleClick = () => {       
        navigate('/questions');
    }
    return ( 
        <>
        
        <div className = "joinGameContainer">
            <h2  className = "usernameLabel">Welcome {username} </h2><br />
        <Button onClick ={handleClick} title= {'Start game'}></Button>
        </div>

 
        </>

     );
}

export default StartGame;