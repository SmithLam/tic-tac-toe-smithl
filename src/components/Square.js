import React, { Component } from 'react'


export default class Square extends Component {
constructor(props){
    super(props);
    this.state={gameOver:this.props.gameOver}

}

componentWillReceiveProps(props){
    this.setState({gameOver:props.gameOver})
    console.log("What is gameover 2", props.gameOver)
}
    render() {
        console.log("What is gameover", this.state.gameOver)
        return (
            <div>{this.state.gameOver? //if else statement to determine gameOver
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
