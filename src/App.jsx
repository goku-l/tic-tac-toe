import { useState } from "react";
import "./App.css";

function Square({ value, setsquareonclick }) {
  return (
    <button className="square" onClick={setsquareonclick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setsquares] = useState(Array(9).fill(null));
  const [xisnext, setxisnext] = useState(true);
  function allclear()
  {
    const nextsquares=Array(9).fill(null)
    setsquares(nextsquares)
    setxisnext(true)
  }
  function handleclick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextsquares = squares.slice();
    if (xisnext) {
      nextsquares[i] = "X";
    } else {
      nextsquares[i] = "O";
    }
    setsquares(nextsquares);
    setxisnext(!xisnext);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner : " + winner;
  }
  else if(squares[0] && squares[1] && squares[2] && squares[3] && squares[4] && squares[5] && squares[6] && squares[7] && squares[8])
  {
    status="Draw Match"
  } 
  else{
    status = "Next Player : " + (xisnext ? "X" : "O");
  }
  return (
    <div className="parent">
      <div className="status">{status}</div>
      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} setsquareonclick={() => handleclick(0)} />
          <Square value={squares[1]} setsquareonclick={() => handleclick(1)} />
          <Square value={squares[2]} setsquareonclick={() => handleclick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} setsquareonclick={() => handleclick(3)} />
          <Square value={squares[4]} setsquareonclick={() => handleclick(4)} />
          <Square value={squares[5]} setsquareonclick={() => handleclick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} setsquareonclick={() => handleclick(6)} />
          <Square value={squares[7]} setsquareonclick={() => handleclick(7)} />
          <Square value={squares[8]} setsquareonclick={() => handleclick(8)} />
        </div>
      </div>
      <button className="allclear" onClick={allclear}>All Clear</button>
    </div>
  );
}

function calculateWinner(squares) {
  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < win.length; i++) {
    const [a, b, c] = win[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
