import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Layout({ children }) {
  const [username, setUsername] = useState("Chandru");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUsername(payload.username || "User");
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand" to="/">Sakthi Finance</Link>
          <div className="text-white d-flex align-items-center">
            <i className="bi bi-person-circle me-2 fs-5"></i>{username}
          </div>
        </div>
      </nav>
      <main className="container mt-4">{children}</main>
    </div>
  );
}

export default Layout;
