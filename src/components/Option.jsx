export default function Option({
  option,
  idx,
  onAnswer,
  answer,
  correctOption,
}) {
  const hasAnswered = answer !== null;
  return (
    <button
      className={
        // Check if there is an answer, and add extra styling for the chosen answer
        `btn btn-option ${answer === idx ? "answer " : ""} ${
          hasAnswered ? (idx === correctOption ? "correct" : "wrong") : ""
        }`
      }
      onClick={() => {
        onAnswer(idx);
      }}
      disabled={answer !== null}
    >
      {option}
    </button>
  );
}
