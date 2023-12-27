import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function JoinGamePage({onUsernameSubmit}) {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const handleClick = () => {
        onUsernameSubmit(username);
        navigate('/startgame');
    }
   

    
    return ( 
        <>
        <div className = "joinGameContainer">
            <h2  className = "usernameLabel">Enter username: </h2>
            <input type="text" className = "textField" value = {username} onChange = {(e) => setUsername(e.target.value)}/>
        <br />
        <button className = "buttonNext" onClick={handleClick}>Next</button>
        </div>

        {/* <label htmlFor="">Select number of questions</label>
        <input type="radio" />
        <input type="radio" /> */}
        </>
     );
}

export default JoinGamePage;
