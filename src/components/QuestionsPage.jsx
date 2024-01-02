import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Question from './Question';

function QuestionsPage() {
  const [quizData, setQuizData] = useState({
    question: '',
    answers: [],
  });

  const handleAnswerClick = (selectedAnswer) => {
    console.log(`Izabran odgovor: ${selectedAnswer}`);
    if(selectedAnswer==quizData.correctAnswer) {
    
    } else {
      selectedAnswer.className='incorrect'
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://the-trivia-api.com/v2/questions');
      const data = await response.json();

      const randomQuestion = data[Math.floor(Math.random() * data.length)];

      setQuizData({
        question: randomQuestion.question.text,
        answers: [...randomQuestion.incorrectAnswers, randomQuestion.correctAnswer],
      });
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const [brojac, setBrojac] = useState(0);

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
        <h2 className='questionHeading'>{quizData.question} {brojac}</h2>
      </div>
      <div className="answersContainer">
        {quizData.answers.map((answer, index) => (
          <Question key={index} answer={answer} handleAnswerClick={handleAnswerClick} />
        ))}

      </div>
      <div className="buttonContainer">
        <Button onClick={handleNextClick} title={'Next'}></Button>
      </div>
    </>
  );
}

export default QuestionsPage;
