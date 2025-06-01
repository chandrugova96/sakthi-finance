import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isAuthenticated } from "../utils/auth";
import AuthRepository from "../repositories/AuthRepository";

const Home = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [villagesData, setVillagesData] = useState([]);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        } else {
            getVillages()
        }
    }, [navigate]);

    const getVillages = async () =>{
        try {
            let villages = await AuthRepository.getVillage();
            setVillagesData(villages.data || [])
        } catch (error) {
            setVillagesData([])
        }
    };

    const filteredVillages = villagesData.filter(village =>
        village.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleVillageClick = (village) => {
        navigate(`/village/${encodeURIComponent(village.id)}`);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Village</h2>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search village..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />

            <ul className="list-group">
                <ul className="list-group">
                    {filteredVillages.length > 0 ? (
                        filteredVillages.map((village, index) => (
                            <li
                                className="list-group-item mb-2 rounded shadow-sm"
                                key={index}
                                style={{ borderRadius: '12px', cursor: 'pointer' }}
                                onClick={() => handleVillageClick(village)}
                            >
                                {village.name}
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item text-muted">No villages found</li>
                    )}
                </ul>
            </ul>
        </div>
    );
};

export default Home;
