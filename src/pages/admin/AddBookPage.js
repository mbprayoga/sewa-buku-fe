import React, { useState } from "react";
import axios from "axios";

import './AddBookPage.css'; // Add your CSS file path

function AdminAddBooks() {
  const [bookData, setBookData] = useState({
    judul: "",
    harga: 0,
    sinopsis: "",
    genre: "",
    penulis: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/admin/buku/add", bookData, {
        withCredentials: true,
      });

      // Handle success, e.g., show a success message
      console.log("Book added successfully:", response.data);
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="adminAddBooksContainer">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Judul:
          <input
            type="text"
            name="judul"
            value={bookData.judul}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Harga:
          <input
            type="number"
            name="harga"
            value={bookData.harga}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Sinopsis:
          <textarea
            name="sinopsis"
            value={bookData.sinopsis}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            value={bookData.genre}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Penulis:
          <input
            type="text"
            name="penulis"
            value={bookData.penulis}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AdminAddBooks;
