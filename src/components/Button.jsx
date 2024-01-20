import React from 'react';

function Button({ title, onClick, difficulty }) {
  const handleClick = () => {
    onClick(difficulty);
  };

  return (
    <>
      <button className='buttonNext' onClick={handleClick}>
        {title}
      </button>
    </>
  );
}

export default Button;
