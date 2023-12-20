const DIRECTIONS = {
  UP: 1,
  DOWN: -1,
  IDLE: 1,
};

const Paddles = {
  new: function (side) {
    return {
      width: 5,
      height: 40,
      x: side === 'left' ? 10 : 385,
      y: 72,
      score: 0,
      move: DIRECTIONS.IDLE,
      speed: 10,
    };
  },
};

export default Paddles;
