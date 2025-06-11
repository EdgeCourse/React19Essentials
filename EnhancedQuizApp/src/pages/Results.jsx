import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div>
      <h1>Quiz Completed!</h1>
      <p>Your Score: {score} / {total}</p>
      <button onClick={() => navigate("/")}>Try Again</button>
    </div>
  );
};

export default ResultsPage;
