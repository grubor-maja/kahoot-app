import React, { Component } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResultsPage({username}) {
    const result=9;
    const navigate = useNavigate();
    const handleClick = () => {       
        navigate('/questions');
    }    
    return ( 
        <>
        <div className = "joinGameContainer">
            <h2  className = "usernameLabel">{username}, vas rezultat je {result} </h2><br />
        <button className = "buttonNext" onClick={handleClick} >Play again</button>
        </div>
        </>

     );
}

export default ResultsPage;