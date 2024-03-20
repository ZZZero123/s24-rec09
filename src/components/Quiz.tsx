import React, { useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';

const Quiz: React.FC = () => {
  const [quizCore] = useState(new QuizCore());

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>();
  const [score, setSocre] = useState<number>(0);

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
    quizCore.answerQuestion(option);
    setSocre(quizCore.getScore());
  }

  const handleButtonClick = (): void => {
    // Task3: Implement the logic for button click, such as moving to the next question.
    quizCore.nextQuestion();
    setSelectedAnswer(null);
  } 

  const currentQuestion = quizCore.getCurrentQuestion();

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  } 
  
    return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>{quizCore.hasNextQuestion() ? 'Next Question' : 'ShowScore'}</button>
    </div>
  );
};

export default Quiz;