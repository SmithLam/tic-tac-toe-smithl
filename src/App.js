import React, { Component } from 'react'
import Board from './components/Board'
import './App.css'

export default class App extends Component {

  constructor(props){
    super(props)
    this.state={
        squares:Array(9).fill(""),
        isXNext:true // if it's true then X false then O
    }
}


  setTheState = (obj) =>{
    this.setState(obj)
  }

  render() {
    return (
      <div>
        <center><h1>TIC-TAC-TOE</h1></center>
        <center><Board {...this.state} setTheState={this.setTheState}/></center>
      </div>
    )
  }
}
