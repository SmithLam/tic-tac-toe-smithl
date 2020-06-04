import React, { Component } from 'react'


export default class Square extends Component {

    render() {
        return (
            <div>{this.props.gameOver? //if else statement to determine gameOver
                <div className="box" onClick ={() => console.log("Game is Over")}>
                <img alt="" src={this.props.squares}/>
                </div>
                ://the if else statement separator            
                <div className="box" onClick ={() => this.props.boxClick(this.props.id)}>
                <img alt="" src={this.props.squares}/>
                </div>
                }
            </div>
        )
    }
}
