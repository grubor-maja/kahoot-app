import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import useCountdown from './useCountdown';
import Counter from './Counter';

const QuestionsPage = ({ result, handleResult, timeLeftMultiplier, difficulty }) => {
  const [quizData, setQuizData] = useState({
    question: '',
    answers: [],
    correctAnswer: '',
  });

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selected, setSelected] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const [brojac, setBrojac] = useState(1);
  const navigate = useNavigate();

  const handleCountdownFinish = () => {
    if (!selected) {
      console.log('Vreme je isteklo!');
      setTimeLeft(0);
      pauseCountdown();
      handleNextClick();
    }
  };

  const { time, reset: resetCountdown, pause: pauseCountdown } = useCountdown(10, handleCountdownFinish);

  const handleNextClick = () => {
    setBrojac((prevBrojac) => prevBrojac + 1);
    resetCountdown();

    if (brojac < 10) {
      fetchData();
    } else {
      navigate('/results', { state: { timeLeft } });
    }
  };

  const handleAnswerClick = (answer) => {
    if (!selected) {
      setSelectedAnswer(answer);
      setSelected(true);

      console.log('Time left: ' + time);
      let scoreMultiplier = answer === quizData.correctAnswer ? 10 : 0;
      console.log('Score multiplier: ' + scoreMultiplier);
      pauseCountdown();

      const roundResult = time * scoreMultiplier;
      console.log('Broj poena za ovaj odgovor: ' + roundResult);
      handleResult(result + roundResult);
    } else {
      console.log('Vec ste izabrali odgovor');
      window.alert('Vec ste izabrali odgovor');
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://the-trivia-api.com/v2/questions');
      const data = await response.json();
  
      if (!data || data.length === 0) {
        console.error('No questions found in API response.');
        return;
      }
  
      let filteredQuestions;
      if (difficulty === 'easy') {
        filteredQuestions = data.filter((question) => question.difficulty === 'easy');
      } else if (difficulty === 'medium') {
        filteredQuestions = data.filter((question) => question.difficulty === 'medium');
      } else if (difficulty === 'hard') {
        filteredQuestions = data.filter((question) => question.difficulty === 'hard');
      }
  
      if (!filteredQuestions || filteredQuestions.length === 0) {
        console.error('No questions found for the selected difficulty.');
        return;
      }
  
      let randomQuestion;
      do {
        randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
      } while (!randomQuestion);
  
      if (!randomQuestion.question || !randomQuestion.incorrectAnswers || !randomQuestion.correctAnswer) {
        console.error('Invalid question structure in API response:', randomQuestion);
       
        fetchData();
        return;
      }
  
      setQuizData({
        question: randomQuestion.question.text,
        answers: randomQuestion.incorrectAnswers.concat(randomQuestion.correctAnswer),
        correctAnswer: randomQuestion.correctAnswer,
      });
  
      setSelectedAnswer(null);
      setSelected(false);
      setTimeLeft(null);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };
  

  useEffect(() => {
    fetchData();
    resetCountdown();
  }, [brojac, resetCountdown, difficulty]);

  return (
    <>
      <div className="questionBody">
        <h2 className="questionHeading">
          {quizData.question}
          <Counter brojac={brojac}></Counter> <div>{time}s</div>
        </h2>
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
};

export default QuestionsPage;
