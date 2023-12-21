const Ball = {
  new: function () {
    return {
      width: 2,
      height: 2,
      x: 50,
      y: 50,
      radius: 5,
      moveX: DIRECTIONS.IDLE,
      moveY: DIRECTIONS.IDLE,
      speed: 1,
    };
  },
};

export default Ball;
