export default function Progress({
  index,
  numOfQuestions,
  points,
  maxPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + 1}></progress>
      <p>
        Question <b>{index + 1}</b> / {numOfQuestions}
      </p>
      <p>
        Question <b>{points}</b> / {maxPoints}
      </p>
    </header>
  );
}
