import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    fetch("/questions.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => setQuestions(shuffleArray(data)))
      .catch((error) => console.error("Error loading questions:", error));
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      nextQuestion();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  if (!questions.length) return <p>Loading...</p>;

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const nextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);
    setTimeLeft(60);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/results", { state: { score, total: questions.length } });
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      {/* Progress Bar */}
      <div style={{ width: "100%", backgroundColor: "#ccc", height: "10px", marginBottom: "10px" }}>
        <div style={{ width: `${progress}%`, backgroundColor: "#4caf50", height: "10px" }}></div>
      </div>

      <h3>Time Left: {timeLeft}s</h3>
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{questions[currentQuestionIndex].question}</p>

      {questions[currentQuestionIndex].options.map((option) => (
        <button
          key={option}
          onClick={() => handleAnswer(option)}
          disabled={selectedAnswer !== null}
          style={{
            backgroundColor: selectedAnswer === option ? "#d3d3d3" : "#f2f2f2",
            display: "block",
            width: "100%",
            height: "48px",
            margin: "6px 0",
            padding: "0 12px",
            fontSize: "16px",
            textAlign: "left",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: selectedAnswer === null ? "pointer" : "not-allowed",
          }}
        >
          {option}
        </button>
      ))}

      <br />
      <button
        onClick={nextQuestion}
        disabled={!selectedAnswer}
        style={{
          marginTop: "10px",
          width: "100%",
          height: "48px",
          fontSize: "16px",
          backgroundColor: selectedAnswer ? "#2ecc71" : "#aaa",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: selectedAnswer ? "pointer" : "not-allowed",
        }}
      >
        Next
      </button>
    </div>
  );
};

export default QuizPage;
