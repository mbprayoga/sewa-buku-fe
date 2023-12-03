import "./AdminReturnCard.css";
import React from "react";

export default function AdminReturnCard(props) {
    const isPaid = props.bukti_denda == null || props.denda == 0;
    return (
        <div className="UserRentsCardContainer" onClick={props.onClick}>
            <img src={props.buku.gambar_buku} alt="" className="userRentsCardPoster" />
            <h2 id="userRentsCardTitle">{props.buku.judul}</h2>
            <p>{props.buku.penulis}</p>
            <p>{props.peminjam.nama}</p>
            <p>Denda: {props.denda}</p>
            <p>{isPaid ? "Paid" : "Unpaid"}</p>
        </div>
    );
}
