import React from "react";
import './Dice.css'

export default function Dice(props) {

    const myStyle = {backgroundColor: props.isHeld ? '#59E391' : '#FFFFFF'}
    return (
        <div className="dice__element"
        style={myStyle}
        onClick={props.handelDice}
        >
            <div className="dice__number">
                {props.value}
            </div>
        </div>
    )
}