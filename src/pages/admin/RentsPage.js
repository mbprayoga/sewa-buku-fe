import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import AdminRentsCard from "../../components/admin/AdminRentsCard";

import './RentsPage.css';

function UserRents() {
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
                        />
                    </Fragment>
                ))}
            </div>
        </>
    );
}

export default UserRents;
