// Pong.js
import React from 'react';
import PongLogic from './components/PongLogic';

const Pong = () => {
  const {
    canvas,
    context,
    player1,
    player2,
    ball,
    running,
    turn,
    timer,
    over,
    round,
    color,
    startGame,
    resetGame,
    handleKeyPress,
    handleKeyUp,
  } = PongLogic();

  return (
    <div className='container' id='myGame'>
      <h1 className='text-light'>Pong Game</h1>
      <canvas className='canvas' ref={canvas}></canvas>
      <br />
      <button className='btn' id="game-start" onClick={startGame}>
        Start Game
      </button>
      <span className='line'></span>
    </div>
  );
};

export default Pong;
