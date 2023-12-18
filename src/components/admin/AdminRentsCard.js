// AdminRentsCard.js
import "./AdminRentsCard.css";
import React from "react";

export default function AdminRentsCard(props) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="UserRentsCardContainer" onClick={props.onClick}>
      <div>
        <p>Renter: {props.peminjam.nama}</p>
        <img src={props.buku.gambar_buku} alt="" className="userRentsCardPoster" />
        <h2 id="userRentsCardTitle">{props.buku.judul}</h2>
        <p>{props.buku.penulis}</p>
        <p>Due: {formatDate(props.tanggal_kembali)}</p>
        <p>{props.buku.harga}-{props.status_bayar ? "Paid" : "Unpaid"}</p>
        {/* Add Confirm Return button if status_bayar is true */}
        {props.status_bayar && (
          <button onClick={(e) => {
            e.stopPropagation(); // Prevent the card click event from firing when clicking the button
            props.onConfirmReturn(props.id);
          }}>
            Confirm Return
          </button>
        )}
      </div>
    </div>
  );
}
