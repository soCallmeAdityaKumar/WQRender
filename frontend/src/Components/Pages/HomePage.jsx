import React from 'react'
import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home';
import Popular from '../Popular/Popular';
import Offer from '../Offer/Offer';
import About from '../About/About';
import Footer from '../Footer/Footer';

const HomePage = () => {
  return (
    <>
        <Navbar />
        <Home />
        <Popular />
        <Offer />
        <About />
        <Footer />
    </>
  )
}

export default HomePage