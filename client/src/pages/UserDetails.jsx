import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { isAuthenticated } from "../utils/auth";

const allUsers = [
  { id: 1, name: "John Doe", mobile: "1234567890", village: "Rampur", totalAmount: 1000, paidAmount: 700 },
  { id: 2, name: "Jane Smith", mobile: "0987654321", village: "Rampur", totalAmount: 2000, paidAmount: 1500 },
  { id: 3, name: "Raj Kumar", mobile: "1112223333", village: "Lakshmi Nagar", totalAmount: 1500, paidAmount: 1500 },
];

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const originalUser = allUsers.find(u => u.id === Number(userId));
  const [user, setUser] = useState({ ...originalUser });
  const [payment, setPayment] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="container mt-4">
        <h2>User not found</h2>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const remainingAmount = user.totalAmount - user.paidAmount;

  const handleSave = () => {
    const amount = parseFloat(payment);
    if (!isNaN(amount) && amount > 0) {
      const newPaidAmount = user.paidAmount + amount;
      const updatedUser = { ...user, paidAmount: newPaidAmount };
      setUser(updatedUser);
      setPayment("");
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">{user.name}</h4>

      <div className="row mb-4">
        <div className="col-6">
          <div className="fw-bold">Mobile Number</div>
          <div><a href={`tel:${user.mobile}`}>{user.mobile}</a></div>
        </div>
        <div className="col-6 text-end">
          <div className="fw-bold">Village</div>
          <div>{user.village}</div>
        </div>
      </div>

      <ul className="list-group mb-4">
        <li className="list-group-item">
          <div className="fw-bold">Total Amount</div>
          <div>₹{user.totalAmount}</div>
        </li>
        <li className="list-group-item">
          <div className="fw-bold">Paid Amount</div>
          <div>₹{user.paidAmount}</div>
        </li>
        <li className="list-group-item">
          <div className="fw-bold">Remaining Amount</div>
          <div>₹{remainingAmount}</div>
        </li>
      </ul>

      <div className="mb-3">
        <label className="form-label fw-bold">Add Payment</label>
        <input
          type="number"
          className="form-control"
          value={payment}
          onChange={e => setPayment(e.target.value)}
        />
      </div>

      <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default UserDetails;
