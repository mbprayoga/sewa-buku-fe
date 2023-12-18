import React, { useState } from "react";
import axios from "axios";

import "./AddBookPage.css"; // Add your CSS file path
import { useNavigate } from "react-router-dom";


function AdminAddBooks() {

    const navigate = useNavigate();
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
      const response = await axios.post(
        "http://localhost:3000/admin/buku/add",
        bookData,
        {
          withCredentials: true,
        }
      );

      navigate("/admin/books")

      // Handle success, e.g., show a success message
      console.log("Book added successfully:", response.data);
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error adding book:", error);
    }
  };

  return (
    <div style={styles.adminAddBooksContainer}>
      <h2 style={styles.title}>Add Book</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Judul:
          <input
            type="text"
            name="judul"
            value={bookData.judul}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Harga:
          <input
            type="number"
            name="harga"
            value={bookData.harga}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Sinopsis:
          <textarea
            name="sinopsis"
            value={bookData.sinopsis}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Genre:
          <input
            type="text"
            name="genre"
            value={bookData.genre}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Penulis:
          <input
            type="text"
            name="penulis"
            value={bookData.penulis}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.addButton}>
          Add Book
        </button>
      </form>
    </div>
  );
}

const styles = {
  adminAddBooksContainer: {
    margin: "20px auto",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    width: "800px"
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    margin: "10px 0",
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "5px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  addButton: {
    backgroundColor: "#000",
    color: "#fff",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AdminAddBooks;
