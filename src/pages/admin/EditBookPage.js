import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminEditBooks = () => {
    const navigate = useNavigate()
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
        <div>
            <h2>Edit Book</h2>
            <form>
                <label>
                    Judul:
                    <input type="text" name="judul" value={bookData.judul} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Harga:
                    <input type="number" name="harga" value={bookData.harga} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Sinopsis:
                    <textarea name="sinopsis" value={bookData.sinopsis} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Genre:
                    <input type="text" name="genre" value={bookData.genre} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Penulis:
                    <input type="text" name="penulis" value={bookData.penulis} onChange={handleInputChange} />
                </label>
                <br />
                <button type="button" onClick={handleUpdateBook}>
                    Update Book
                </button>
            </form>
        </div>
    );
};

export default AdminEditBooks;
