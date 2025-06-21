import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/Footer';
import Aos from 'aos';
import 'aos/dist/aos.css';

const MainLayOut = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true }); // You can adjust options here
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayOut;
