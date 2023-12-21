// PongLogic.js
import { useEffect, useState } from 'react';
import Ball from './Ball';
import Paddles from './Paddles';

const DIRECTIONS = {
  UP: 1,
  DOWN: -1,
  IDLE: 2,
}

const PongLogic = () => {
  const [canvas, setCanvas] = useState(null);
  const [context, setContext] = useState(null);
  const [player1, setPlayer1] = useState(Paddles.new('left'));
  const [player2, setPlayer2] = useState(Paddles.new('right'));
  const [ball, setBall] = useState(Ball.new());
  const [running, setRunning] = useState(false);
  const [turn, setTurn] = useState(null);
  const [timer, setTimer] = useState(0);
  const [over, setOver] = useState(false);
  const [round, setRound] = useState(0);
  const [color, setColor] = useState('#a66c3a');

  useEffect(() => {
    const canvasElement = document.querySelector('canvas');
    const canvasContext = canvasElement.getContext('2d');

    setCanvas(canvasElement);
    setContext(canvasContext);

    canvasElement.width = 400;
    canvasElement.height = 200;

    canvasElement.style.width = '900px';
    canvasElement.style.height = '500px';

    setRunning(false);
    setTurn(player2);
    setTimer(0);
    setOver(false);
    setRound(0);
  }, []);

  const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw players
    context.fillStyle = '#ffffff';
    context.fillRect(player1.x, player1.y, player1.width, player1.height);
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    // Draw ball
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    context.fillStyle = '#ffffff';
    context.fill();
    context.closePath();

    // Draw scores
    context.font = '10px Arial';
    context.fillStyle = '#ffffff';
    context.fillText(player1.score, 180, 30);
    context.fillText(player2.score, canvas.width - 180, 30);
  };

  const update = () => {
    // Update ball position
    ball.x += ball.moveX * ball.speed;
    ball.y += ball.moveY * ball.speed;

    // Ball collisions with walls
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
      ball.moveY *= -1;
    }

    // Ball collisions with paddles
    if (
      ball.x - ball.radius <= player1.x + player1.width &&
      ball.x + ball.radius >= player1.x &&
      ball.y >= player1.y &&
      ball.y <= player1.y + player1.height
    ) {
      ball.moveX *= -1;
    }

    if (
      ball.x - ball.radius <= player2.x + player2.width &&
      ball.x + ball.radius >= player2.x &&
      ball.y >= player2.y &&
      ball.y <= player2.y + player2.height
    ) {
      ball.moveX *= -1;
    }

    // Player collisions with walls
    player1.y = Math.max(0, Math.min(canvas.height - player1.height, player1.y));
    player2.y = Math.max(0, Math.min(canvas.height - player2.height, player2.y));

    // Check for scoring
    if (ball.x - ball.radius <= 0) {
      player2.score++;
      resetGame();
    }

    if (ball.x + ball.radius >= canvas.width) {
      player1.score++;
      resetGame();
    }
  };

  const loop = () => {
    update();
    draw();

    // If the game is not over, draw the next frame.
    if (!over) requestAnimationFrame(loop);
  };

  const startGame = () => {
    if (!running) {
      setRunning(true);
      setTurn(player2);
      setTimer((new Date()).getTime());
      setOver(false);
      setRound(0);
      window.requestAnimationFrame(loop);
    }
  };

  const resetGame = () => {
    ball.x = 45;
    setTurn(player2);
    setTimer((new Date()).getTime());
    setOver(false);
    setRound(0);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'w') {
      player1.y -= player1.speed;
    } else if (e.key === 's') {
      player1.y += player2.speed;
    } else if (e.key === 'ArrowUp') {
      player2.y -= player1.speed;
    } else if (e.key === 'ArrowDown') {
      player2.y += player2.speed;
    }
  };

  const handleKeyUp = () => {
    setPlayer1((prev) => ({ ...prev, move: DIRECTIONS.IDLE }));
    setPlayer2((prev) => ({ ...prev, move: DIRECTIONS.IDLE }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      handleKeyPress(e);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []); 

  return {
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
  };
};

export default PongLogic;
