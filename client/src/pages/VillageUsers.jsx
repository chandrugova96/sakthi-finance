import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const usersData = {
    Rampur: [
        { id: 1, name: "John Doe", mobile: "1234567890", totalAmount: 1000, paidAmount: 700 },
        { id: 2, name: "Jane Smith", mobile: "0987654321", totalAmount: 2000, paidAmount: 1500 },
    ],
    "Lakshmi Nagar": [
        { id: 3, name: "Raj Kumar", mobile: "1112223333", totalAmount: 1500, paidAmount: 1500 },
    ],
};

const VillageUsers = () => {
    const { villageName } = useParams();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const users = usersData[villageName] || [];

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobile.includes(searchTerm)
    );

    const handleUserClick = (userId) => {
        navigate(`/user/${userId}`);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Users in {villageName}</h2>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by name or mobile..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />

            <ul className="list-group">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <li
                            key={user.id}
                            className="list-group-item mb-2 rounded shadow-sm"
                            style={{ borderRadius: '12px', cursor: 'pointer' }}
                            onClick={() => handleUserClick(user.id)}
                        >
                            {user.name} - {user.mobile}
                        </li>
                    ))) : (
                    <li className="list-group-item text-muted">No users found</li>
                )}
            </ul>
        </div>
    );
};

export default VillageUsers;
