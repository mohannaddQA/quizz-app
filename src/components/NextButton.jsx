export default function NextButton({ dispatch, index, numOfQuestions }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        index + 1 !== numOfQuestions
          ? dispatch({ type: "nextQuestion" })
          : dispatch({ type: "finishQuiz" });
      }}
    >
      {index + 1 === numOfQuestions ? "Finish The Quiz" : "Next"}
    </button>
  );
}
