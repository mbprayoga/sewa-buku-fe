// AdminRents.js
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import AdminRentsCard from "../../components/admin/AdminRentsCard";

import './RentsPage.css';

function AdminRents() {
    const [rent, setRent] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/admin/peminjaman?status_kembali=false`, { withCredentials: true });
                if (response.status === 200) {
                    setRent(response.data.peminjaman);
                    setIsLoaded(true);
                    setIsLoading(false);
                }
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        };

        const cachedData = localStorage.getItem("cachedDataRents");
        if (!isLoaded && !navigator.onLine && cachedData) {
            setRent(JSON.parse(cachedData));
            setIsLoaded(true);
        } else if (!isLoaded && navigator.onLine) {
            fetchData();
        }
    }, [isLoaded]);

    const handleNavigateRents = () => {
        navigate('/admin/rents');
    };

    const handleNavigateReturns = () => {
        navigate('/admin/returns');
    };

    const handleConfirmReturn = async (bukuId) => {
        try {
            // Add logic to confirm return (e.g., update UI, send request to server)

            // For demonstration, let's assume there's an endpoint for confirming returns
            await axios.patch(`http://localhost:3000/admin/peminjaman/${bukuId}/kembali`, {}, { withCredentials: true });

            // Reload the rentals after successful confirmation
            setIsLoaded(false);
        } catch (error) {
            console.error('Error confirming return:', error);
        }
    };

    return (
        <>
            <div className="userBooksTitleContainer">
                <p id="userBooksTitle">Rents</p>
                <div className="userButtonsContainer">
                    <button onClick={handleNavigateRents}>Rents</button>
                    <button onClick={handleNavigateReturns}>Returns</button>
                </div>
            </div>
            <div className="userBooksContainerTop">
                {rent.map((item, index) => (
                    <Fragment key={item.id}>
                        <AdminRentsCard
                            peminjam={item.peminjam}
                            buku={item.buku}
                            status_bayar={item.status_bayar}
                            tanggal_pinjam={item.tanggal_pinjam}
                            tanggal_kembali={item.tanggal_kembali}
                            denda={item.denda}
                            status_kembali={item.status_kembali}
                            onConfirmReturn={() => handleConfirmReturn(item.id)}
                        />
                    </Fragment>
                ))}
            </div>
        </>
    );
}

export default AdminRents;
