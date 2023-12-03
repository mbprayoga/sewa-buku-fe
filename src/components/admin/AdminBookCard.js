import "./AdminBookCard.css";
import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminBookCard(props) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        // Navigate to admin/edit-books with the book ID
        navigate(`/admin/edit-books/${props.id}`);
    };

    return (
        <div className="AdminBookCardContainer" onClick={props.onClick}>
            <img src={props.gambar_buku} alt="" className="adminBookCardPosterBig" />
            <h2 id="adminBookCardTitle">{props.judul}</h2>
            <p>{props.penulis}</p>
            <p>{props.genre}</p>
            <p>{props.sinopsis}</p>
            <p>{props.harga}</p>
            {/* Add Edit and Delete buttons */}
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={props.handleUpImageClick}>Upload Image</button>
            <button onClick={props.handleDeleteClick}>Delete</button>
        </div>
    );
}
