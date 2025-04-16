import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Profile from "../pages/Profile";
import Menu from "../components/Menu";
import Home from "../pages/Home";
import Terms from "../pages/Terms";
import Loader from "../components/Loader";
import Privacy from "../pages/Privacy";
import LoginLanguageModal from "../pages/LangauageModal";
import Search from "../pages/Search";

const RouterContent: React.FC = () => {
  const location = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const hideLoader = location.pathname === "/terms" || location.pathname === "/privacy";

  return (
    <>
      {isInitialLoad && !hideLoader && <Loader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy/>} />
        <Route path="/language" element={<LoginLanguageModal />} />
        <Route path="/search" element={<Search/>} />
      </Routes>
      <Menu />
    </>
  );
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <RouterContent />
    </Router>
  );
};

export default AppRouter;