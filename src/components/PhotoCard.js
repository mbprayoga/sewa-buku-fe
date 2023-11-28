import "./PhotoCard.css";
import React from "react";

export default function PhotoCard(props) {
    return (
        <div className="photoContainerBig" onClick={props.onClick}>
            <img src={props.img} alt="" className="photoPosterBig" />
        </div>
    );
}
