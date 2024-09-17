import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/startScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};
function reducer(state, actions) {
  let currentQuestion = state.questions.at(state.index);
  switch (actions.type) {
    case "dataReceived":
      return {
        ...state,
        questions: actions.payLoad,
        status: "ready",
      };
    case "fetchingDataFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return { ...state, status: "active" };
    case "newAnswer":
      return {
        ...state,
        answer: actions.payLoad,
        points:
          currentQuestion.correctOption === actions.payLoad
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        answer: null,
        index: state.index < 14 ? state.index + 1 : state.index,
      };
    case "finishQuiz":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
      };

    default:
      throw new Error("Unknown Action");
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, index, answer, points } = state;

  useEffect(() => {
    fetch(
      "https://api.jsonsilo.com/public/9f51af58-d0bb-487a-9215-c89b597870f0"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({ type: "dataReceived", payLoad: data.questions });
      })
      .catch((err) => dispatch({ type: "fetchingDataFailed", payLoad: err }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "loading" ? <Loader /> : null}
        {state.status === "error" ? <Error /> : null}
        {state.status === "ready" ? (
          <StartScreen
            numOfQuestions={state.questions.length}
            dispatch={dispatch} // Because when clicking the button inside the component, the state will change, We have to send the setter function (dispatch) as a prop
          />
        ) : null}
        {state.status === "active" ? (
          <>
            <Progress
              numOfQuestions={state.questions.length}
              index={index}
              points={points}
              maxPoints={questions.reduce((prev, curr) => {
                return prev + curr.points;
              }, 0)}
              answer={answer}
            />
            <Question
              activeQuestion={questions[index]}
              dispatch={dispatch}
              answer={answer}
              index={index}
              numOfQuestions={state.questions.length}
            />
            <Footer>
              <Timer
                index={index}
                numOfQuestions={state.questions.length}
                dispatch={dispatch}
              />
              <NextButton
                dispatch={dispatch}
                index={index}
                numOfQuestions={state.questions.length}
              />
            </Footer>
          </>
        ) : null}
        {state.status === "finished" ? (
          <FinishScreen
            points={points}
            dispatch={dispatch}
            maxPoints={questions.reduce((prev, curr) => {
              return prev + curr.points;
            }, 0)}
            highScore={state.highScore}
          />
        ) : (
          ""
        )}
      </Main>
    </div>
  );
}

export default App;
