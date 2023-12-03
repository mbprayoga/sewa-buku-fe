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

  const [selectedRental, setSelectedRental] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);

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

  const handlePayClick = (rental) => {
    setSelectedRental(rental);
    setShowModal(true);
  };

  const handlePayConfirm = async () => {
    try {
      if (!imageFile) {
        console.error('Please select an image file.');
        return;
      }

      const userDataResponse = await axios.get('http://localhost:3000/account/user-data', { withCredentials: true });
      const userId = userDataResponse.data.additionalData.id;

      const paymentData = new FormData();
      paymentData.append('id_peminjam', userId);
      paymentData.append('image', imageFile);

      await axios.post(
        `http://localhost:3000/user/peminjaman/${selectedRental.id}/bayar`,
        paymentData,
        { withCredentials: true }
      );

      console.log(`Payment for Rental ${selectedRental.id} completed successfully`);

      setShowModal(false);
      setIsLoaded(false);
    } catch (error) {
      console.error('Error making payment:', error.response?.data?.message || 'Internal Server Error');
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
              tanggal_pinjam={item.tanggal_pinjam}
              tanggal_kembali={item.tanggal_kembali}
              denda={item.denda}
              status_kembali={item.status_kembali}
              onPayClick={() => handlePayClick(item)}
            />
          </Fragment>
        ))}
      </div>

      {/* Modal for Payment Confirmation */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Payment Confirmation</h2>
            <p>Please upload an image of your payment receipt.</p>
            <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
            <button onClick={handlePayConfirm}>Confirm</button>
          </div>
        </div>
      )}
    </>
  );
}

export default UserRents;
