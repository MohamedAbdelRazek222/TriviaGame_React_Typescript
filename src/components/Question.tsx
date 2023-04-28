import React from "react";

interface Props {
  question: string;
  answer: string;
  onAnswerSubmit: (answer: string) => void;
}

export const Question: React.FC<Props> = ({ question, answer, onAnswerSubmit }) => {
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAnswerSubmit(e.target.value);
    console.log(e.target.value)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAnswerSubmit(answer);
  };

  return (
    <div>
      <h2>{question}</h2>
      <form onSubmit={handleSubmit}>
      <label>
        Answer :  <input type="text" value={answer} onChange={handleAnswerChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
