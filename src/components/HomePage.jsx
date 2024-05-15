import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import LoginPage from './LoginPage';

function HomePage() {
    const navigate = useNavigate ();

    const handleClick = () => {
        navigate('/register');
    }

    const explore = () => {
        navigate('/rooms');
    }     

    return (
        <div className="homePageContainer">
            <div className="loginForm">
                <LoginPage />
                <p>Do not have an account? <button className="registerButton" onClick={handleClick} title="Register" >Register</button></p>
            </div>
            <Button className="exploreButton" onClick={explore} title={'Explore'} /> {/* Dugme Explore */}
        </div>
    );
}

export default HomePage;
