import React, { Component } from 'react';
import {useNavigate } from 'react-router-dom';
import Button from './Button';





function HomePage() {
    const navigate = useNavigate ();
    const handleClick = () => {
        navigate('/register');
    }
    const handleClick2 = () => {
        navigate('/login');
    }    
    return (
        <div className="homePageContainer">
            {/* <button className="homePageButton" onClick = {handleClick}>
            <h1>Join <br />game</h1>
            </button>
            <br /> */}
            <Button onClick={handleClick} title={'Register'}></Button>
            <br /><br />
            <Button onClick={handleClick2} title={'Login'}></Button>
        </div>
      );
}

export default HomePage;