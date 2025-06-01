export function isAuthenticated() {
  const token = localStorage.getItem("token");

  // Fake validation: check if token exists and is "valid-token"
  if (token && token === "valid-token") {
    return true;
  }
  return false;
}
