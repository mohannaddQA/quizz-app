import Option from "./Option";

export default function Question({ activeQuestion, dispatch, answer }) {
  function handleAnswer(selectedOptionIdx) {
    dispatch({ type: "newAnswer", payLoad: selectedOptionIdx });
  }

  return (
    <div>
      <h4>{activeQuestion.question}</h4>
      <div className="options">
        {activeQuestion.options.map((option, idx) => {
          return (
            <Option
              key={option}
              option={option}
              onAnswer={handleAnswer}
              idx={idx}
              answer={answer}
              correctOption={activeQuestion.correctOption}
            />
          );
        })}
      </div>
    </div>
  );
}
