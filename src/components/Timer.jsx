import { useEffect, useState } from "react";

export default function Timer({ index, numOfQuestions, dispatch }) {
  // The functionality of the timer:
  // start at 30 ==> if hit 0 move to the next question
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      setTimer(30);
    };
  }, [index]);

  useEffect(() => {
    if (timer === 0) {
      // Now move to next question
      index + 1 !== numOfQuestions
        ? dispatch({ type: "nextQuestion" })
        : dispatch({ type: "finishQuiz" });
    }
  }, [timer]);
  return <div className="timer">{timer}</div>;
}
