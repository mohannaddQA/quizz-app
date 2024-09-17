export default function StartScreen({ numOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome To The React Quiz </h2>
      <h3>{numOfQuestions} Questions to test your knowledge in react </h3>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "startQuiz" });
        }}
      >
        Start The Quiz
      </button>
    </div>
  );
}
