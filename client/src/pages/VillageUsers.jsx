import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { isAuthenticated } from "../utils/auth";
import AuthRepository from "../repositories/AuthRepository";

const VillageUsers = () => {
    const { villageId } = useParams();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [villageData, setVillageData] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        } else {
            getVillages()
            getUsers()
        }
    }, [navigate]);

    const getVillages = async () =>{
        try {
            let villages = await AuthRepository.getVillage();
            let village = villages.data.find( v => v.id == villageId);
            setVillageData(village || {})
        } catch (error) {
            setVillageData([])
        }
    };

    const getUsers = async () =>{
        try {
            let users = await AuthRepository.getUsers(villageId);
            setUsers(users.data || [])
        } catch (error) {
            setUsers([])
        }
    }

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobileNumber.includes(searchTerm)
    );

    const handleUserClick = (userId) => {
        navigate(`/user/${userId}`);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Users in {villageData?.name}</h2>

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
                            {user.name} - {user.mobileNumber}
                        </li>
                    ))) : (
                    <li className="list-group-item text-muted">No users found</li>
                )}
            </ul>
        </div>
    );
};

export default VillageUsers;
