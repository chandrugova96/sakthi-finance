import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import VillageUsers from "./pages/VillageUsers";
import UserDetails from "./pages/UserDetails";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  const location = useLocation();
  const noLayoutRoutes = ["/login"];

  const isNoLayout = noLayoutRoutes.includes(location.pathname);

  return (
    isNoLayout ? (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    ) : (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/village/:villageId" element={<VillageUsers />} />
          <Route path="/user/:userId" element={<UserDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    )
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
