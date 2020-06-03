import React, { Component } from 'react'
import Board from './components/Board'
import './App.css'

export default class App extends Component {

  constructor(props){
    super(props)
    this.state={
        squares:Array(9).fill(""),
        isXNext:true, // if it's true then X false then O
        history: [], //{square:square at the moment, isXNext:the value of the moment} [{}, {}, {}]
    }
}


  setTheState = (obj) =>{
    this.setState(obj)
  }

  handleHistory = (num) =>{
    this.setState({squares: this.state.history[num]})
  }

 timeTravel=(index)=>{
   console.log("back to back", index)
   console.log("back to back to delete", (index+1))
   //set your squares and isNext value to the previous history (exactly the history you clicked)
   let historyNew = this.state.history.splice((index+1))
   console.log("what is history here", this.state.history)
   console.log("what is new history", historyNew)
   this.setState({squares: this.state.history[index].squares.slice(), isXNext:this.state.history[index].isXNext, history:[...this.state.history]})
 }


  render() {
    console.log("What is changed history here", this.state.history)
    return (
      <div>
        <center><h1>TIC-TAC-TOE</h1></center>
        <div style={{display:"flex"}}><center><Board {...this.state} setTheState={this.setTheState}/></center>
        <div id="history">HISTORY
          {console.log("history is", this.state.history)}
          {this.state.history.map((item, index)=>{
            return <div><button onClick={()=>this.timeTravel(index)}>Move {index+1}</button></div>
          })}
        </div>
        </div>
      </div>//end wrapper
    )
  }
}
