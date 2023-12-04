import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import UserBookCard from "../../components/user/UserBookCard";

import './BooksPage.css';

function UserBooks() {
    const [book, setBook] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [judulFilter, setJudulFilter] = useState('');
    const [showRentModal, setShowRentModal] = useState(false);  // New state
    const [selectedBookId, setSelectedBookId] = useState(null);  // New state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/user/buku?ketersediaan=true${judulFilter ? `&judul=${encodeURIComponent(judulFilter)}` : ''}`, { withCredentials: true });
                if (response.status === 200) {
                    setBook(response.data.buku);
                    setIsLoaded(true);
                    setIsLoading(false);
                    localStorage.setItem("cachedDataBook", JSON.stringify(response.data.buku));
                }
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        };

        const cachedData = localStorage.getItem("cachedDataBook");
        if (!isLoaded && !navigator.onLine && cachedData) {
            setBook(JSON.parse(cachedData));
            setIsLoaded(true);
        } else if (!isLoaded && navigator.onLine) {
            fetchData();
        }
    }, [isLoaded, judulFilter]);

    const handleFilterChange = (e) => {
        setJudulFilter(e.target.value);
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setIsLoaded(false);
    };

    const handleRentClick = (id) => {
        setSelectedBookId(id);
        setShowRentModal(true);
    };

    const handleConfirmRent = async () => {
        try {
            const userDataResponse = await axios.get('http://localhost:3000/account/user-data', { withCredentials: true });
            const userId = userDataResponse.data.additionalData.id;

            const currentDate = new Date();
            const returnDate = new Date();
            returnDate.setDate(currentDate.getDate() + 14); // Adding 14 days to the current date

            const rentalData = {
                id_peminjam: userId,
                tanggal_pinjam: currentDate.toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
                tanggal_kembali: returnDate.toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
            };

            await axios.post(`http://localhost:3000/user/buku/${selectedBookId}/pinjam`, rentalData, { withCredentials: true });
            // Handle successful rental (e.g., show a notification)
            console.log(`Book ${selectedBookId} rented successfully`);
            // Update the book state after successful rental
            setIsLoaded(false);
            // Close the modal
            setShowRentModal(false);
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error renting book:', error);
            // Close the modal in case of an error
            setShowRentModal(false);
        }
    };

    const handleCancelRent = () => {
        // Close the modal without making the request
        setShowRentModal(false);
    };

    return (
        <>
            <p id="userBooksTitle">Books</p>
            <form onSubmit={handleFilterSubmit}>
                <label>
                    Judul:
                    <input type="text" value={judulFilter} onChange={handleFilterChange} />
                </label>
                <button type="submit">Filter</button>
            </form>
            <div className="userBooksContainerTop">
                {book.map((item, index) => (
                    <Fragment key={item.id}>
                        <div className="userBookColumn">
                            <UserBookCard
                                id={item.id}
                                judul={item.judul}
                                penulis={item.penulis}
                                harga={item.harga}
                                gambar_buku={item.gambar_buku}
                                sinopsis={item.sinopsis}
                                genre={item.genre}
                                onRentClick={() => handleRentClick(item.id)}  // Pass a function reference
                            />
                        </div>
                    </Fragment>
                ))}
            </div>

            {/* Modal for Rent Confirmation */}
            {showRentModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <p>Are you sure you want to rent this book?</p>
                            <button onClick={handleConfirmRent}>Yes</button>
                            <button onClick={handleCancelRent}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserBooks;
