// UserRents.js
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import UserRentsCard from "../../components/user/UserRentsCard";

import './RentsPage.css';

function UserRents() {
  const [rent, setRent] = useState([]);
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
          const response = await axios.get(`http://localhost:3000/user/peminjaman/${userID}?status_kembali=false`, { withCredentials: true });
          if (response.status === 200) {
            setRent(response.data.peminjaman);
            setIsLoaded(true);
            setIsLoading(false);
            localStorage.setItem("cachedDataRents", JSON.stringify(response.data.peminjaman));
          }
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
  }, [isLoaded, userID]);

  const handleNavigateRents = () => {
    navigate('/user/rents');
  };

  const handleNavigateReturns = () => {
    navigate('/user/returns');
  };

  
  const onPayClick = async (bukuId) => {
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
              `http://localhost:3000/user/peminjaman/${bukuId}/bayar`,
              formData,
              { withCredentials: true }
            );
  
            // Handle successful image upload (e.g., show a notification)
            console.log(`Payment uploaded successfully`);
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
            <UserRentsCard
              buku={item.buku}
              status_bayar={item.status_bayar}
              tanggal_kembali={item.tanggal_kembali}
              onPayClick={() => onPayClick(item.id)}
            />
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default UserRents;