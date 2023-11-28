import React from "react";
import "./RoverCard.css";
import { FaCamera } from "react-icons/fa";

export default function RoverCard(props) {
    

    return (
        <div className="roverContainerBig" onClick={props.onClick}>
            <h2 id="roverTitle">{props.name}</h2>
            <div className="roverDescriptionBig">                
                <p>Operated for {props.max_sol} Martian Days</p>
            </div>
            <div className="roverDescriptionBottom">
                <p><FaCamera /> {props.total_photos}</p>
                <p>{props.status === "complete" ? `${props.landing_date} - ${props.max_date}` : "Active"}</p>
            </div>
        </div>
    );
}