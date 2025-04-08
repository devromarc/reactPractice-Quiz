import React from "react";
import { useRef } from "react";

const Answers = ({ answers, selectedAnswer, answerState, onSelect }) => {
  // manage some value so that it will not change when the component re-render
  const shuffledAnswerRef = useRef();
  //   it was initially declare on top but since we check the questionIsCompleted first. it suffice the logic
  //   shuffle the answer per question
  //   use useRef so that it will not run again if the component execute again
  // move to the answers component for shuffling logic. the goal is to reshuffle when the question changes
  if (!shuffledAnswerRef.current) {
    shuffledAnswerRef.current = [...answers];
    shuffledAnswerRef.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {shuffledAnswerRef.current.map((answer) => {
        let cssClass;
        const isSelected = selectedAnswer === answer;
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
