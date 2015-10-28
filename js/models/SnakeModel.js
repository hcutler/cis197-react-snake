define(function (require) {

  var Snake = function (r, c) {
    this.segments = [{r: r, c: c}];
    this.direction = 'up';
    this.growthCounter = 0;
  }

  Snake.prototype.nextHeadPosition = function () {
    var head = this.segments[0];
    switch (this.direction) {
      case 'up':
        return {r: head.r - 1, c: head.c};
      case 'down':
        return {r: head.r + 1, c: head.c};
      case 'left':
        return {r: head.r, c: head.c - 1};
      case 'right':
        return {r: head.r, c: head.c + 1};
    }
  };

  return Snake;
});
