import React, { Component } from 'react'
import Square from './Square'
import O from './O.png'
import X from './X.png'

export default class Board extends Component {


    renderSquare = (num) =>{
        return <Square id={num} gameOver={this.props.gameOver} boxClick={this.boxClick} squares={this.props.squares[num]}/>
    };

    boxClick = (id) =>{
        //change the value from null to "X" at the array index number id
        let squaresChanged = this.props.squares
        // if (this.calculateWinner(squaresChanged) || squaresChanged[id]) {
        //   console.log("What is SQUARE", this.calculateWinner(squaresChanged))
        //   console.log("What is WINNER", squaresChanged[id])
        //   this.setState({gameOver:true})
        //   // return;
        // }
        squaresChanged[id] = this.props.isXNext? X:O
        console.log("What is square in box", squaresChanged)
        this.props.setTheState({
            squares:squaresChanged, 
            isXNext:!this.props.isXNext,
            history: [...this.props.history.slice(),{squares:squaresChanged.slice(), isXNext:!this.props.isXNext}]
        })
        let winnerSquare = this.calculateWinner(squaresChanged)
        if (winnerSquare != null){
          this.props.setTheState({gameOver:!this.props.gameOver, history:[...this.props.history.slice()]})
        }
    }

   calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }

    postData = async (name) =>{
      console.log("What is name", name)
      let data = new URLSearchParams();
      data.append("player", name);
      data.append("score", 3);//start time ~ finish time
      const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data.toString(),//change object to String
        json: true
      });
      console.log("what is response", response)
    }
      // We actually don't care about the response ... do we?
      


    render() {
        const winner = this.calculateWinner(this.props.squares)
        console.log("who is winner", winner)
        let status=''
        if (winner) {
         status = <div id="player-text"><span id="winner-text">Winner is</span> <img id="winner-image" alt="#" src={winner}/></div>
          } else {
            status = <div id="player-text">Player is<img id="winner-image" alt="#" src={this.props.isXNext? X:O}/></div>
          }
        return (
            <div>
                  {console.log("What is FacebookData name in Board", this.props.FacebookData.name)}
                {status}
                <div className="row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                </div>
                <div className="row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                </div>
                <div className="row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
                </div>
                <button onClick ={() => {this.setState({gameOver:false});
                  this.props.setTheState({squares:Array(9).fill(null), isXNext:true, history:[], gameOver:false})}} >Reset</button>
            </div>
        )
    }
}
