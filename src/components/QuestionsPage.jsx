import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function QuestionsPage() {
  const [quizData, setQuizData] = useState({
    question: '',
    answers: [],
  });


  const handleAnswerClick = (selectedAnswer) => {
 
    console.log(`Izabran odgovor: ${selectedAnswer}`);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=50');
      const data = await response.json();

      const randomQuestion = data.results[Math.floor(Math.random() * data.results.length)];


      setQuizData({
        question: randomQuestion.question,
        answers: [...randomQuestion.incorrect_answers, randomQuestion.correct_answer],
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
    if(brojac<10) {
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
          <div
            key={index}
            className="answerRectangle"
            onClick={() => handleAnswerClick(answer)}
          >
            {answer}
          </div>
        ))}
      </div>

      <button className="buttonNext" onClick={handleNextClick}>
        Next
      </button>
    </>
  );
}

export default QuestionsPage;
