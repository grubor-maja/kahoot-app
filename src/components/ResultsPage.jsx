import React, { Component } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function ResultsPage({username, result,resetResult}) {
    
    const navigate = useNavigate();
    const handleClick = () => {
        resetResult();       
        navigate('/questions');
    }    
    return ( 
        <>
        <div className = "joinGameContainer">
            <h2  className = "usernameLabel">{username}, vas rezultat je {result} </h2><br />

        <Button onClick={handleClick} title={'Play again'}></Button>
        </div>
        </>

     );
}

export default ResultsPage;