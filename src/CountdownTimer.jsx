import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function CountdownTimer() {
  const [targetDate, setTargetDate] = useState(new Date());
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [hoursRemaining, setHoursRemaining] = useState(0);
  const [minutesRemaining, setMinutesRemaining] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      setDaysRemaining(timeLeft.days);
      setHoursRemaining(timeLeft.hours);
      setMinutesRemaining(timeLeft.minutes);
      setSecondsRemaining(timeLeft.seconds);
    }, 1000);

    return () => clearInterval(timerId);
  }, [targetDate]);

  const handleInputChange = (event) => {
    setTargetDate(new Date(event.target.value));
  };

  const handleCancel = () => {
    setTargetDate(new Date()); // Reset to current date/time
  };

  return (
    <div className="countdown-container">
      <h1>Countdown Timer</h1>
      <div className="input-container">
        <label htmlFor="target-date">Target Date & Time:</label>
        <input
          type="datetime-local"
          id="target-date"
          value={targetDate.toISOString().slice(0, 16)}
          onChange={handleInputChange}
        />
      </div>
      <div className="countdown">
        <div className="time-section">
          {daysRemaining} <span>Days</span>
        </div>
        <div className="time-section">
          {hoursRemaining} <span>Hours</span>
        </div>
        <div className="time-section">
          {minutesRemaining} <span>Minutes</span>
        </div>
        <div className="time-section">
          {secondsRemaining} <span>Seconds</span>
        </div>
      </div>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<CountdownTimer />);
export default CountdownTimer;
