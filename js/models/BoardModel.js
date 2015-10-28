define(function (require) {
  var Backbone = require('backbone');
  var Snake = require('./SnakeModel');

  var emptyGrid = function (rows, cols) {
    var board = [];
    for (var r = 0; r < rows; r++) {
      board[r] = [];
      for (var c = 0; c < cols; c++) {
        board[r][c] = null;
      }
    }
    return board;
  };
  var Board = function (rows, cols) {
    this.rows = rows;
    this.cols = cols;

    this.grid = emptyGrid(rows, cols);
    var snakeRow = Math.floor(rows / 2), snakeCol = Math.floor(cols / 2);
    this.grid[snakeRow][snakeCol] = 'snake';
    this.snake = new Snake(snakeRow, snakeCol);
    this.hasFood = false;
    this.lostGame = false;
  }

  Board.prototype.isCoordValid = function (r, c) {
    return r >= 0 && c >= 0 && r < this.rows && c < this.cols
           && this.grid[r][c] !== 'snake';
  }

  Board.prototype.step = function () {
    if (this.lostGame) {
      return;
    }
    var nextHead = this.snake.nextHeadPosition();
    var ateFood;
    if (!this.isCoordValid(nextHead.r, nextHead.c)) {
      this.lostGame = true;
      return;
    } else {
      ateFood = this.grid[nextHead.r][nextHead.c];
      this.grid[nextHead.r][nextHead.c] = 'snake';
      this.snake.segments.unshift(nextHead);
    }
    // Add another segment, or move the snake one segment
    if (this.snake.growthCounter > 0) {
      this.snake.growthCounter--;
    } else {
      var lastSegment = this.snake.segments.pop();
      this.grid[lastSegment.r][lastSegment.c] = null;
    }
    // Add food if necessary
    if (!this.hasFood) {
      this.addFoodToRandomSquare();
    }
    if (ateFood) {
      this.snake.growthCounter++;
      this.hasFood = false;
    }
  };

  Board.prototype.addFoodToRandomSquare = function () {
    this.hasFood = true;
    var cellsWithoutFood = [];
    for (var r = 0; r < this.rows; r++) {
      for (var c = 0; c < this.cols; c++) {
        if (this.grid[r][c] === null) {
          cellsWithoutFood.push({r: r, c: c});
        }
      }
    }
    var chosenCell = cellsWithoutFood[Math.floor(Math.random() * cellsWithoutFood.length)];
    this.grid[chosenCell.r][chosenCell.c] = 'food';
  };

  return Board;
});
