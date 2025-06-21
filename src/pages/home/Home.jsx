import React from 'react';
import Banner from './banner/Banner';
import Services from '../../components/Services';
import ClientLogoSlider from '../../components/ClientLogoSlider';

const Home = () => {
  return (
    <div>
  
      <Banner />
      <Services />
      <ClientLogoSlider/>
    </div>
  );
};

export default Home;