// AdminPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminRenterCard from "../../components/admin/AdminRenterCard";

function AdminRenter() {
  const [peminjam, setPeminjam] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/peminjam", { withCredentials:true});
        if (response.status === 200) {
          setPeminjam(response.data.peminjam);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="adminPageContainer">
      <h1>Renter</h1>
      <div className="adminRenterList">
        {peminjam.map((item) => (
          <AdminRenterCard
            key={item.id}
            nama={item.nama}
            username={item.username}
            alamat={item.alamat}
            no_hp={item.no_hp}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminRenter;
