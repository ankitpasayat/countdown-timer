import { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(300000);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout = null;

    if (isActive && !isPaused && time > 0) {
      timeout = setTimeout(() => {
        setTime((prevTime) => prevTime - 1000);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      alert("Time’s up!");
      setTime(300000);
    }

    return () => clearTimeout(timeout);
  }, [isActive, isPaused, time]);

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(300000);
  };

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return (
    <div className="timer-container">
      <h1 className="timer-display">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </h1>
      <div className="button-container">
        {!isActive || isPaused ? (
          <button onClick={startTimer} className="timer-button start">
            {isPaused ? "Resume" : "Start"}
          </button>
        ) : (
          <button onClick={pauseTimer} className="timer-button pause">
            Pause
          </button>
        )}
        <button onClick={resetTimer} className="timer-button reset">
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
