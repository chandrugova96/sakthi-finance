import { useState } from "react";
import { useNavigate } from "react-router-dom";

const villagesData = [
    "Rampur",
    "Lakshmi Nagar",
    "Gopalpur",
    "Rajgarh",
    "Sundarpur",
    "Bhavnipur",
    "Devgarh",
    "Madhuban",
    "Shantipur",
];

const Home = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredVillages = villagesData.filter(village =>
        village.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleVillageClick = (village) => {
        navigate(`/village/${encodeURIComponent(village)}`);
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
                                {village}
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
