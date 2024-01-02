import React, { Component } from 'react';



function Question({key, answer, handleAnswerClick, klasa}) {
    return (
        <>
        <div className='answerRectangle' key={key} handleAnswerClick={handleAnswerClick}>{answer}</div>
        </>
      );
}

export default Question;

