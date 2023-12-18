import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminEditBooks = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [bookData, setBookData] = useState({
        judul: '',
        harga: 0,
        sinopsis: '',
        genre: '',
        penulis: '',
    });

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/admin/buku/${id}/edit`, {
                    withCredentials: true,
                });
                if (response.status === 200) {
                    setBookData(response.data.buku);
                }
            } catch (error) {
                console.error('Error fetching book data:', error.response?.data?.message || 'Internal Server Error');
            }
        };

        fetchBookData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateBook = async () => {
        try {
            const response = await axios.patch(`http://localhost:3000/admin/buku/${id}/edit`, bookData, {
                withCredentials: true,
            });
            navigate(`/admin/books`);
            if (response.status === 200) {
                console.log('Book updated successfully');
                // You can add a redirect or other actions upon successful update
                navigate(`/admin/books`);
            }
        } catch (error) {
            console.error('Error updating book:', error.response?.data?.message || 'Internal Server Error');
        }
    };

    return (
        <div style={styles.editBookContainer}>
            <h2 style={styles.editBookTitle}>Edit Book</h2>
            <form style={styles.editBookForm}>
                <label style={styles.editBookLabel}>
                    Judul:
                    <input type="text" name="judul" value={bookData.judul} onChange={handleInputChange} style={styles.editBookInput} />
                </label>
                <br />
                <label style={styles.editBookLabel}>
                    Harga:
                    <input type="number" name="harga" value={bookData.harga} onChange={handleInputChange} style={styles.editBookInput} />
                </label>
                <br />
                <label style={styles.editBookLabel}>
                    Sinopsis:
                    <textarea name="sinopsis" value={bookData.sinopsis} onChange={handleInputChange} style={styles.editBookInput} />
                </label>
                <br />
                <label style={styles.editBookLabel}>
                    Genre:
                    <input type="text" name="genre" value={bookData.genre} onChange={handleInputChange} style={styles.editBookInput} />
                </label>
                <br />
                <label style={styles.editBookLabel}>
                    Penulis:
                    <input type="text" name="penulis" value={bookData.penulis} onChange={handleInputChange} style={styles.editBookInput} />
                </label>
                <br />
                <button type="button" style={styles.updateButton} onClick={handleUpdateBook}>
                    Update Book
                </button>
            </form>
        </div>
    );
};

const styles = {
    editBookContainer: {
        // Center-align the container
        margin: '20px auto',
        textAlign: 'center',
        borderRadius: '8px',
        width: '800px'
    },
    editBookTitle: {
        // Add your title styles here
        fontSize: '30px',
    },
    editBookForm: {
        // Add your form styles here
        display: 'flex',
        flexDirection: 'column',
    },
    editBookLabel: {
        // Add your label styles here
        margin: '10px 0',
    },
    editBookInput: {
        // Add your input styles here
        width: '100%',
        padding: '4px',
        margin: '5px 0',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    updateButton: {
        // Add your button styles here
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default AdminEditBooks;
