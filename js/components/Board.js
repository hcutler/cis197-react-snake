define(function (require) {
  var React = require('react');

  var BoardModel = require('../models/BoardModel');


  var Board = React.createClass({
    getInitialState: function () {
      return {
        board: new BoardModel(this.props.rows, this.props.cols)
      };
    },
    componentDidMount: function () {
      this.registerDocumentEventListeners();
      this.props.clock.on('tick', function () {
        this.state.board.step();
        this.setState(this.state);
      }.bind(this));
      this.props.clock.start();
    },
    registerDocumentEventListeners: function () {
      document.addEventListener('keydown', this.onKeyPress.bind(this));
    },
    onKeyPress: function (e) {
      if (e.which === 37) {
        this.state.board.snake.direction = 'left';
      } if (e.which === 38) {
          this.state.board.snake.direction = 'up';
      } else if (e.which === 39) {
        this.state.board.snake.direction = 'right';
      } else if (e.which === 40) {
        this.state.board.snake.direction = 'down';
      } else if (e.which === 82) {
        // r button - restart game
        this.props.clock.stop();
        this.setState({board:  new BoardModel(this.props.rows, this.props.cols)});
        this.props.clock.start();
      }
    },
    render: function () {
      var rows = this.state.board.grid.map(function (row) {
        var cells = row.map(function (cell) {
          var color = cell === 'snake' ? 'yellow' : cell === 'food' ? 'green' : 'white';
          return <div className="cell" style={{backgroundColor: color}}></div>;
        });
        return <div className="row">{cells}</div>;
      });
      var msg = this.state.board.lostGame
                  ? <div className="announcement">You lost.<br/>Press "R" to start again.</div>
                  : '';
      return (<div>{msg}<div className="board">{rows}</div></div>);
    }
  });

  return Board;
});
