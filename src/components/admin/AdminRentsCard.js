import "./AdminRentsCard.css";
import React from "react";

export default function AdminRentsCard(props) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="UserRentsCardContainer" onClick={props.onClick}>
      <img src={props.buku.gambar_buku} alt="" className="userRentsCardPoster" />
      <h2 id="userRentsCardTitle">{props.buku.judul}</h2>
      <p>{props.buku.penulis}</p>
      <p>{props.buku.harga}</p>
      <p>{props.peminjam.nama}</p>
      <p>Due: {formatDate(props.tanggal_kembali)}</p>
      <p>{props.status_bayar ? "Paid" : "Unpaid"}</p>
    </div>
  );
}
