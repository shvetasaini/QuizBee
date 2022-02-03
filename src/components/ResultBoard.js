import React from "react";

const ResultBoard = ({ score, playAgain }) => (
  <div className="score-board">
    <div className="score">You score {score} / 5 correct answers</div>
    <button className="playBtn" onClick={playAgain}>
      Play Again!
    </button>
  </div>
);

export default ResultBoard;
