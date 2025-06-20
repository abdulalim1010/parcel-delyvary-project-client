import React from 'react';
import logo from '../../assets/logo.png'
const ProFastLogo = () => {
  return (
    <div className='flex items-end mt-2'>
      <img src={logo} alt="" />
      <p className=' text-3xl font-bold -ml-2'>ProFast </p>
    </div>
  );
};

export default ProFastLogo;