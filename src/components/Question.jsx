import React, { useState } from "react";
import QuestionTimers from "./QuestionTimers";
import Answers from "./Answers";
import QUESTIONS from "../questions";

const Question = ({ onSkipAnswer, onSelect, questionIndex }) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let answerState = "";

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    answerState = "answered";

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[questionIndex].answers[0] === answer,
      });

      setTimeout(() => {
        onSelect(answer);
      }, 2000);
    }, 1000);
  }

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  }
  return (
    <div id="question">
      <QuestionTimers
        key={timer}
        timeout={timer}
        mode={answerState}
        //   pass a null if the timer expires and there is no answer for that question
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
      />
      <h2>{QUESTIONS[questionIndex].text}</h2>
      <Answers
        answers={QUESTIONS[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
