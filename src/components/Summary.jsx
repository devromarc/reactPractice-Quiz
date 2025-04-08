import React from "react";
import quizComplete from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

const Summary = ({ userAnswers }) => {
  const skippedAnswer = userAnswers.filter((answer) => answer === null);
  const correctAnswer = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const totalAnswers = userAnswers.length;
  const skippedPercent =
    totalAnswers > 0
      ? Math.round((skippedAnswer.length / totalAnswers) * 100)
      : 0;
  const correctPercent =
    totalAnswers > 0
      ? Math.round((correctAnswer.length / totalAnswers) * 100)
      : 0;
  const wrongPercent = 100 - skippedPercent - correctPercent;

  return (
    <div id="summary">
      <img src={quizComplete} alt="tropy image" />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedPercent}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correctPercent}%</span>
          <span className="text">Answered Correctly</span>
        </p>
        <p>
          <span className="number">{wrongPercent}%</span>
          <span className="text">Answered Incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";
          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Summary;
