// AdminRents.js
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import AdminRentsCard from "../../components/admin/AdminRentsCard";

import './RentsPage.css';

function AdminRents() {
    const [rent, setRent] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [buktiBayarUrl, setBuktiBayarUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/admin/peminjaman?status_kembali=false`, { withCredentials: true });
                if (response.status === 200) {
                    setRent(response.data.peminjaman);
                    setIsLoaded(true);
                }
            } catch (err) {
                console.log(err);
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
            await axios.patch(`http://localhost:3000/admin/peminjaman/${bukuId}/kembali`, {}, { withCredentials: true });
            setIsLoaded(false);
        } catch (error) {
            console.error('Error confirming return:', error);
        }
    };

    const handleCardClick = (buktiBayarUrl) => {
        setBuktiBayarUrl(buktiBayarUrl);
    };

    const handleCloseModal = () => {
        setBuktiBayarUrl('');
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
                            onClick={() => handleCardClick(item.bukti_bayar)}
                        />
                    </Fragment>
                ))}
            </div>
            {buktiBayarUrl && (
                <div className="custom-modal" onClick={handleCloseModal}>
                    <div className="modal-content" style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                        <img src={buktiBayarUrl} alt="Bukti Bayar" style={{ maxWidth: '100%', maxHeight: '100%', margin: 'auto', display: 'block' }} />
                    </div>
                </div>
            )}
        </>
    );
}

export default AdminRents;
