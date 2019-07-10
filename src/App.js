import React, { Component } from 'react';
import './App.css';
import Square from './Square';

class App extends Component {

  constructor (){
    super()
    this.state = {
      mode: "",
      squares: 6,
      colors :[],
      correctColor: "",
      isFinished: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSquareClick = this.handleSquareClick.bind(this)
    this.pickColor = this.pickColor.bind(this)
    this.generateRandomColors = this.generateRandomColors.bind(this)

  }


  componentDidMount(){
    this.reset()
  }

  async handleClick (event){
    const mode = event.target.value;
    await mode === "hard" ? this.setState({mode: "hard", squares : 6}) : this.setState({mode:"easy", squares : 3})
    this.reset()
  }

  handleSquareClick(color, correctColor, id){
    if(id === correctColor){
      // Set all squares to the correct color
      this.setState({
        colors : this.state.colors.fill(color,0,this.state.squares),
        isFinished : true
      })
    }
    else{
      // Set the clicked square to background color
      this.setState( prevState =>{
        if(!prevState.isFinished){
          prevState.colors[id] = "rgb(35,35,35)"
          return {
            colors : prevState.colors
          }
        }
      })
    }

  }


  pickColor(){
    var random = Math.floor(Math.random() * this.state.squares); 
    this.setState({correctColor : random})
  }

  async reset(){
    await this.generateRandomColors()
    this.pickColor()
  }
  
  generateRandomColors(){
    var arr = [];
    var randomNum = [];
    for(var i = 0; i < this.state.squares; i++){
      for(var j = 0; j < 3; j++){
        randomNum[j] = Math.floor(Math.random() * 255 + 1); 
      }
      var oneColor = "rgb(" + randomNum[0] +", "+ randomNum[1] + ", " +randomNum[2] +")";
      arr.push(oneColor);
    }
    this.setState({colors : arr,
                   isFinished : false})
  }



  render() {
    const mode = this.state.mode
    let message = ""
    this.state.isFinished === false?  message = "" :   message = "CORRECT!"
    const squareItem = this.state.colors.map( (item, i)=> 
    <Square item={item}   
     key={i}
     id={i}
     correctColor={this.state.correctColor}  
     handleSquareClick={this.handleSquareClick}/>)

    let squares
    if(mode === "hard"){
      squares = <div id="container">
                    {squareItem}
                </div>
    }
    else{
      squares = <div id="container">
                    {squareItem}
                </div>
    }


    return (
      <div>
          <h1>The Great 
          <br />
          <span id="colorDisplay">RBG</span> 
          <br />Color Game
          </h1>
      
        <div id="stripe">
          <button value="newColor" onClick={this.generateRandomColors}>New Colors?</button>
          <span id="message">{message}</span>
          <button className="mode" value="easy" onClick={ this.handleClick}>Easy</button>
          <button className="mode"  value="hard" onClick={this.handleClick}>Hard</button>
        </div>
      
      {squares}
      </div>
    );
  }
}

export default App;
