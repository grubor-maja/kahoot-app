import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Counter from './Counter';
import useCountdown from './useCountdown';


function QuestionsPage() {
  const [quizData, setQuizData] = useState({
    question: '',
    answers: [],
    correctAnswer: '',
  });

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selected, setSelected] = useState(false);
  const [brojac, setBrojac] = useState(1);
  const [timeLeft, setTimeLeft] = useState(null);
  const navigate = useNavigate();
;
  const handleAnswerClick = (answer) => {
    if(!selected) {
      console.log(`Izabran odgovor: ${answer}`);
      setSelectedAnswer(answer);
      setSelected(true);
    }

  };

  const handleCountdownFinish = () => {
    if (!selected) {
      console.log('Vreme je isteklo!');
      setTimeLeft(0);
      pauseCountdown();
      handleNextClick();
    }
  };

  const { time, reset: resetCountdown, pause: pauseCountdown } = useCountdown(10, handleCountdownFinish);

  const fetchData = async () => {
    try {
      const response = await fetch('https://the-trivia-api.com/v2/questions');
      const data = await response.json();

      const randomQuestion = data[Math.floor(Math.random() * data.length)];

      setQuizData({
        question: randomQuestion.question.text,
        answers: randomQuestion.incorrectAnswers.concat(randomQuestion.correctAnswer),
        correctAnswer: randomQuestion.correctAnswer,
      });

      // Reset selected answer on new question
      setSelectedAnswer(null);
      setTimeLeft(null);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

 

 

  const handleNextClick = () => {
    setBrojac((prevBrojac) => prevBrojac + 1);
    if (brojac < 10) {
      fetchData();
    } else {
      navigate('/results');
    }
  };

  return (
    <>
      <div className='questionBody'>
        <h2 className='questionHeading'>{quizData.question}<Counter brojac={brojac}></Counter><div>{time}s</div></h2>
        
      </div>
      <div className="answersContainer">
        {quizData.answers.map((answer, index) => (
          <div
            key={index}
            className={`answerRectangle ${selectedAnswer === answer ? (answer === quizData.correctAnswer ? 'correct' : 'incorrect') : ''}`}
            onClick={() => handleAnswerClick(answer)}
          >
            {answer}
          </div>
        ))}
      </div>
      <div className="buttonContainer">
        <Button onClick={handleNextClick} title={'Next'}></Button>
      </div>
    </>
  );
}

export default QuestionsPage;
