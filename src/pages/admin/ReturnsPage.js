import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import AdminReturnCard from "../../components/admin/AdminReturnCard";

import './RentsPage.css';

function UserReturns() {
    const [returns, setReturns] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/admin/peminjaman?status_kembali=true`, { withCredentials: true });
                if (response.status === 200) {
                    setReturns(response.data.peminjaman);
                    setIsLoaded(true);
                    setIsLoading(false);
                }
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        };

        const cachedData = localStorage.getItem("cachedDataReturns");
        if (!isLoaded && !navigator.onLine && cachedData) {
            setReturns(JSON.parse(cachedData));
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
                <p id="userBooksTitle">Returns</p>
                <div className="userButtonsContainer">
                    <button onClick={handleNavigateRents}>Rents</button>
                    <button onClick={handleNavigateReturns}>Returns</button>
                </div>
            </div>
            <div className="userBooksContainerTop">
                {returns.map((item, index) => (
                    <Fragment key={item.id}>
                        <AdminReturnCard
                            peminjam={item.peminjam}
                            buku={item.buku}
                            denda={item.denda}
                            status_kembali={item.status_kembali}
                            bukti_denda={item.bukti_denda}
                        />
                    </Fragment>
                ))}
            </div>
        </>
    );
}

export default UserReturns;
