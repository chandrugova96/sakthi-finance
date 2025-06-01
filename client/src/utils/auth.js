import { jwtDecode } from "jwt-decode";

export function isAuthenticated() {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const expiryTime = decoded.exp * 1000;
    const currentTime = Date.now();

    if (currentTime < expiryTime) {
      return true;
    } else {
      localStorage.removeItem("token");
      return false;
    }
  } catch (error) {
    localStorage.removeItem("token");
    return false;
  }
}
