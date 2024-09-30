import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import Header from "./components/Header";
import BottomBar from "./components/BottomBar";
import Footer from "./components/Footer.jsx";
// layout for mobile devices
import HomeMobile from "./pages/MobileVersion/Home.jsx";
// layout for web or larger screens
import HomeWeb from "./pages/WebsiteVersion/Home.jsx";
import Blog from "./pages/WebsiteVersion/Blog.jsx";
import Menu from "./pages/WebsiteVersion/Menu.jsx";
import Favorites from "./pages/WebsiteVersion/Favorites.jsx";
import Contact from "./pages/WebsiteVersion/Contact.jsx";
import Login from "./pages/WebsiteVersion/Login.jsx";
import Register from "./pages/WebsiteVersion/Register.jsx";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle screen size change
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 640);
  };

  // Handle scroll event to add shadow on scroll
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    // Add resize and scroll event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // Initial call to set states based on current conditions
    handleResize();
    handleScroll();

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* <div
        style={{
        bg-[#e5e7eb]
          background: "linear-gradient(315deg, #e66465 0%, #9198e5 74%)",
        }}
      ></div> */}
      {/* Conditional rendering for Header and BottomBar */}
      {!isMobile ? <Header isScrolled={isScrolled} /> : <BottomBar />}

      {/* Main content section */}

      <div className={` mb-5 p-4 ${isMobile ? "mobile-layout" : "web-layout"}`}>
        {isMobile ? (
          <>
            {/* Layout for mobile devices */}
            <HomeMobile />
          </>
        ) : (
          <>
            {/* Route Layout for web or larger screens */}
            <Toaster />
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<HomeWeb />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </>
        )}
      </div>

      {/* Footer should only be rendered if not on mobile */}
      {!isMobile && <Footer />}
    </>
  );
}

export default App;
