import React from 'react';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png';
import ProFastLogo from './shared/ProFastLogo';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center px-4">
      {/* Logo at the top */}
      <div className="w-full max-w-6xl py-4">
        <ProFastLogo />
      </div>

      {/* Image and Outlet side by side */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-8 py-8">
        

        {/* Form Section */}
        <div className="flex-1 w-full">
          <Outlet />
        </div>
        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src={authImage}
            alt="Authentication Illustration"
            className="w-full max-w-sm rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
