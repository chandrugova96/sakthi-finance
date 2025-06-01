import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isAuthenticated } from "../utils/auth";
import AdminRepository from '../repositories/AuthRepository';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (username && password ) {
      let result = await AdminRepository.login({ userName: username, password });
      if (result && result.data) {
        localStorage.setItem("token", result.data);
        navigate("/");
      } else if (result && result.message) {
        setError(result.message);
      } else {
        setError("Invalid credentials");
      }
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <div className="mb-3">
          <label>Username</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
}

export default Login;
