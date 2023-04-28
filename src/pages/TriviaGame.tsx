import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const TriviaGame: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [resultMessage, setResultMessage] = useState<string>('');

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=1');
      const data = response.data.results[0];
      const decodedQuestion = decodeHtmlEntities(data.question);
      const decodedCorrectAnswer = decodeHtmlEntities(data.correct_answer);
      const decodedIncorrectAnswers = data.incorrect_answers.map((answer: string) => decodeHtmlEntities(answer));
      setQuestion({
        category: data.category,
        type: data.type,
        difficulty: data.difficulty,
        question: decodedQuestion,
        correct_answer: decodedCorrectAnswer,
        incorrect_answers: decodedIncorrectAnswers,
      });
      setUserAnswer('');
      setResultMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  const decodeHtmlEntities = (text: string): string => {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(`<!doctype html><body>${text}`, 'text/html').body.textContent || '';
    return decodedString;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userAnswer.toLowerCase() === question?.correct_answer.toLowerCase()) {
      setResultMessage('Correct!');
    } else {
      setResultMessage(`Incorrect! The correct answer was ${question?.correct_answer}.`);
    }
    loadQuestion();
  };

  return (
    <div>
      {question && (
        <form onSubmit={handleSubmit}>
          <div>
            <h2>{question.category}</h2>
            <h3>{question.difficulty} Difficulty</h3>
            <p>{question.question}</p>
          </div>
          <div>
            <label htmlFor="answer">Answer:</label>
            <input type="text" id="answer" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
      {resultMessage && <p>{resultMessage}</p>}
    </div>
  );
};

export default TriviaGame;
