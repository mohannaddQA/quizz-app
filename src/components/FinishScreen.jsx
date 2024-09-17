export default function FinishScreen({
  points,
  maxPoints,
  highScore,
  dispatch,
}) {
  return (
    <>
      <p className="result">
        You Scored <b>{points}</b> out of {maxPoints}
      </p>
      <p className="highscore">your high score is {highScore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}
