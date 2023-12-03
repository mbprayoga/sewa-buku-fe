import "./BookCard.css";
import React from "react";

export default function BookCard(props) {
    return (
        <div className="photoContainerBig" onClick={props.onClick}>
            <img src={props.gambar_buku} alt="" className="photoPosterBig" />
            <h2 id="bookTitle">{props.judul}</h2>
            <p>{props.penulis}</p>
            <p>{props.harga}</p>
        </div>
    );
}
