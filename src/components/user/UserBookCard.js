import React from "react";
import "./UserBookCard.css";

export default function UserBookCard(props) {
  return (
    <div className="UserBookCardContainer" onClick={props.onClick}>
      <img src={props.gambar_buku} alt="" className="userBookCardPosterBig" />
      <h2 id="userBookCardTitle">{props.judul}</h2>
      <p>{props.penulis}</p>
      <p>{props.genre}</p>
      <p>{props.sinopsis}</p>
      <p>{props.harga}</p>
      <button onClick={props.onRentClick}>Rent</button>
    </div>
  );
}
