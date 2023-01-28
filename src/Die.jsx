import React from "react"

function Die(props) {

    return (
        <div className={props.isHeld? "roll-block holding":"roll-block"} onClick={props.holdDice}>
            {props.value}
        </div>
    )
}

export default Die