import React, { Component } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useEffect } from 'react';

function ResultsPage({username, result,resetResult}) {
    
    const navigate = useNavigate();



    const handleClick = () => {
        resetResult();       
        navigate('/questions');
    }    
    const user = localStorage.getItem('user');
    const roomname = localStorage.getItem('naziv_sobe');
    const handleBack = () => {
      navigate('/rooms');
  }
    
    const handleSaveResult = async () => {
        try {
            console.log(user);
            console.log(roomname);
            console.log(result);
          const response = await fetch('http://127.0.0.1:8000/api/rezultati', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              naziv_sobe: roomname,
              ime_igraca: user,
              trenutni_rezultat: result,
            }),
          });
    
          if (response.ok) {
            console.log('Rezultat je uspješno spremljen.');
          } else {
            console.error('Neuspješno spremanje rezultata.');

          }
        } catch (error) {
          console.error('Greška prilikom slanja rezultata:', error);
    
        }
      };
    return ( 
        <>
        <button onClick={handleBack} className='backButton'>Back</button>
        <div className = "joinGameContainer">
            <h2  className = "usernameLabel">{username}, vas rezultat je {result} </h2><br />

        <Button onClick={handleClick} title={'Play again'}></Button>
        <Button onClick={handleSaveResult} title={'Sacuvaj'}></Button>
        </div>
        </>

     );
}

export default ResultsPage;