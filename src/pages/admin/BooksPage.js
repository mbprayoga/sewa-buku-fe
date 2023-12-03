import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import AdminBookCard from "../../components/admin/AdminBookCard";

import './BooksPage.css';

function UserBooks() {
    const [book, setBook] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [judulFilter, setJudulFilter] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch data from API
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/user/buku${judulFilter ? `?judul=${encodeURIComponent(judulFilter)}` : ''}`, { withCredentials: true });
                if (response.status === 200) {
                    setBook(response.data.buku);
                    setIsLoaded(true);
                    setIsLoading(false);
                    // Store data in local storage
                    localStorage.setItem("cachedDataBook", JSON.stringify(response.data.buku));
                }
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        };

        // Check for cached data in local storage
        const cachedData = localStorage.getItem("cachedDataBook");
        if (!isLoaded && !navigator.onLine && cachedData) {
            setBook(JSON.parse(cachedData));
            setIsLoaded(true);
        } else if (!isLoaded && navigator.onLine) {
            // If not offline and not loaded, fetch data
            fetchData();
        }
    }, [isLoaded, judulFilter]);

    const handleFilterChange = (e) => {
        setJudulFilter(e.target.value);
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        // Fetch data with updated filter
        setIsLoaded(false);
    };

    const handleAddBookClick = () => {
        // Navigate to admin/add-books
        navigate('/admin/add-books');
    };

    const handleDeleteClick = async (id) => {
        try {
            // Send a DELETE request to the server
            await axios.delete(`http://localhost:3000/admin/buku/${id}/delete`, { withCredentials: true });
            // Handle successful deletion (e.g., show a notification)
            console.log(`Book ${id} deleted successfully`);
            // Update the book state after successful deletion
            setBook((prevBooks) => prevBooks.filter((book) => book.id !== id));
            setIsLoaded(false);
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error deleting book:', error);
        }
    };

    const handleUpImageClick = async (id) => {
        try {
          // Create an input element to trigger the file selection dialog
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
      
          // Listen for the file selection event
          input.addEventListener('change', async (event) => {
            const file = event.target.files[0];
      
            if (file) {
              try {
                const formData = new FormData();
                formData.append('image', file);
      
                // Send image file to the server
                await axios.patch(
                  `http://localhost:3000/admin/buku/${id}/image-up`,
                  formData,
                  { withCredentials: true }
                );
      
                // Handle successful image upload (e.g., show a notification)
                console.log(`Image for Book ${id} uploaded successfully`);
                // Reload the books after successful upload
                setIsLoaded(false);
              } catch (error) {
                // Handle error uploading image (e.g., show an error message)
                console.error('Error uploading image:', error.response?.data?.message || 'Internal Server Error');
              }
            }
          });
      
          // Click the hidden input element to trigger the file selection dialog
          input.click();
        } catch (error) {
          // Handle error (e.g., show an error message)
          console.error('Error selecting image:', error);
        }
      };

      const handleEditClick = (id) => {
        // Navigate to admin/edit-books with the book ID
        navigate(`/admin/edit-books/${id}`);
    };

    return (
        <>
            <p id="userBooksTitle">Books</p>
            {/* Add a form for filtering by judul */}
            <form onSubmit={handleFilterSubmit}>
                <label>
                    Judul:
                    <input type="text" value={judulFilter} onChange={handleFilterChange} />
                </label>
                <button type="submit">Filter</button>
            </form>
            <button onClick={handleAddBookClick}>Add Book</button>
            <div className="userBooksContainerTop">
                {book.map((item, index) => (
                    <Fragment key={item.id}>
                        <div className="userBookColumn">
                            <AdminBookCard
                                handleDeleteClick={() => handleDeleteClick(item.id)}
                                handleEditClick={() => handleEditClick(item.id)}
                                handleUpImageClick={() => handleUpImageClick(item.id)}
                                id={item.id}
                                judul={item.judul}
                                penulis={item.penulis}
                                harga={item.harga}
                                gambar_buku={item.gambar_buku}
                                sinopsis={item.sinopsis}
                                genre={item.genre}
                            />
                        </div>
                    </Fragment>
                ))}
            </div>
        </>
    );
}

export default UserBooks;
