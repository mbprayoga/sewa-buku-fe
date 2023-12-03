import "./UserReturnCard.css";
import React from "react";

export default function UserReturnCard(props) {
    const isPaid = props.bukti_denda == null || props.denda == 0;
    return (
        <div className="UserRentsCardContainer" onClick={props.onClick}>
            <img src={props.buku.gambar_buku} alt="" className="userRentsCardPoster" />
            <h2 id="userRentsCardTitle">{props.buku.judul}</h2>
            <p>{props.buku.penulis}</p>
            <p>Denda: {props.denda}</p>
            <p>{isPaid ? "Paid" : "Unpaid"}</p>
        </div>
    );
}
