# Starting the demo

In this demo, we will finish the app by setting up a simple timer.
My implementation is different than Jonas.

My implementation:

- uses useState because it's much simpler for this useCase
- uses 30 seconds for each question

Jonas implementation:

- uses the useReducer to react for every tick.
- uses 5 minutes for the whole quiz.

Here is Jonas implementation:

```jsx
import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
```

and in the reducer

```js
case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
```
