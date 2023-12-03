import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import UserReturnCard from "../../components/user/UserReturnCard";

import './RentsPage.css';

function UserReturns() {
    const [returns, setReturns] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userID, setUserID] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDataResponse = await axios.get("http://localhost:3000/account/user-data", { withCredentials: true });
                if (userDataResponse.status === 200) {
                    setUserID(userDataResponse.data.additionalData.id);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchData = async () => {
            setIsLoading(true);
            try {
                await fetchUserData();
                if (userID) {
                    const response = await axios.get(`http://localhost:3000/user/peminjaman/${userID}?status_kembali=true`, { withCredentials: true });
                    if (response.status === 200) {
                        setReturns(response.data.peminjaman);
                        setIsLoaded(true);
                        setIsLoading(false);
                    }
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
    }, [isLoaded, userID]);

    const handleNavigateRents = () => {
        navigate('/user/rents');
    };

    const handleNavigateReturns = () => {
        navigate('/user/returns');
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
                        <UserReturnCard
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
