import React from 'react';
import Banner from './banner/Banner';
import Services from '../../components/Services';
import ClientLogoSlider from '../../components/ClientLogoSlider';
import BenefitSection from '../../components/BenefitSection';
import BecomeMarchent from './BecomeMarchent';

const Home = () => {
  return (
    <div>
  
      <Banner />
      <Services />
      
      <ClientLogoSlider />
      <BenefitSection />
      <BecomeMarchent/>
    </div>
  );
};

export default Home;