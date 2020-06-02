import React, { Component } from 'react'
import Board from './components/Board'
import './App.css'

export default class App extends Component {

  constructor(props){
    super(props)
    this.state={
        squares:Array(9).fill("Smith"),
        isXNext:true // if it's true then X false then O
    }
}


  setTheState = (obj) =>{
    this.setState(obj)
  }

  render() {
    return (
      <div>
        <h1>This is tic-tac-toe</h1>
        <Board {...this.state} setTheState={this.setTheState}/>
      </div>
    )
  }
}
