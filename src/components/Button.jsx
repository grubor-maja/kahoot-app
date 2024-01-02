import React, { Component } from 'react';


function Button({title,onClick}) {
    return (

        <>
            <button className='buttonNext' onClick={onClick}>{title}</button>
        </>

      );
}

export default Button;