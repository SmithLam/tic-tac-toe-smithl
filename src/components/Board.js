import React, { Component } from 'react'
import Square from './Square'
import O from './O.png'
import X from './X.png'


let startTime = 0
let score = 0
export default class Board extends Component {


    renderSquare = (num) =>{
        return <Square id={num} gameOver={this.props.gameOver} boxClick={this.boxClick} squares={this.props.squares[num]}/>
    };

    boxClick = (id) =>{
        //change the value from null to "X" at the array index number id
        let squaresChanged = this.props.squares
        // if (this.calculateWinner(squaresChanged) || squaresChanged[id]) {
        //   this.setState({gameOver:true})
        //   return;
        // }
        if(squaresChanged.every(item=>item === null)){
          startTime = Date.now()
          console.log("what is start time", startTime)
        }
        if (squaresChanged[id] != null){
          return
        }
        squaresChanged[id] = this.props.isXNext? X:O
        this.props.setTheState({
            squares:squaresChanged, 
            score:0,
            isXNext:!this.props.isXNext,
            history: [...this.props.history.slice(),{squares:squaresChanged.slice(), isXNext:!this.props.isXNext}]
        })
        let winnerSquare = this.calculateWinner(squaresChanged)
        if (winnerSquare != null){
          score = (10-Math.floor((Date.now() - startTime)/1000))
          this.props.setTheState({gameOver:!this.props.gameOver, history:[...this.props.history.slice()], score: score})
          this.postData(score)
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

    postData = async (score) =>{
      console.log("What is score here", score)
      let data = new URLSearchParams();
      data.append("player", "Smith Lam");
      data.append("score", score);//start time ~ finish time
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
        let status=''
        if (winner) {
         status = <div id="player-text"><span id="winner-text">Winner is</span> <img id="winner-image" alt="#" src={winner}/></div>
          } else {
            status = <div id="player-text">Player is<img id="winner-image" alt="#" src={this.props.isXNext? X:O}/></div>
          }
        return (
            <div>
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
                  this.props.setTheState({squares:Array(9).fill(null), isXNext:true, history:[], score:0, gameOver:false})}} >Reset</button>
            </div>
        )
    }
}
