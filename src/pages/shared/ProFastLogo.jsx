import React from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router';
const ProFastLogo = () => {
  return (
    <Link to='/'>
    <div className='flex items-end mt-2'>
      <img src={logo} alt="" />
      <p className=' text-3xl font-bold -ml-2'>ProFast </p>
    </div>
    </Link>);
};

export default ProFastLogo;