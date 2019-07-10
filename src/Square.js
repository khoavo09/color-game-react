import React, { Component } from 'react';

function Square(props) {
    return(
        <div className ="square" 
            style={{background : props.item }}
            onClick={() => props.handleSquareClick(props.item, props.correctColor, props.id)}
        ></div>
    )
}
export default Square