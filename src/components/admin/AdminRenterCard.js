import React from "react";
import "./AdminRenterCard.css";

export default function AdminRenterCard(props) {
  return (
    <div className="AdminRenterCardContainer">
      <h2>{props.nama}</h2>
      <p>{props.username}</p>
      <p>Alamat: {props.alamat}</p>
      <p>No HP: {props.no_hp}</p>
    </div>
  );
}