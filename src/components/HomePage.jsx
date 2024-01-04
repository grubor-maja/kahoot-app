import React, { Component } from 'react';
import {useNavigate } from 'react-router-dom';




function HomePage() {
    const navigate = useNavigate ();
    const handleClick = () => {
        navigate('/joingame');
    }
    return (
        <div className="homePageContainer">
            <button className="homePageButton" onClick = {handleClick}>
            <h1>Join <br />game</h1>
            </button>
            
        </div>
      );
}

export default HomePage;