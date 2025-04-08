import React, { useCallback } from "react";
import QUESTIONS from "../questions";

import { useState } from "react";
import Question from "./Question";
import Summary from "./Summary";
const Quiz = () => {
  const [userAnswers, setuserAnswers] = useState([]);
  //   make this so that it will not change the question if the state of answerState doesnt change.
  const activeQuestionIndex = userAnswers.length;

  //   check whether the questions are completed. it will be used to conditionally return the jsx.
  const questionIsCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectSquare = useCallback(function handleSelectSquare(
    selectedAnswer
  ) {
    setuserAnswers((prevState) => [...prevState, selectedAnswer]);
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectSquare(null),
    [handleSelectSquare]
  );

  if (questionIsCompleted) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        // if theres a change react will destroy old intance and create a new one. you need to add the key pro. just like stated below
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onSkipAnswer={handleSkipAnswer}
        onSelect={handleSelectSquare}
      />
    </div>
  );
};

export default Quiz;
