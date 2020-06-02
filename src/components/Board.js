import React, { Component } from 'react'
import Square from './Square'

export default class Board extends Component {

    renderSquare = (num) =>{
        return <Square id={num} boxClick={this.boxClick} squares={this.props.squares[num]}/>
    };

    boxClick = (id) =>{
        console.log("hey you click the box id is:", id)
        //change the value from null to "X" at the array index number id
        let squaresChanged = this.props.squares
        console.log("What is square in box", squaresChanged)
        squaresChanged[id] = this.props.isXNext? "X":"O"
        console.log("What is square in box", squaresChanged)
        this.props.setTheState({squares:squaresChanged, isXNext:!this.props.isXNext})
    }


    render() {
        let status=''
        status = `Next player: ${this.props.isXNext? 'X':'O'}`
        console.log("status", status)
        return (
            <div>
                <h2>{status}</h2>

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
            </div>
        )
    }
}
