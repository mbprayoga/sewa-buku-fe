import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import BookCard from "../components/BookCard";

import './BookPage.css'; 

function BookPage() {
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
            const response = await axios.get(`http://localhost:3000/account/book?ketersediaan=true${judulFilter ? `&judul=${encodeURIComponent(judulFilter)}` : ''}`);
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

      return (
        <>
            <p id="books">Books</p>
            {/* Add a form for filtering by judul */}
            <form onSubmit={handleFilterSubmit}>
              <label>
                Judul:
                <input type="text" value={judulFilter} onChange={handleFilterChange} />
              </label>
              <button type="submit">Filter</button>
            </form>
            <div className="booksContainerTop">
                    {book.map((item, index) => (
                        <Fragment key={item.id}>
                          <div className="bookColumn"> 
                            <BookCard judul={item.judul} penulis={item.penulis} harga={item.harga} gambar_buku={item.gambar_buku}/>
                          </div>
                        </Fragment>
                    ))}
            </div>
        </>
    );
}

export default BookPage;
