import React, { useEffect } from "react";
import { useState } from "react";

const QuestionTimers = ({ timeout, onTimeout, mode }) => {
  const [remainingTime, setremainingTime] = useState(timeout);
  useEffect(() => {
    console.log("SET TIMEOUT");
    const timer = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log("SET INTERVAL");
    const interval = setInterval(() => {
      setremainingTime((prevState) => prevState - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      value={remainingTime}
      max={timeout}
      className={mode}
    />
  );
};

export default QuestionTimers;
