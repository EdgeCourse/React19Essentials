import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>React Quiz Instructions</h1>
      <p>Answer all questions and see your score at the end.</p>
      <button onClick={() => navigate("/quiz")}>Start Quiz</button>
    </div>
  );
};

export default Home;
